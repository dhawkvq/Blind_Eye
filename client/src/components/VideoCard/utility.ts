import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'
import { db, WLDB } from '../../config'
import { Video, downloadVideo } from '../../utility'
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
      throw new Error('problem retrieving video from watchLater DB')
    }
  } 
  catch (error) {
    throw error
  }
}

type DeleteArgs = {
  database: string;
  id: string;
}

export const deleteFromDB = async ({ database, id }: DeleteArgs) => {
  const pouch = database === 'watchLater' ? WLDB : db
  try{
    const doc = await pouch.get(id)

    try {
      await pouch.remove(doc)
    } 
    catch (error) {
      throw error
    }
  }
  catch(error){
    throw error
  }
}

export const downloadVid = async (video:Video)=> {
  try{
    const vidData = await downloadVideo(video.id)
    if (!vidData) throw new Error('video came back undefined')
    const newVid = {
      _id: video.id,
      ...video,
      vidData
    }

    try {
      const { id, ok } = await db.put(newVid)
      if(!ok) throw new Error('problem placing new video in db')

      try {
        return await db.get(id)
      } 
      catch (error) { throw error }
      
    } 
    catch (error) { throw error }

  }
  catch(error){ throw error }
}