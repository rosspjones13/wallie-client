import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import CommentIcon from '@material-ui/icons/Comment';

const styles = theme => ({
  jobList: {
    top: 20,
    left: 40,
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
});

class CheckboxList extends React.Component {
  constructor() {
    super()
    this.state = {
      checked: [],
    };
  }

  handleToggle = value => () => {
    const { checked } = this.state;
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];
    value.active = !value.active
    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    
    this.setState({
      checked: newChecked,
    });
  };

  render() {
    const { classes, jobs } = this.props;
    return (
      <List className={classes.jobList}>
        {jobs.map(job => (
          <ListItem key={job.id} dense button onClick={this.handleToggle(job)}>
            <Checkbox
              label="finished"
              checked={job.active}
              tabIndex={-1}
              disableRipple
            />
            <ListItemText primary={`${job.title} (${!job.active ? 'In Progress': 'Completed'})`} />
            <ListItemSecondaryAction>
              <IconButton aria-label="Comments" onClick={() => this.props.handleClick(job.id)}>
                <CommentIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    );
  }
}

CheckboxList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CheckboxList);
