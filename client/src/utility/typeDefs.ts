export type Action = {
  type: 'POPULAR' | 'MULTI_VID' | 'CHANNEL_INFO' ;
  data?: string
}

export type Row = {
  id: string;
  key?: string;
  doc?: {
    channelId?: string;
    save_date?: string;
    _id?: string;
  };
}

export type Thumbnail = {
  url: string;
  width: number;
  height: number;
}

export type Resolutions = {
  maxres?: Thumbnail;
  high?: Thumbnail;
  medium?: Thumbnail;
  standard?: Thumbnail;
  default: Thumbnail;
}

export type Video = {
  id: string;
  title: string;
  channelId: string;
  channelTitle: string;
  thumbnailPic: Thumbnail;
  channelOwnerPic: Thumbnail;
  vidTime: string;
  viewCount: string;
  publishTime: string;
}

export interface RawVidInfo {
  id: string;
  snippet: {
    thumbnails: Resolutions; 
    publishedAt: string; 
    title: string; 
    channelTitle: string;
    channelId: string;
  };
  contentDetails: {
    duration: string;
  };
  statistics: {
    viewCount: string;
  };
}

export interface VidWithThumbs extends RawVidInfo {
  channelThumbs: Resolutions;
}

export type FormattedVideo = {
  id: string;
  title: string;
  channelId: string;
  channelTitle: string;
  thumbnailPic: Thumbnail;
  channelOwnerPic: Thumbnail;
  vidTime: string;
  viewCount: string;
  publishTime: string;
}

export type ChanOwnerRes = {
  id: string;
  snippet:{
    thumbnails: Resolutions;
  };
}