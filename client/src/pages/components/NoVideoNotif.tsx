import React from 'react'
import NoVideo from './NoVideo'

const NoVideoNotif = ({ message }:{ message:string }) => (
  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', color: 'white', fontSize: 20}}>
    <NoVideo />
    <p>{message}</p>
  </div>
)

export default NoVideoNotif