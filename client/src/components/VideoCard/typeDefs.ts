import { Row, Video } from '../../utility'


export type VidCardProps = {
  setWatchLater: (arg: any) => void;
  updateWatchLater: (arg: Row) => void;
  watchLater?: boolean;
  video: Video;
}

export type storeDbParams = {
  videoId: string;
  channelId: string;
}