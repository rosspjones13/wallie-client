import React from 'react'
import { ActionCableConsumer } from 'react-actioncable-provider'

const Cable = ({ job, handleReceivedMessage }) => {
  return (
    <ActionCableConsumer 
      key={job.id}
      channel={{ channel: 'MessagesChannel', job: job.id}}
      onReceived={handleReceivedMessage}
    />
  )
}

export default Cable
