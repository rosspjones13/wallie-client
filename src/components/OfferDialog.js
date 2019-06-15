import React, { Component } from 'react';
import { DialogActions, DialogContent, DialogContentText, DialogTitle, Dialog, Button, TextField } from '@material-ui/core';

class OfferDialog extends Component {
  constructor() {
    super()
    this.state = {
      jobTitle: ''
    }
  }

  handleTextField = () => {
    this.setState({
      jobTitle: document.querySelector('#job-title').value
    })
  }

  render() {
    const { showOfferDialog, handleDialogClose, handleDialogSendRequest } = this.props
    return (
      <div>
        <Dialog open={showOfferDialog}>
          <DialogTitle id="alert-dialog-title">{"Would you like to collaborate with this user?"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              This will send a collaboration request to this user. When they accept, you 
              will start your message history, and potentially help start your mural project!
            </DialogContentText>
          </DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="job-title"
            label="Job Title"
            onChange={this.handleTextField}
          />
          <DialogActions>
            <Button onClick={handleDialogClose} color="primary">
              Cancel
            </Button>
            <Button onClick={() => handleDialogSendRequest(this.state.jobTitle)} color="primary" autoFocus>
              Send Request
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default OfferDialog;