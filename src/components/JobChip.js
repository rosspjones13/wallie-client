import React from 'react';
import PropTypes from 'prop-types';
import AcceptJobDialog from './AcceptJobDialog'
import { withStyles } from '@material-ui/core/styles';
import { Avatar, Chip } from '@material-ui/core/';
import FaceIcon from '@material-ui/icons/Face';
import { API_ROOT, HEADERS } from '../constants'

const styles = theme => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  chip: {
    margin: theme.spacing.unit,
  },
});

class JobChip extends React.Component {
  constructor() {
    super()
    this.state = {
      openMenu: false,
      currTarget: null
    }  
  }

  handleClick = (event) => {
    this.setState({ openMenu: true, currTarget: event.currentTarget })
  }

  handleAccept = () => {
    this.setState({ openMenu: false, currTarget: null })
    const acceptJob = this.props.job
    acceptJob.accepted = true
    fetch(`${API_ROOT}/users/${acceptJob.requestee_id}/jobs/${acceptJob.id}`, {
      method: "PATCH",
      headers: HEADERS,
      body: JSON.stringify({
        active: acceptJob.active,
        accepted: acceptJob.accepted,
        title: acceptJob.title,
        requester_id: acceptJob.requester_id,
        requestee_id: acceptJob.requestee_id
      })
    })
    .then(res => res.json())
  }

  handleDecline = () => {
    this.setState({ openMenu: false, currTarget: null })
  }

  render() {
    const { classes, users, job } = this.props;
    const userName = users.find(user => user.id === job.requester_id)
    return (
      <div className={classes.root}>
        <Chip
          avatar={<Avatar>{userName.name[0]}</Avatar>}
          label={`New Offer! ${job.title}`}
          onClick={this.handleClick}
          className={classes.chip}
          deleteIcon={<FaceIcon />}
        />
        {this.state.openMenu ?
          <AcceptJobDialog
            currentTarget={this.state.currTarget}
            handleAccept={this.handleAccept}
            handleDecline={this.handleDecline}
          /> : null}
      </div>
    )
  }
}

JobChip.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(JobChip);