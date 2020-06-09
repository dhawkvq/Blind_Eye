import { db } from './App'
const { REACT_APP_API_ENDPOINT, REACT_APP_API_KEY } = process.env


export const getStorageInfo = async (navigator: Navigator): Promise<void> => {
  if (navigator.storage && navigator.storage.estimate) {
    try{
      const { usage, quota } = await navigator.storage.estimate();
      if(!usage || !quota){
        console.log('there was no usage or quota')
        return 
      }
      const percentageUsed = (usage / quota) * 100;
      console.log(`You've used ${percentageUsed}% of the available storage.`);
      const remaining = quota - usage;
      console.log(`You can write up to ${remaining} more bytes.`);
    }catch(error){
      console.log('there was an error from getDbInfo =>', error )
    }  
  }
}


export const fetchInfo = async () => {
  const endPoint = `${REACT_APP_API_ENDPOINT}&key=${REACT_APP_API_KEY}`
  try{
    const res = await fetch(endPoint).then(data => data.json())
    if(res.error){
      throw new Error('error from call to api')
    }
    return res
  }catch(error){
    throw new Error(error.message)
  }
}

export const downloadVideo = async (id:string) => {
  try{
    let stream = await fetch(`api/stream/${id}`)
    if(!stream.ok){
      throw new Error('no stream')
    } else if(stream && stream.body){
      const reader = stream.body.getReader();

      let contentLength

      if(stream.headers){
        contentLength = stream.headers.get('Content-Length')
      }

      let receivedLength = 0
      let chunks: Uint8Array[] = []
      while(true) {
        const {done, value} = await reader.read();

        if (done) {
          break;
        } 
        if(value){
          chunks.push(value);
          receivedLength += value.length;
        }else{
          break
        }

        console.log(`Received ${receivedLength} of ${contentLength}`)
      }

      return new Blob(chunks)

    }
  }catch(error){
    console.log('there was an error grabbing ready stream')
    throw new Error(error.message)
  }
}

export const saveVideo = async (blob:any) => {
  let videoId = blob._id
  db.put(blob)
    .then(() => db.get(videoId))
    .then(res => console.log('this is the object placed in memory =>', res))
    .catch(error => console.log('there was an error placing or retreiving object =>', error ))
}


export const grabDbItems = async () => {
  return await db.allDocs({ include_docs: true })
    .then(info => info)
    .catch(error => error)
}