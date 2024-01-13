import {v2 as cloudinary} from "cloudinary"
import fs from "fs"


cloudinary.config({ 
  cloud_name: "doarxjwdr", 
  api_key:"617222823431222", 
  api_secret: "PbW0mvr_g6CHTtQKDy8sW1sWJA8"
});
const uplodeOnCloudinary = async (localfile)=>{
  try {
    if(!localfile) return null
    // uplode cloudinary
   const response= await cloudinary.uploader.upload(localfile,{
      resource_type:'auto'
    })
    console.log('file is uploded',response.url);
    fs.unlinkSync(localfile)
    return response
   
  } catch (error) {
    fs.unlinkSync(localfile) // remove the local temp file
    return null
  }
}


export {uplodeOnCloudinary}