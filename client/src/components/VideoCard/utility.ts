import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.extend(duration)
dayjs.extend(relativeTime)

export const formatDuration = (time) => {
  let formatted = dayjs.duration(time)
  let { hours, minutes, seconds } = formatted['$d']
  if(+seconds < 10){
    seconds = `0${seconds}`
  }
  if(+hours > 0){
    return `${hours}:${minutes}:${seconds}`
  }
  return `${minutes}:${seconds}`
}

export const formatViewCount = (count) => {
  if(count.length > 6){
    const mil = count[0]
    const thou = count[1]
    if(thou > 0){
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
    if(third > 0){
      return `${firstTwo}.${third}K`
    }
    return `${firstTwo}K`
  } 
  return count
}

export const formatPublishDate = (time) => dayjs(time).fromNow();

export const filOwnerPic = (channelThumbs) => {
  return channelThumbs.high ? channelThumbs.high :
         channelThumbs.medium ? channelThumbs.medium :
         channelThumbs.default
}

export const filThumbPic = (thumbnails) => {
  return thumbnails.maxres ? thumbnails.maxres: 
         thumbnails.high ? thumbnails.high : 
         thumbnails.standard ? thumbnails.standard :
         thumbnails.default
}