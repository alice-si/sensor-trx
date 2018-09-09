import React from 'react';
import { withStyles } from '@material-ui/core/styles';

import Switch from '@material-ui/core/Switch';


const styles = theme => ({
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
})

class ToggleSensorButton extends React.Component {

  handleSensorSwitchChange = sensorId => event => {
    if (!!event.target.checked) {
      this.props.activateSensor(sensorId)
    } else {
      this.props.deactivateSensor(sensorId)
    }
  };

  render() {
    const { classes, sensorId, isActive } = this.props
    return (
      <Switch
        checked={isActive}
        onChange={this.handleSensorSwitchChange(sensorId)}
        value="Activated"
        classes={{
          switchBase: classes.colorSwitchBase,
          checked: classes.colorChecked,
          bar: classes.colorBar,
        }}
      />
    )
  }
}

export default withStyles(styles)(ToggleSensorButton)