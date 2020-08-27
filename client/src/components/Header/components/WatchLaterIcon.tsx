import React from 'react'
import { IconProps } from './typeDefs'

const WatchLaterIcon = ({ fill = 'white' }: IconProps ) => (
  <svg style={{ height: 25, width: 25, fill }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
    <path d="M378.435,350.609H44.522V83.478h400.696v178.087h44.522V83.478c0-24.71-20.035-44.522-44.522-44.522H44.522
      C19.812,38.957,0,58.769,0,83.478v267.13c0,24.487,19.812,44.522,44.522,44.522h111.304v44.522h178.087V395.13h44.522V350.609z"
      />
    <polygon points="411.826,272.696 378.435,306.087 445.217,372.87 378.435,439.652 411.826,473.043 512,372.87"/>
    <polygon points="267.13,306.087 267.13,239.304 333.913,239.304 333.913,194.783 267.13,194.783 267.13,128 222.609,128 
      222.609,194.783 155.826,194.783 155.826,239.304 222.609,239.304 222.609,306.087"/>
  </svg>
)

export default WatchLaterIcon