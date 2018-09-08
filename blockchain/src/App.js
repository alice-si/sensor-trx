import React, { Component } from 'react'
import { HiddenOnlyAuth, VisibleOnlyAuth } from './util/wrappers.js'

// UI Components
import LoginButtonContainer from './user/ui/loginbutton/LoginButtonContainer'
import LogoutButtonContainer from './user/ui/logoutbutton/LogoutButtonContainer'

import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Grid from '@material-ui/core/Grid';

// Styles
import './css/oswald.css'
import './css/open-sans.css'
import './css/pure-min.css'
import './App.css'


const styles = {
  root: {
    flexGrow: 1,
  },
  flex: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  container: {
    padding: '40px'
  }
};


class App extends Component {
  render() {
    const { classes } = this.props
    const OnlyAuthLinks = VisibleOnlyAuth(() =>
      <span>
        <Button color="inherit" href="/dashboard">
          Dashboard
        </Button>
        <Button color="inherit" href="/profile">
          Profile
        </Button>
        <LogoutButtonContainer />
      </span>
    )

    const OnlyGuestLinks = HiddenOnlyAuth(() =>
      <span>
        <Button color="inherit" href="/signup">
          Sign Up
        </Button>
        <LoginButtonContainer />
      </span>
    )

    return (
      <div className="App">
        <AppBar position='static'>
          <Toolbar>
            <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
              <MenuIcon />
            </IconButton>
            <Typography variant="title" color="inherit" className={classes.flex}>
              SensorTRX
            </Typography>
            <OnlyGuestLinks />
            <OnlyAuthLinks />
          </Toolbar>
        </AppBar>
        <Grid container className={classes.container}>
          <Grid item xs={12}>
            {this.props.children}
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles)(App)
