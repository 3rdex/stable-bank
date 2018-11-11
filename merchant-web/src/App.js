import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import RefreshIcon from '@material-ui/icons/Refresh';

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';

import Divider from '@material-ui/core/Divider';

import Grid from '@material-ui/core/Grid';


import {withStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {Shop} from "./Services/Shop";

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  table: {
    minWidth: 700,
  },
  paper: {
    fontColor: 'rgba(0, 0, 0, 0.87)',
    color: 'blue'
  },

  card: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  highlight: {
    backgroundColor: '#000000'
  }
});

let id = 0;

function createData(name, calories, fat, carbs, protein, z, highlight) {
  id += 1;
  return {id, name, calories, fat, carbs, protein, z, highlight};
}

const rows = [
  createData('1006', '11/11 10:47', 'Purchase', 'Forest Circle', '$ 0.36', '$ 3.60'),
  createData('1005', '11/11 09:21', 'Purchase', 'Lin Yuan', '$ 0.54', '$ 5.40'),
  createData('1004', '11/11 08:33', 'Purchase', 'Charles Li', '$ 0.98', '$ 9.80'),
  createData('1004', '11/11 08:33', 'Settle', '', '$ -0.98', '$ 0.98'),
  createData('1003', '11/10 19:20', 'Refund', 'Albert Pang', '$ -0.36', '$ -3.60'),
  createData('1002', '11/11 19:18', 'Purchase', 'Albert Pang', '$ 0.36', '$ 3.60'),
];

const BALANCE_FIX = 3521.50;
const PENDING_FIX = 201.32;

class App extends Component {

  componentWillMount() {
    this.setState({rows, availableBalance: '3521.50', pendingBalance: '201.32'});
  }

  async componentDidMount() {
    const balance = await Shop.getBalance();
    const pending = await Shop.getPending();
    this.setState({
      availableBalance: BALANCE_FIX + balance,
      pendingBalance: PENDING_FIX + pending,
    });

  }

  async refresh() {
    const balance = await Shop.getBalance();
    const pending = await Shop.getPending();
    rows.unshift(createData('1007', '11/11 13:47', 'Purchase', 'Stable Gump', '$ 9.00', '$ 0.99', true));
    this.setState({
      rows,
      availableBalance: BALANCE_FIX + balance,
      pendingBalance: PENDING_FIX + pending,
    });
    console.log(rows);
  }

  render() {

    const bull = <span className={this.props.classes.bullet}>•</span>;

    return (
      <div className="App">
        <header className="App-header">

          <Paper className={this.props.classes.root}>
            <AppBar position="static">
              <Toolbar>
                <IconButton className={this.props.classes.menuButton} color="inherit" aria-label="Menu">
                  <MenuIcon/>
                </IconButton>
                <Typography variant="h6" color="inherit" className={this.props.classes.grow}>
                  Stable Bank
                </Typography>
                <Button color="inherit" onClick={() => this.refresh()}>
                  <RefreshIcon/>
                </Button>
              </Toolbar>
            </AppBar>

            <Paper>
              <Grid container spacing={24}>
                <Grid item xs={6}>

                  <Card className={this.props.classes.card}>
                    <CardContent>
                      <Typography className={this.props.classes.title} color="textSecondary" gutterBottom>
                        My Balance
                      </Typography>
                      <Typography variant="h5" component="h2">
                        $ {this.state.availableBalance}
                      </Typography>
                      <Typography className={this.props.classes.pos} color="textSecondary">
                        Available Now
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button size="small" color="primary">
                        Send
                      </Button>
                      <Button size="small" color="primary">
                        Withdraw
                      </Button>
                    </CardActions>
                  </Card>

                </Grid>
                <Grid item xs={6}>


                  <Card className={this.props.classes.card}>
                    <CardContent>
                      <Typography className={this.props.classes.title} color="textSecondary" gutterBottom>
                        Pending Balance
                      </Typography>
                      <Typography variant="h5" component="h2">
                        $ {this.state.pendingBalance}
                      </Typography>
                      <Typography className={this.props.classes.pos} color="textSecondary">
                        Next Settlement: 11/12 12:32
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button size="small" color="primary">
                        Refund a Transaction
                      </Button>
                    </CardActions>
                  </Card>

                </Grid>
              </Grid>
            </Paper>

            <Paper>

              <Table className={this.props.classes.table}>
                <TableHead>
                  <TableRow>
                    <TableCell>Transaction #</TableCell>
                    <TableCell numeric>Time</TableCell>
                    <TableCell numeric>Type</TableCell>
                    <TableCell>Customer ID</TableCell>
                    <TableCell numeric>Pending (USD)</TableCell>
                    <TableCell numeric>Available Now (USD)</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {this.state.rows.map(row => {
                    return (
                      <TableRow key={row.id} classes={{selected: this.props.classes.highlight}}
                                selected={row.highlight}>
                        <TableCell component="th" scope="row">
                          {row.name}
                        </TableCell>
                        <TableCell numeric>{row.calories}</TableCell>
                        <TableCell numeric>{row.fat}</TableCell>
                        <TableCell numeric>{row.carbs}</TableCell>
                        <TableCell numeric>{row.protein}</TableCell>
                        <TableCell numeric>{row.z}</TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </Paper>
          </Paper>
        </header>
      </div>
    );
  }
}

export default withStyles(styles)(App);
