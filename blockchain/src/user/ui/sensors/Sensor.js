import React, { Component } from 'react';

import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import WifiTethering from '@material-ui/icons/WifiTethering';
import ToggleSensorButtonContainer
  from "../togglesensorbutton/ToggleSensorButtonContainer";


class Sensor extends Component {
  state = {
    secondary: false,
  }

  render() {
    let { secondary } = this.state
    let { address, isActive } = this.props

    return(
      <ListItem disableGutters>
        <ListItemAvatar>
          <Avatar>
            <WifiTethering />
          </Avatar>
        </ListItemAvatar>
        <ListItemText
          primary={<Typography noWrap style={{paddingRight:'10px'}}>{address}</Typography>}
          secondary={secondary ? 'Secondary text' : null}
        />
        <ListItemSecondaryAction>
          <ToggleSensorButtonContainer sensorId={address} isActive={isActive} />
        </ListItemSecondaryAction>
      </ListItem>
    )
  }
}

export default Sensor