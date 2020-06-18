import { db, WLDB } from './config'

const { 
  REACT_APP_API_ENDPOINT, 
  REACT_APP_API_KEY, 
  REACT_APP_CHANNELS_ENDPOINT,
  REACT_APP_MULT_CHAN_ENDPOINT 
} = process.env


const createEndpoint = (action) => {
  switch(action.type){

    case 'POPULAR':
      return `${REACT_APP_API_ENDPOINT}&key=${REACT_APP_API_KEY}`

    case 'MULTI_VID':
      return `${REACT_APP_MULT_CHAN_ENDPOINT}&id=${action.data}&key=${REACT_APP_API_KEY}`

    case 'CHANNEL_INFO':
      return `${REACT_APP_CHANNELS_ENDPOINT}&id=${action.data}&key=${REACT_APP_API_KEY}`
    
    default:
      return ''
  }
}


export const getStorageInfo = async (navigator: Navigator): Promise<void> => {
  if (navigator.storage && navigator.storage.estimate) {
    try {
      const { usage, quota } = await navigator.storage.estimate();
      if(!usage || !quota) throw new Error('failed to estimate storage')
      const percentageUsed = (usage / quota) * 100;
      console.log(`You've used ${percentageUsed}% of the available storage.`);
      const remaining = quota - usage;
      console.log(`You can write up to ${remaining} more bytes.`);
    }
    catch(error){
      console.log('there was an error from getDbInfo =>', error )
    }  
  }
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

export const saveVideo = async (blob:any) => {
  try {
    await db.put(blob)
  } 
  catch (error) {
    console.log('there was an error saving video =>', error )
  }
}

export const multiVidInfo = async (saved) => {

  const videoIds = saved.reduce((acc,curVal) => {
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

export const channelOwnerInfo = async (incoming) => {

  let channelIds = incoming.reduce((acc,curVal) => {
    return acc = [...acc,curVal.snippet.channelId]
  },[])

  try{
    const first = await fetch(createEndpoint({ type: 'CHANNEL_INFO', data: channelIds.join() }));

    if(!first.ok) throw new Error('problem retrieving specific channels from ids')

    const { items } = await first.json()
    if(!items) throw new Error('items came back empty')

    const reduced = items.reduce((acc,curVal) => {
      acc[curVal.id] = curVal.snippet.thumbnails
      return acc
    },{})

    const transformedItems = incoming.map(item => {
      let itemId = item.snippet.channelId 
      item['channelThumbs'] = reduced[itemId]
      return item
    })

    return transformedItems

  }catch(error){
    throw error
  }
}