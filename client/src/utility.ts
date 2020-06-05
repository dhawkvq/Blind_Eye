
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

export const downloadVideo = async ( id:string ) => {
  try{
    return await fetch(`api/videos/${id}`).then(data => data.json())
  }catch(error){
    return error
  }
}