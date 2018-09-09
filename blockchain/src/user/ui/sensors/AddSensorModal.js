import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import TextField from '@material-ui/core/TextField';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';

import AddSensorButtonContainer from '../addsensorbutton/AddSensorButtonContainer'

const styles = theme => ({
  paper: {
    position: 'relative',
    margin: '0 auto',
    marginTop: theme.spacing.unit * 20,
    width: theme.spacing.unit * 70,
    backgroundColor: theme.palette.background.paper,
  },
  content: {
    padding: theme.spacing.unit * 4,
  },
  textField: {
    width: '100%',
  },
  actions: {
  }
});

class SimpleModal extends React.Component {
  state = {
    open: this.props.open,
    address: ''
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  handleClose = () => {
    this.props.onClose()
  };

  render() {
    const { address } = this.state;
    const { classes } = this.props;

    return (
      <div>
        <ClickAwayListener onClickAway={this.handleClose}>
          <Modal
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
            open={this.props.open}
            onClose={this.handleClose}
          >
            <div className={classes.paper}>
              <CardContent className={classes.content}>
                <Typography variant="title" id="modal-title">
                  Add a Sensor
                </Typography>
                <Typography variant="subheading" id="simple-modal-description">
                  Enter the public address associated with the sensor.
                </Typography>
                <TextField
                  required
                  label="Sensor Public Address"
                  className={classes.textField}
                  margin="normal"
                  value={address}
                  onChange={this.handleChange('address')}
                />
              </CardContent>
              <CardActions className={classes.actions}>
                <AddSensorButtonContainer onClick={this.handleClose} address={address}/>
              </CardActions>
            </div>
          </Modal>
        </ClickAwayListener>
      </div>
    );
  }
}

// We need an intermediary variable for handling the recursive nesting.
const AddSensorModal = withStyles(styles)(SimpleModal);

export default AddSensorModal;