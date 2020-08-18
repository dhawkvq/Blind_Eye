import { db, WLDB } from '../config'
import {
  Action, 
  Row, 
  Resolutions, 
  VidWithThumbs,
  RawVidInfo, 
  FormattedVideo, 
  Thumbnail, 
  ChanOwnerRes 
} from './typeDefs'
import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.extend(duration)
dayjs.extend(relativeTime)

const { 
  REACT_APP_API_ENDPOINT, 
  REACT_APP_API_KEY, 
  REACT_APP_CHANNELS_ENDPOINT,
  REACT_APP_MULT_CHAN_ENDPOINT 
} = process.env



export const createEndpoint = (action: Action): string => {
  if(!action) throw new Error('Action object must be passed to create endpoint')

  const { data, type } = action

  if(type === 'MULTI_VID' || type === 'CHANNEL_INFO'){
    if(!data)throw new Error(`data property required when passing action type: ${type}`)
    if(typeof(data) !== 'string') throw new Error('data arg on action must be of type string')
  } 

  switch(type){
    case 'POPULAR':
      return `${REACT_APP_API_ENDPOINT}&key=${REACT_APP_API_KEY}`

    case 'MULTI_VID':
      return `${REACT_APP_MULT_CHAN_ENDPOINT}&id=${data}&key=${REACT_APP_API_KEY}`

    case 'CHANNEL_INFO':
      return `${REACT_APP_CHANNELS_ENDPOINT}&id=${data}&key=${REACT_APP_API_KEY}`
    
    default:
      throw new Error('action type passed was not one of type: POPULAR | MULTI_VID| CHANNEL_INFO')
  }
}


export const getStorageInfo = async (navigator: Navigator): Promise<void> => {
  if(!navigator) throw new Error('user agent navigator must be passed to grab storage info')
  try {
    const { usage, quota } = await navigator.storage.estimate();
    if(!usage || !quota) throw new Error('failed to estimate storage')
    const percentageUsed = (usage / quota) * 100;
    console.log(`You've used ${percentageUsed}% of the available storage.`);
    const remaining = quota - usage;
    console.log(`You can write up to ${remaining} more bytes.`);
  }
  catch(error){
    throw error
  } 
}

export const formatDuration = (time: string): string => {

  if(!time) throw new Error('time arg is required')
  if(typeof(time) !== 'string') throw new Error('time arg passed must be of type string')

  const formatted = dayjs.duration(time)

  const validDuration = Object.keys(formatted['$d'])

  if(!validDuration.length) throw new Error('not a valid date ISO 8601 date time passed')
  

  let { hours, minutes, seconds } = formatted['$d']
  if(+seconds < 10){
    seconds = `0${seconds}`
  }
  if(+hours > 0){
    return `${hours}:${minutes}:${seconds}`
  }
  return `${minutes}:${seconds}`
}


export const formatViewCount = (count: string): string => {

  if(!count) throw new Error('count arg of type string required')
  if(typeof(count) !== 'string') throw new Error('arg count must be of type string')

  if(count.length > 6){
    const mil = count[0]
    const thou = count[1]
    if(+thou > 0){
      return `${mil}.${thou}M`;
    }
    return `${mil}M`;
  }
  if(count.length === 6 ){
    return `${count.slice(0,3)}K`
  }
  if(count.length === 5){
    const firstTwo = count.slice(0,2)
    const third = count.slice(2,3) 
    if(+third > 0){
      return `${firstTwo}.${third}K`
    }
    return `${firstTwo}K`
  } 
  return count
}

export const formatPublishDate = (time: string): string => {

  if(!time) throw new Error('time arg of type string required')
  if(typeof(time) !== 'string') throw new Error('time arg must be of type string')

  const validDate = dayjs(time).isValid()
  if(!validDate) throw new Error('time passed was not a valid date time')
  return dayjs(time).fromNow()
} 


export const filterThumbPic = (thumbnails: Resolutions ): Thumbnail => {
  if(typeof(thumbnails) !== 'object') throw new Error('thumbnails param must be of type object')
  if(!thumbnails.default) throw new Error('default object required in thumbnails')

  const thumbnail = thumbnails.maxres ? thumbnails.maxres: 
                    thumbnails.standard ? thumbnails.standard :
                    thumbnails.high ? thumbnails.high : 
                    thumbnails.medium ? thumbnails.medium : 
                    thumbnails.default

  const { url, width, height } = thumbnail
  if(!url || !width || !height) {
    throw new Error('thumbnail returned from function must have attributes:{ url: string, width: number, height: number}')                    
  }
  return thumbnail
}


export const distillVidInfo = (videos: VidWithThumbs[]): FormattedVideo[] => {

  return videos.map(video => { 

    const { 
      channelThumbs, 
      snippet: { 
        thumbnails, 
        publishedAt, 
        title, 
        channelTitle, 
        channelId 
      },
      contentDetails : { duration },
      statistics: { viewCount }
    } = video
    
    return {
      id: video.id,
      title,
      channelId,
      channelTitle,
      thumbnailPic: filterThumbPic(thumbnails),
      channelOwnerPic: filterThumbPic(channelThumbs) ,
      vidTime: duration,
      viewCount,
      publishTime: publishedAt
    }

  })

}


export const fetchInfo = async () => {
  try {
    const res = await fetch(createEndpoint({ type: 'POPULAR' }))
    if(!res.ok) throw new Error('failed to fetchInfo')
    return await res.json()
  }
  catch(error) {
    throw error
  }
}

export const downloadVideo = async (id:string) => {
  try{

    const stream = await fetch(`api/stream/${id}`)
    if(!stream.ok) throw new Error('no stream')

    if(stream && stream.body){
      const reader = stream.body.getReader();

      let contentLength

      if(stream.headers){
        contentLength = stream.headers.get('Content-Length')
      }

      let receivedLength = 0
      let chunks: Uint8Array[] = []
      while(true) {
        const {done, value} = await reader.read();

        if (done) break

        if(value){
          chunks.push(value)
          receivedLength += value.length;
        }else{
          break
        }

        console.log(`Received ${receivedLength} of ${contentLength}`)
      }

      return new Blob(chunks)

    }
  }catch(error){
    console.log('there was an error grabbing ready stream =>', error )
    throw error
  }
}

export const multiVidInfo = async ( saved: Row[] ) => {

  const videoIds = saved.reduce((acc:string[],curVal) => {
    return acc = [...acc,curVal.id]
  },[])

  try{
    const vids = await fetch(createEndpoint({ type: 'MULTI_VID', data: videoIds.join() }))
    if(!vids.ok) throw new Error('multi vid fetch failed')
    
    const { items } = await vids.json()
    if(!items) throw new Error('request came up empty')
    
    try{
      return await channelOwnerInfo(items)
    }
    catch(error){
      throw error
    }
  }
  catch(error){
    throw error
  }
} 


export const grabDbItems = async () => {

  try {
    return await db.allDocs({ include_docs: true })
  } 
  catch (error) {
    throw error  
  }
}

export const grabWlItems = async () => {
  try{
    const info = await WLDB.allDocs({ include_docs: true })
    try{
      return await multiVidInfo(info.rows)
    }
    catch(error){
      throw error
    }
  }
  catch(error){
    throw error
  }
}

export const channelOwnerInfo = async (incoming: RawVidInfo[]) => {

  const channelIds = incoming.reduce((acc: string[],curVal) => {
    return acc = [...acc,curVal.snippet.channelId]
  },[])

  try{
    const first = await fetch(createEndpoint({ type: 'CHANNEL_INFO', data: channelIds.join() }));

    if(!first.ok) throw new Error('problem retrieving specific channels from ids')

    const { items } : { items: ChanOwnerRes[] } = await first.json()
    if(!items) throw new Error('items came back empty')


    const reduced = items.reduce((acc,curVal) => {
      acc[curVal.id] = curVal.snippet.thumbnails
      return acc
    },{})

    const transformedItems = incoming.reduce((acc: VidWithThumbs[] ,curVal) => {
      let itemId = curVal.snippet.channelId 
      let thumbs = reduced[itemId]
      return acc = [...acc, {...curVal, channelThumbs: thumbs}]
    },[])

    return distillVidInfo(transformedItems)


  }catch(error){
    throw error
  }
}