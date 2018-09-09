import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import TextField from '@material-ui/core/TextField';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';

import AddClaimButtonContainer from '../addclaimbutton/AddClaimButtonContainer'


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
    padding: '30px',
    paddingTop: '0',
  }
});

class SimpleClaimModal extends React.Component {
  state = {
    open: this.props.open,
    ppm: 60,
    bounty: .1,
    date: '2018-10-01',
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
    const { ppm, bounty, date } = this.state;
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
                  Add a Claim
                </Typography>
                <Typography variant="subheading" id="simple-modal-description">
                  Enter the sensor measurement for the claim.
                </Typography>
                <TextField
                  label="Air Quality Limit (ppm)"
                  value={ppm}
                  className={classes.textField}
                  margin="normal"
                  onChange={this.handleChange('ppm')}
                />
                <TextField
                  label="Bounty (ETH)"
                  value={bounty}
                  className={classes.textField}
                  margin="normal"
                  onChange={this.handleChange('bounty')}
                />
                <TextField
                  id="date"
                  label="Scheduled for"
                  type="date"
                  value={date}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  style={{marginTop: '15px'}}
                  onChange={this.handleChange('date')}
                />
              </CardContent>
              <CardActions className={classes.actions}>
                <AddClaimButtonContainer onClick={this.handleClose} ppm={ppm} bounty={bounty} scheduledOn={date} />
              </CardActions>
            </div>
          </Modal>
        </ClickAwayListener>
      </div>
    );
  }
}

// We need an intermediary variable for handling the recursive nesting.
const AddClaimModal = withStyles(styles)(SimpleClaimModal);

export default AddClaimModal;