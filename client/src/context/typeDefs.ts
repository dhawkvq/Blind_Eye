import { Video } from '../utility'

export type TransitionState = {
  fromComp?:string;
  toComp?:string;
}

export type ContextTypes = {
  savedVideos: Video[];
  hotReel: Video[];
  watchLater: Video[];
  transitionComp: TransitionState;
  setTransitionComp: React.Dispatch<React.SetStateAction<TransitionState>>;
  handleTransition: (path:string) => void;
  setSavedVids: React.Dispatch<React.SetStateAction<Video[]>>;
  setHotReel: React.Dispatch<React.SetStateAction<Video[]>>;
  setWatchLater: React.Dispatch<React.SetStateAction<Video[]>>;
  handleNextPage: () => void;
  contentEnded: boolean;
  loading: boolean;
}