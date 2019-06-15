import React, { Component } from 'react'
import { API_ROOT } from '../constants'
import MessagesArea from './MessagesArea'
import ListOfJobs from './ListOfJobs'
import { Grid } from '@material-ui/core'

class JobList extends Component {
  constructor() {
    super()
    this.state = {
      jobs: [],
      activeJob: null
    }
  }

  componentDidMount = () => {
    fetch(`${API_ROOT}/users/${this.props.currUser.id}/jobs`)
    .then(res => res.json())
    .then(jobs => this.setState({ jobs: jobs.filter(job => job.accepted) }))
  }

  handleClick = id => {
    this.setState({ activeJob: id })
  }

  handleReceivedJob = response => {
    const { job } = response
    this.setState({
      jobs: [...this.state.jobs, job]
    })
  }

  handleReceivedMessage = response => {
    const { message } = response
    const jobs = [...this.state.jobs]
    const job = jobs.find(
      job => job.id === message.job_id
    )
    job.messages = [...job.messages, message]
    this.setState({ jobs })
  }
  
  render() {
    const { jobs, activeJob} = this.state
    return (
      <div className="jobsList">
        {/* <ActionCableConsumer
          channel={{ channel: 'JobsChannel' }}
          onReceived={this.handleReceivedJob}
        /> */}
        {/* {this.state.jobs.length ? (
          <Cable
            jobs={jobs}
            handleReceivedMessage={this.handleReceivedMessage}
          />
        ) : null} */}
        <Grid 
          container 
          direction="row" 
          justify="flex-start" 
          alignItems="flex-start" 
          spacing={8}
          style={{ paddingTop: 60}}  
        >
          {mapJobs(jobs, this.handleClick)}
          {activeJob ? (
            <MessagesArea
            handleReceivedMessage={this.handleReceivedMessage}
            currUser={this.props.currUser}
            users={this.props.users}
            job={findActiveJob(
              jobs,
              activeJob
              )}
              />
              ) : null}
        </Grid>
      </div>
    )
  }
}

export default JobList

// helpers

const findActiveJob = (jobs, activeJob) => {
  return jobs.find(
    job => job.id === activeJob
  )
}

const mapJobs = (jobs, handleClick) => {
  return (
    <Grid item xs={4} style={{ paddingLeft: 50, paddingRight: 5 }}>
      <ListOfJobs jobs={jobs} handleClick={handleClick}/> 
    </Grid>
  )
}