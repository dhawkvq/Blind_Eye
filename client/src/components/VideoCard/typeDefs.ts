import {  Video } from '../../utility'

export type VidCardProps = {
  setWatchLater: React.Dispatch<React.SetStateAction<Video[]>>;
  setSavedVids?: React.Dispatch<React.SetStateAction<Video[]>>;
  handleTransition?: (path:string) => void;
  watchLater?: boolean;
  savedVideos?: boolean;
  video: Video;
}