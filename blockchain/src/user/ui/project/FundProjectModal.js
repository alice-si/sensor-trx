import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import TextField from '@material-ui/core/TextField';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';

import FundProjectButtonContainer from '../fundprojectbutton/FundProjectButtonContainer'


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

class SimpleClaimModal extends React.Component {
  state = {
    open: this.props.open,
    amount: 1
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
    const { amount } = this.state;
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
                  Fund your Project
                </Typography>
                <Typography variant="subheading" id="simple-modal-description">
                  Enter the amount you'd like your project to award in bounties.
                </Typography>
                <TextField
                  id="uncontrolled"
                  label="Bounty Amount (ETH)"
                  value={amount}
                  className={classes.textField}
                  margin="normal"
                  onChange={this.handleChange('amount')}
                />
              </CardContent>
              <CardActions className={classes.actions}>
                <FundProjectButtonContainer onClick={this.handleClose} amount={amount} />
              </CardActions>
            </div>
          </Modal>
        </ClickAwayListener>
      </div>
    );
  }
}

// We need an intermediary variable for handling the recursive nesting.
const FundProjectModal = withStyles(styles)(SimpleClaimModal);

export default FundProjectModal;