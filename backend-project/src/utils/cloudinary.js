import {v2 as cloudinary} from 'cloudinary'
import fs from 'fs'

          
cloudinary.config({ 
  cloud_name:process.env.CLOUD_NAME, 
  api_key: process.env.CLOUD_API_KEY, 
  api_secret: process.env.API_SECRET
});

const uplodeOnCloudinary = async (localfile)=>{
  try {
    if(!localfile) return null
    // uplode cloudinary
   const response= await cloudinary.uploader.upload(localfile,{
      resource_type:'auto'
    })
    console.log('file is uploded',response.url);
    return response
   
  } catch (error) {
    fs.unlinkSync(localfile) // remove the local temp file
    return null
  }
}


export {uplodeOnCloudinary}