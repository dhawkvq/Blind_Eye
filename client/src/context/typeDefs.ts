import { Video } from '../utility'

export type TransitionState = {
  fromComp?:string;
  toComp?:string;
  data?:Video;
}

export type ContextTypes = {
  savedVideos: Video[];
  hotReel: Video[];
  watchLater: Video[];
  transitionComp: TransitionState;
  setTransitionComp: React.Dispatch<React.SetStateAction<TransitionState>>;
  setSavedVids: React.Dispatch<React.SetStateAction<Video[]>>;
  setHotReel: React.Dispatch<React.SetStateAction<Video[]>>;
  setWatchLater: React.Dispatch<React.SetStateAction<Video[]>>;
  handleNextPage: () => void;
  handleRouteChange: ({ animationName }:{ animationName: string }) => void;
  contentEnded: boolean;
  loading: boolean;
}