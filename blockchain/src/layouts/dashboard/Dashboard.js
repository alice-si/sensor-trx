import React, { Component } from 'react'
import AddClaimModal from './AddClaimModal'

import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';
import CheckCircle from '@material-ui/icons/CheckCircle';
import Paper from '@material-ui/core/Paper';
import Tooltip from '@material-ui/core/Tooltip';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import Assignment from '@material-ui/icons/Assignment';
import SensorsContainer from '../../user/ui/sensors/SensorsContainer';

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

function generate(element) {
  return [0, 1, 2].map(value =>
    React.cloneElement(element, {
      key: value,
    }),
  );
}

class Dashboard extends Component {
  state = {
    dense: false,
    secondary: false,
    addClaimModalOpen: false,
  }
  authData = this.props

  handleCloseClaimModal = () => {
    this.setState({ addClaimModalOpen: false })
  }

  render() {
    const { classes } = this.props
    const { dense, secondary } = this.state;
    return(
      <Grid container spacing={40}>
        <Grid item xs={6}>
          <SensorsContainer />
        </Grid>
        <Grid item xs={6}>
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
              {generate(
                <ListItem>
                  <ListItemAvatar>
                    <Avatar>
                      <Assignment />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary="Single-line item"
                    secondary={secondary ? 'Secondary text' : null}
                  />
                  <ListItemSecondaryAction>
                    {/*<Chip color="primary" variant="outlined" label="Not Verified" />*/}
                    <Chip color="primary" avatar={<Avatar><CheckCircle color="inherit" /></Avatar>} label="Verified" />
                  </ListItemSecondaryAction>
                </ListItem>,
              )}
            </List>
          </Paper>
        </Grid>
        <AddClaimModal open={this.state.addClaimModalOpen} onClose={this.handleCloseClaimModal} />
      </Grid>
    )
  }
}

export default withStyles(styles)(Dashboard)
