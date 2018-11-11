#!/usr/bin/env bash
set -o errexit

echo "=== setup blockchain accounts and smart contract ==="

# set PATH
PATH="$PATH:/opt/eosio/bin:/opt/eosio/bin/scripts"

set -m

echo "=== install EOSIO.CDT (Contract Development Toolkit) ==="
apt install /opt/eosio/bin/scripts/eosio.cdt-1.3.2.x86_64.deb

# start nodeos ( local node of blockchain )
# run it in a background job such that docker run could continue
nodeos -e -p eosio -d /mnt/dev/data \
  --config-dir /mnt/dev/config \
  --http-validate-host=false \
  --plugin eosio::producer_plugin \
  --plugin eosio::chain_api_plugin \
  --plugin eosio::http_plugin \
  --http-server-address=0.0.0.0:8888 \
  --access-control-allow-origin=* \
  --contracts-console \
  --verbose-http-errors &
sleep 1s
until curl localhost:8888/v1/chain/get_info
do
  sleep 1s
done

# Sleep for 2 to allow time 4 blocks to be created so we have blocks to reference when sending transactions
sleep 2s
echo "=== setup wallet: eosiomain ==="
# First key import is for eosio system account
cleos wallet create -n eosiomain --to-console | tail -1 | sed -e 's/^"//' -e 's/"$//' > eosiomain_wallet_password.txt
cleos wallet import -n eosiomain --private-key 5KQwrPbwdL6PhXujxW37FSSQZ1JiwsST4cqQzDeyXtP79zkvFD3

echo "=== setup wallet: stablebankwa ==="
# key for eosio account and export the generated password to a file for unlocking wallet later
cleos wallet create -n stablebankwa --to-console | tail -1 | sed -e 's/^"//' -e 's/"$//' > stablebank_wallet_password.txt
# Owner key for stablebankwa wallet
cleos wallet import -n stablebankwa --private-key 5JpWT4ehouB2FF9aCfdfnZ5AwbQbTtHBAwebRXt94FmjyhXwL4K
# Active key for stablebankwa wallet
cleos wallet import -n stablebankwa --private-key 5JD9AGTuTeD5BXZwGQ5AtwBqHK21aHmYnTetHgk1B3pjj7krT8N

# create account for stablebankac with above wallet's public keys
cleos create account eosio stablebankac EOS6PUh9rs7eddJNzqgqDx1QrspSHLRxLMcRdwHZZRL4tpbtvia5B EOS8BCgapgYA2L4LJfCzekzeSr3rzgSTUXRXwNi8bNRoz31D14en9

echo "=== deploy smart contract ==="
# $1 smart contract name
# $2 account holder name of the smart contract
# $3 wallet for unlock the account
# $4 password for unlocking the wallet
deploy_contract.sh stablebank stablebankac stablebankwa $(cat stablebank_wallet_password.txt)
cleos set account permission stablebankac active '{"threshold": 1,"keys": [{"key": "EOS6PUh9rs7eddJNzqgqDx1QrspSHLRxLMcRdwHZZRL4tpbtvia5B","weight": 1}],"accounts": [{"permission":{"actor":"stablebankac","permission":"eosio.code"},"weight":1}]}' owner -p stablebankac

CONTRACT_PATH=/opt/eosio/contracts
cleos create account eosio eosio.token EOS6MRyAjQq8ud7hVNYcfnVPJqcVpscN5So8BhtHuGYqET5GDW5CV EOS6MRyAjQq8ud7hVNYcfnVPJqcVpscN5So8BhtHuGYqET5GDW5CV
cleos set contract eosio.token ${CONTRACT_PATH}/eosio.token -p eosio.token@active

echo "=== create user accounts ==="
# script for create data into blockchain
create_accounts.sh

# * Replace the script with different form of data that you would pushed into the blockchain when you start your own project
cleos push action eosio.token create '[ "eosio", "1000000000.0000 SYS"]' -p eosio.token@active
cleos push action eosio.token issue '[ "eventchainac", "1000.0000 SYS", "init" ]' -p eosio@active
cleos push action eosio.token issue '[ "useraaaaaaaa", "1000.0000 SYS", "init" ]' -p eosio@active
cleos push action eosio.token issue '[ "useraaaaaaab", "1000.0000 SYS", "init" ]' -p eosio@active
cleos push action eosio.token issue '[ "useraaaaaaac", "1000.0000 SYS", "init" ]' -p eosio@active

echo "=== end of setup blockchain accounts and smart contract ==="
# create a file to indicate the blockchain has been initialized
touch "/mnt/dev/data/initialized"

# put the background nodeos job to foreground for docker run
fg %1
