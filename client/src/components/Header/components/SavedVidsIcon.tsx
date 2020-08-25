import React from 'react'
import { IconProps } from './typeDefs'

const SavedVidIcon = ({ fill = 'white' }: IconProps ) => (
  <svg width="30" height="30" viewBox="0 0 93 90" stroke={fill} fill={fill} xmlns="http://www.w3.org/2000/svg">
    <path d="M52.1295 1H6.95683C2.58849 1 1.16547 5.25641 1 7.38462V78.1065C1.79424 82.4284 5.96403 83.8363 7.94964 84H46.6691V76.142H8.94245V8.85799H46.6691V24.0828H62.0576V46.1834H70V18.1894L52.1295 1Z" />
    <path d="M24 65V35L51 50.2459L24 65Z" />
    <path d="M78 54H70.5H70V74.4167L61 66.1528L56 71.0139L74 89L92 71.0139L86.5 66.1528L78 74.4167V54Z" />
  </svg>
)

export default SavedVidIcon