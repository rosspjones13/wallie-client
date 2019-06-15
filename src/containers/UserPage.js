import React, { Component, Fragment } from 'react'
import CardGrid from './CardGrid'
import OfferDialog from '../components/OfferDialog'
import JobChip from '../components/JobChip'
import { Typography, Grid } from '@material-ui/core';
import { API_ROOT, HEADERS } from '../constants'

class UserPage extends Component {
  constructor(props) {
    super()
    if (props.user.usertype === "muralist") {
      this.state = {
        pieces: [...props.user.murals],
        jobs: [...props.user.assignments],
        showOfferDialog: false
      }
    }
    else {
      this.state = {
        pieces: [...props.user.walls],
        jobs: [...props.user.offers],
        showOfferDialog: false
      }
    }
  }

  handleStarClick = piece => {
    piece.rating++
    let myPieces = this.state.pieces.map(p => p.id === piece.id ? piece : p )
    fetch(`${API_ROOT}/murals/${piece.id}`, {
      method: "PATCH",
      headers: HEADERS,
      body: JSON.stringify({ 
        image: piece.image,
        rating: piece.rating,
        user_id: piece.user_id
      })
    })
    .then(resp => resp.json())
    this.setState({pieces: myPieces})
  }

  handleInfoClick = () => {
    if (this.props.currUser !== this.props.user) {
      this.setState({ showOfferDialog: true })
    }
  }

  handleDialogClose = () => {
    this.setState({ showOfferDialog: false })
  }

  handleDialogSendRequest = (jobTitle) => {
    console.log(jobTitle, this.props.currUser.id, this.props.user.id)
    let requester = this.props.currUser.usertype === "muralist" ? this.props.user.id : this.props.currUser.id
    let requestee = this.props.user.usertype === "wallist" ? this.props.currUser.id : this.props.user.id
    if (this.props.currUser && this.props.currUser.id !== this.props.user.id) {
      
      fetch(`${API_ROOT}/users/${this.props.currUser.id}/jobs`, {
        method: 'POST',
        headers: HEADERS,
        body: JSON.stringify({
          title: jobTitle,
          active: false,
          accepted: false,
          requester_id: requester,
          requestee_id: requestee
        })
      })
    }
    else {
      console.log('there is no current user')
    }
    this.handleDialogClose()
  }

  componentDidUpdate() {
    const pieces = this.props.user.usertype === "muralist" ? [...this.props.user.murals] : [...this.props.user.walls]
    const jobs = this.props.user.usertype === "muralist" ? [...this.props.user.assignments] : [...this.props.user.offers]
    let same = pieces.length === this.state.pieces.length && pieces.every((value, index) => value === this.state.pieces[index])
    if (!same)  {
      this.setState({
        pieces,
        jobs,
        showOfferDialog: false
      })
    }
  }
  
  render() {
    const { currUser, user, users } = this.props
    const jobOffers = this.state.jobs.filter(job => job.requestee_id === currUser.id && !job.accepted)
    return (
      <Fragment>
        <OfferDialog 
          showOfferDialog={this.state.showOfferDialog} 
          handleDialogClose={this.handleDialogClose}
          handleDialogSendRequest={this.handleDialogSendRequest}
        />
        <Typography variant="h5" color="inherit" className="welcome">Wallie</Typography>
        <Grid item xs={12} styles={{ paddingTop: 60 }}>
          <Grid container justify="center" alignItems="center" spacing={16}>
            {jobOffers.map(job => {
              return (
              <Grid key={job.id} item>
                <JobChip job={job} users={users}/>
              </Grid>
              )
            })}
          </Grid>
        </Grid>
        <CardGrid 
          pieces={this.state.pieces}
          user={user} 
          handleStarClick={this.handleStarClick}
          handleInfoClick={this.handleInfoClick}
          styles={{ paddingTop: 60 }}
        />
      </Fragment>
    )
  }
}

export default UserPage
