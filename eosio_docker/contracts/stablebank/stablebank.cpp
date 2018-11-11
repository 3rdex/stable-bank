#include <eosiolib/eosio.hpp>

using namespace eosio;

CONTRACT stablebank : public eosio::contract {
  private:
    bool isnewuser( name user ) {
      // get notes by using secordary key
      auto note_index = _notes.get_index<name("getbyuser")>();
      auto note_iterator = note_index.find(user.value);

      return note_iterator == note_index.end();
    }

    TABLE depostruct {
      uint64_t      prim_key;  // primary key
      name          user;      // account name for the user
      asset         deposit;   // deposit
      uint64_t      timestamp; // the store the last update block time

      // primary key
      auto primary_key() const { return prim_key; }
      // secondary key
      uint64_t index_by_user() const { return user.value; }
    };

    TABLE prepaystruct {
      uint64_t prim_key;  // primary key
      name user;          // account name for the user
      uint64_t timestamp; // the store the last update block time

      // primary key
      auto primary_key() const { return prim_key; }
      // secondary key
      uint64_t index_by_user() const { return user.value; }
    };

    TABLE paystruct {
      uint64_t prim_key;  // primary key
      name from;          // account name for the user
      name to;            // account name for the user
      asset amount;       // deposit
      uint64_t prepare_time; // the store the last update block time
      uint64_t timestamp; // the store the last update block time

      // primary key
      auto primary_key() const { return prim_key; }
      // secondary key
      uint64_t index_by_from() const { return from.value; }
      uint64_t index_by_to() const { return to.value; }
      uint64_t index_by_start() const { return prepare_time.value; }
    };

    // create a multi-index table and support secondary key
    typedef eosio::multi_index<
        name("depostruct"), depostruct,
        indexed_by<name("byuser"), const_mem_fun<depostruct, uint64_t,
                                                 &depostruct::index_by_user>>>
        deposit_table;

    typedef eosio::multi_index<
        name("prepaystruct"), prepaystruct,
        indexed_by<name("byuser"), const_mem_fun<prepaystruct, uint64_t,
                                                 &prepaystruct::index_by_user>>>
        prepare_pay_table;
    typedef eosio::multi_index<
        name("paystruct"), paystruct,
        indexed_by<name("byfrom"), const_mem_fun<paystruct, uint64_t,
                                                 &paystruct::index_by_from>>>,
        indexed_by<name("byto"),
                   const_mem_fun<paystruct, uint64_t, &paystruct::index_by_to>>>
        ,
        indexed_by<
            name("byprepare"),
            const_mem_fun<paystruct, uint64_t, &paystruct::index_by_prepare>>>
            pay_table;

    deposit_table _deposits;
    prepare_pay_table _prepare_pay;

  public:
    using contract::contract;

    // constructor
    stablebank(name receiver, name code, datastream<const char *> ds)
        : contract(receiver, code, ds), _deposits(receiver, receiver.value),
          _prepare_pay(receiver, receiver.value) {}

    ACTION preparepay(name from){
      require_auth(from);
      auto index = _prepare_pay.get_index<name("byuser")>();
      auto itr = index.find(from.value);
      if(itr == index.end()) {
        _prepare_pay.emplace(_self, [&](auto &item) {
          item.prim_key = _prepare_pay.available_primary_key();
          item.user = user;
          item.timestamp = now();
        });
      } else {
        _prepare_pay.modify(itr, _self, [&](auto &item) { 
          item.timestamp = now(); 
        });
      }
    }

    ACTION charge(name from, name shop, asset amount){
      require_auth(shop);

      auto index = _prepare_pay.get_index<name("byfrom")>();
      auto itr = index.find(from.value);
      bool pay_prepared = itr != index.end();
      eosio_assert(pay_prepared, "payment not init");
      auto pay_time = now();
      eosio_assert(pay_time - itr->timestamp > 2 * 60 * 1000, "payment expired");
      pay_table pays = pay_table(_self, from);
      pay_table.emplace(_self, [&](auto &item) {
        item.prim_key = pay_table.available_primary_key();
        item.from = from;
        item.to = shop;
        item.amount = amount;
        item.confirmed = false;
        item.prepare_time = itr->timestamp;
        item.timestamp = now();
      });
    }
    
    ACTION pay(name from, user shop, asset amount){
      require_auth(from);
      auto prepare_index = _prepare_pay.get_index<name("byuser")>();
      auto prepare_itr = prepare_index.find(from.value);
      eosio_assert(prepare_itr != prepare_index.end(), "no matching prepare");
      pay_table pays = pay_table(_self, from);
      auto index = _prepare_pay.get_index<name("byprepare")>();
      auto itr = index.find(prepare_itr.timestamp);
      eosio_assert(itr != index.end(), "no matching charge");
      auto direct_amount = itr->amount * 0.9;
      auto hold_amount = itr->amount * 0.099;
      deduct_balance(from, itr->amount);
      add_balance(shop, direct_amount);
      hold_balance(shop, hold_balance);
    }

    void deduct_balance(name user, asset amount){
      auto index = _deposits.get_index<name("byuser")>();
      auto &entry = index.get(event_name.value);
      _deposits.modify(entry, _self, [&](auto &item) {
        item.deposit -= amount;
        item.timestamp = now();
      });
    }
    void add_balance(name user, asset amount) {
      auto index = _deposits.get_index<name("byuser")>();
      auto &entry = index.get(event_name.value);
      _deposits.modify(entry, _self, [&](auto &item) {
        item.deposit += amount;
        item.timestamp = now();
      });
    }
    void hold_balance(name shop, asset amount) {

    }

    struct transfer_struct {
      name from;
      name to;
      asset quantity;
      string memo;
    };

    void on_transfer(uint64_t sender, uint64_t receiver) {
      auto transfer_data = unpack_action_data<transfer_struct>();
      if (transfer_data.from == _self || transfer_data.to != _self) {
        return;
      }

      eosio_assert(transfer_data.quantity.is_valid(), "Invalid token transfer");
      eosio_assert(transfer_data.quantity.amount > 0,
                   "Quantity must be positive");

      auto deposit = transfer_data.quantity;
      auto to_account = transfer_data.memo;

      if (!is_deposit_exist(_deposits, user)) {
        _deposits.emplace(_self, [&](auto &item) {
          item.prim_key = _deposits.available_primary_key();
          item.user = user;
          item.deposit = deposit;
          item.timestamp = now();
        });
      } else {
        auto index = _deposits.get_index<name("byuser")>();
        auto &entry = index.get(event_name.value);
        _deposits.modify(entry, _self, [&](auto &item) {
          item.deposit += deposit;
          item.timestamp = now();
        });
      }
    }
};

extern "C" {
  void apply(uint64_t receiver, uint64_t code, uint64_t action) {
    if (code == receiver) {
      switch (action) { EOSIO_DISPATCH_HELPER(stablebank, (pay)(refund)) }
    } else if (action == name("transfer").value &&
              code == name("eosio.token").value) {
      execute_action(name(receiver), name(code), &stablebank::on_transfer);
    }
  }
};
