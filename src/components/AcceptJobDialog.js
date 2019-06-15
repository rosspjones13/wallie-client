import React from 'react';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

class SimpleMenu extends React.Component {
  render() {
    const { currentTarget, handleAccept, handleDecline } = this.props;

    return (
      <div>
        <Menu
          id="simple-menu"
          anchorEl={currentTarget}
          open={Boolean(currentTarget)}
        >
          <MenuItem onClick={handleAccept}>Accept</MenuItem>
          <MenuItem onClick={handleDecline}>Decline</MenuItem>
        </Menu>
      </div>
    );
  }
}

export default SimpleMenu;