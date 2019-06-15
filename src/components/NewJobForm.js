import React, { Component } from 'react'
import { API_ROOT, HEADERS } from '../constants'

class NewJobForm extends Component {
  constructor() {
    super()
    this.state = {
      title: '',
      active: true,
      accepted: true,
      requester_id: 1,
      requestee_id: 10
    }
  }

  handleChange = e => {
    this.setState({ title: e.target.value })
  }

  handleSubmit = e => {
    e.preventDefault()
    fetch(`${API_ROOT}/jobs`, {
      method: 'POST',
      headers: HEADERS,
      body: JSON.stringify(this.state)
    })
  }

  render = () => {
    return (
      <div className="newJobForm">
        <form onSubmit={this.handleSubmit}>
          <label>New Job:</label>
          <br />
          <input
            type="text"
            value={this.state.title}
            onChange={this.handleChange}
          />
          <input type="submit" />
        </form>
      </div>
    )
  }
}

export default NewJobForm