import React, { Component } from 'react'
import { API_ROOT, HEADERS } from '../constants'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button'

class NewMessageForm extends Component {
  constructor(props) {
    super()
    this.state = {
      content: '',
      job_id: props.job_id,
      user_id: props.currUser.id
    }
  }

  componentWillReceiveProps = nextProps => {
    this.setState({ job_id: nextProps.job_id })
  }
  
  handleChange = e => {
    this.setState({ content: e.target.value })
  }

  handleSubmit = e => {
    e.preventDefault()

    fetch(`${API_ROOT}/messages`, {
      method: 'POST',
      headers: HEADERS,
      body: JSON.stringify(this.state)
    })
    this.setState({ content: '' })
  }

  render() {
    return (
      <div className="newMessageForm">
        <form onSubmit={this.handleSubmit}>
          <TextField 
            style={{ verticalAlign: 'baseline', width: '40vw' }}
            type="text"
            label="New Message..."
            value={this.state.content}
            onChange={this.handleChange}
          />
          <Button variant="contained" color="primary" size="small" type="submit">
            Send
          </Button>
        </form>
      </div>
    )
  }
}

export default NewMessageForm
