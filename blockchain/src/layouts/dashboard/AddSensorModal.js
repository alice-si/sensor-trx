import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';

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
  addButton: {
  },
  actions: {
  }
});

class SimpleModal extends React.Component {
  state = {
    open: this.props.open,
  };

  handleClose = () => {
    this.props.onClose()
  };

  render() {
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
                  id="uncontrolled"
                  label="Sensor Public Address"
                  defaultValue=""
                  className={classes.textField}
                  margin="normal"
                />
              </CardContent>
              <CardActions className={classes.actions}>
                <Button className={classes.addButton} variant="contained" color="primary">
                  Add Sensor
                </Button>
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