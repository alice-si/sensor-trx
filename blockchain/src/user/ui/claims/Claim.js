import React, { Component } from 'react';

import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Assignment from '@material-ui/icons/Assignment';
import Chip from '@material-ui/core/Chip';
import CheckCircle from '@material-ui/icons/CheckCircle';

class Claim extends Component {
  state = {
    secondary: false,
  }

  render() {
    let { secondary } = this.state
    let { minValue, scheduledOn, bounty, isVerified } = this.props

    let chip = isVerified ? (
        <Chip color="primary" avatar={<Avatar><CheckCircle color="inherit" /></Avatar>} label="Verified" />
      ) : (
        <Chip color="primary" variant="outlined" label="Not Verified" />
      )

    return(
      <ListItem disableGutters>
        <ListItemAvatar>
          <Avatar>
            <Assignment />
          </Avatar>
        </ListItemAvatar>
        <ListItemText
          primary={<Typography noWrap style={{paddingRight: '10px'}}>{`${minValue} ppm - Ξ ${bounty} - ${scheduledOn}`}</Typography>}
          secondary={secondary ? 'Secondary text' : null}
        />
        <ListItemSecondaryAction>
          {chip}
        </ListItemSecondaryAction>
      </ListItem>
    )
  }
}

export default Claim