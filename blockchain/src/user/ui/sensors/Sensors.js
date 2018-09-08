import React, { Component } from 'react';

import { withStyles } from '@material-ui/core/styles';
import AddSensorModal from './AddSensorModal'
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Tooltip from '@material-ui/core/Tooltip';
import AddIcon from '@material-ui/icons/Add';
import Sensor from './Sensor';

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

class Sensors extends Component {
  state = {
    dense: false,
    addSensorModalOpen: false,
  }

  componentWillMount() {
    this.props.fetchSensors()
  }

  handleCloseSensorModal = () => {
    this.setState({ addSensorModalOpen: false })
  }

  render() {
    let { dense } = this.state
    let { classes, sensors } = this.props
    console.log(sensors)

    return (
      <Paper className={classes.paper} elevation={1}>
        <Typography variant="headline" gutterBottom>
          Sensors
        </Typography>
        <Tooltip title="Add">
          <Button className={classes.absolute}
                  variant="fab"
                  color="primary"
                  aria-label="Add"
                  onClick={() => { this.setState({ addSensorModalOpen: !this.state.addSensorModalOpen }) } }
          >
            <AddIcon />
          </Button>
        </Tooltip>
        <List dense={dense}>
          { sensors.map((sensor) => {
            return (
              <Sensor
                key={sensor.address}
                address={sensor.address}
                isActive={sensor.isActive}
              />
            )
          }) }
        </List>
        <AddSensorModal open={this.state.addSensorModalOpen} onClose={this.handleCloseSensorModal} />
      </Paper>
    )
  }
}

export default withStyles(styles)(Sensors)