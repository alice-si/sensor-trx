import React, { Component } from 'react';

import { withStyles } from '@material-ui/core/styles';
import AddClaimModal from './AddClaimModal'
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Tooltip from '@material-ui/core/Tooltip';
import AddIcon from '@material-ui/icons/Add';
import Claim from './Claim';


const styles = theme => ({
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
})

class Claims extends Component {
  state = {
    dense: false,
    addClaimModalOpen: false,
  }

  componentWillMount() {
    this.props.fetchClaims()
  }

  handleCloseClaimModal = () => {
    this.setState({ addClaimModalOpen: false })
  }

  render() {
    let { dense } = this.state
    let { classes, claims } = this.props
    console.log(claims)

    return (
      <Paper className={classes.paper} elevation={1}>
        <Typography variant="headline" gutterBottom>
          Claims
        </Typography>
        <Tooltip title="Add">
          <Button className={classes.absolute}
                  variant="fab"
                  color="primary"
                  aria-label="Add"
                  onClick={() => { this.setState({ addClaimModalOpen: !this.state.addClaimModalOpen }) } }
          >
            <AddIcon />
          </Button>
        </Tooltip>
        <List dense={dense}>
          { claims.map((claim, index) => {
            return (
              <Claim
                key={index}
                minValue={claim.minValue}
                minTime={claim.minTime}
                bounty={claim.bounty}
                isVerified={claim.isVerified}
              />
            )
          }) }
        </List>
        <AddClaimModal open={this.state.addClaimModalOpen} onClose={this.handleCloseClaimModal} />
      </Paper>
    )
  }
}

export default withStyles(styles)(Claims)