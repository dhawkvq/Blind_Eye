import {  Video } from '../../utility'

export type VidCardProps = {
  setWatchLater: (arg: any) => void;
  setSavedVids?: (arg: any) => void
  watchLater?: boolean;
  video: Video;
}