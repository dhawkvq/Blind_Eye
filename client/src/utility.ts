
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

export const fetchInfo = async (): Promise<void> => {
  const endPoint = `${REACT_APP_API_ENDPOINT}&key=${REACT_APP_API_KEY}`
  try{
    const res = await fetch(endPoint).then(data => data.json())
    console.log('this is the res from fetchInfo =>', res )
  }catch(error){
    console.log('there has been an error =>', error)
  }
}