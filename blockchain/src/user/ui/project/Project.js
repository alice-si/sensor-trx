import React, { Component } from 'react';

import { withStyles } from '@material-ui/core/styles';
import FundProjectModal from './FundProjectModal'
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Tooltip from '@material-ui/core/Tooltip';
import Grid from '@material-ui/core/Grid';


const styles = theme => ({
  paper: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    position: 'relative',
  },
})

class Project extends Component {
  state = {
    fundProjectModalOpen: false,
  }

  componentWillMount() {
    this.props.fetchProject()
  }

  handleCloseFundProjectModal = () => {
    this.setState({ fundProjectModalOpen: false })
  }

  render() {
    let { classes, project } = this.props
    console.log(project)

    return (
      <Paper className={classes.paper} elevation={1}>
        <Grid container>
          <Grid item xs={6}>
            <Typography variant="headline" gutterBottom>
              {project.name}
            </Typography>
            <Typography variant="subheading" gutterBottom>
              {project.address}
            </Typography>
          </Grid>
          <Grid item xs={2} />
          <Grid item xs={2} />
          <Grid item xs={2}>
            <Typography gutterBottom>Allocated: Ξ {project.balance}</Typography>
            <Tooltip title="Add">
              <Button color="primary"
                      variant="contained"
                      aria-label="Add Funds"
                      onClick={() => { this.setState({ fundProjectModalOpen: !this.state.fundProjectModalOpen }) } }
              >
                Add Funds
              </Button>
            </Tooltip>
          </Grid>
        </Grid>
        <FundProjectModal open={this.state.fundProjectModalOpen} onClose={this.handleCloseFundProjectModal} />
      </Paper>
    )
  }
}

export default withStyles(styles)(Project)