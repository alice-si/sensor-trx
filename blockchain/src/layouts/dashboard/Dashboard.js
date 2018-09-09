import React, { Component } from 'react'

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import SensorsContainer from '../../user/ui/sensors/SensorsContainer';
import ClaimsContainer from '../../user/ui/claims/ClaimsContainer';

const styles = theme => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  paper: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    position: 'relative',
  },
  absolute: {
    position: 'absolute',
    right: -theme.spacing.unit * 2,
    bottom: -theme.spacing.unit * 2,
  },
  colorBar: {},
  colorChecked: {},
  colorSwitchBase: {
    color: '#aaa',
    '&$colorChecked': {
      color: '#72CC71',
      '& + $colorBar': {
        backgroundColor: '#72CC71',
      },
    },
  },
  chip: {
    verified: {
      backgroundColor: '#72CC71'
    }
  }
})

class Dashboard extends Component {
  authData = this.props

  render() {
    return(
      <Grid container spacing={40}>
        <Grid item xs={6}>
          <SensorsContainer />
        </Grid>
        <Grid item xs={6}>
          <ClaimsContainer />
        </Grid>
      </Grid>
    )
  }
}

export default withStyles(styles)(Dashboard)
