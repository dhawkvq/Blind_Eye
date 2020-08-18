import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'
import { WLDB } from '../../config'
import { Video } from '../../utility'
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

export const storeInDB = async (video: Video) => {

  const currentDay = dayjs()
  const vidForLater = {
    _id: video.id,
    save_date: createDuration(currentDay),
    ...video 
  }

  try {
    const { id, ok } = await WLDB.put(vidForLater)

    if(!ok) throw new Error('video did not properly save to watchLater DB')

    try {
      return await WLDB.get(id)
    }
    catch(error) {
      throw new Error('problem retrieving  video from watchLater DB')
    }
  } 
  catch (error) {
    throw error
  }
}

export const deleteFromDB = async (id: string) => {
  try{
    const doc = await WLDB.get(id)

    try {
      await WLDB.remove(doc)
    } 
    catch (error) {
      throw error
    }
  }
  catch(error){
    throw error
  }
}