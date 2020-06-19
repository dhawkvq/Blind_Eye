import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'
import { WLDB } from '../../config'
import { storeDbParams } from './typeDefs'
dayjs.extend(duration)


const createDuration = ( day: dayjs.Dayjs ) => {
  return dayjs.duration({
    seconds: day['$s'],
    minutes: day['$m'],
    hours: day['$H'],
    days: day['$D'],
    weeks: day['$W'],
    months: day['$M'],
    years: day['$y']
  })
  .toISOString()
}

export const storeInDB = async ({ videoId, channelId }: storeDbParams ) => {

  const currentDay = dayjs()
  const vidForLater = {
    _id: videoId,
    channelId,
    save_date: createDuration(currentDay) 
  }

  try {
    return await WLDB.put(vidForLater)
  } 
  catch (error) {
    throw error
  }
}