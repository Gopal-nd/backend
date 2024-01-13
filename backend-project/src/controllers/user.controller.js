import {asyncHandler} from '../utils/asyncHandler.js'
import {ApiError} from "../utils/ApiErrror.js"
import { User } from '../models/user.model.js'
import {uplodeOnCloudinary} from '../utils/cloudinary.js'
import { ApiResponse } from '../utils/ApiResponse.js'

const genrateAccessTokenandRefereshToken = async(userId)=>{
  try {
    const user = await User.findById(userId)
    const accesToken = user.genrateAccessToken()
    const refreshToken = user.genrateRefreshToken()

    user.refreshToken = refreshToken
    await user.save({validateBeforeSave:false})
    return {accesToken, refreshToken}

  } catch (error) {
    throw new ApiError(500,"something went wrong on while genrating refresh token")
  }
}

const registerUser = asyncHandler( async (req,res)=>{
    // res.status(200).json({
    //     message:"ok"
    // })

    // get user data from front end
    //validation - not empty
    // check if user alredy exist : username, email
    //check for images ,check for avatar
    //uplode to cloudinary, avatar 
    //create user object - create entry in db
    // remove password and refresh token field from response
    // check for user creation 
    //return res
      const {fullName, email, username,password} = req.body
      // console.log('email : ',email)

      if(fullName === ""){
            throw new ApiError(400,'full name is required')
      }
      if(
        [fullName,email, username,password].some(field=>
            field?.trim()==="")
      ){
        throw new ApiError(400,"All fields are required")
      }
       
     const existedUser =await User.findOne({
        $or:[{username},{email}]
      })

      if(existedUser){
        throw new ApiError(409,'User with email or username alredy exist')
      }
//  console.log(req.files)
   const avatarLocalPath =  req.files?.avatar[0]?.path;
  //  const coverImageLocalpath = req.files?.coverImage[0]?.path;

   let coverImageLocalPath;
   if (req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length > 0) {
       coverImageLocalPath = req.files.coverImage[0].path
   }
   

   if(!avatarLocalPath){
    throw new ApiError(400,"avatar is required")
   }
   const avatar = await uplodeOnCloudinary(avatarLocalPath)
   const coverImage = await uplodeOnCloudinary(coverImageLocalPath)
  //  console.log(coverImage)
   if(coverImage === undefined){
    coverImage = ""
   }
   if(!avatar){
    throw new ApiError(400,"Avatha is required")
   }

   const user = await User.create({
    fullName,
    avatar:avatar.url,
    coverImage:coverImage?.url || "",
    email,
    password,
    username:username.toLowerCase()
   })

   const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
   )
   if(!createdUser){
    throw new ApiError(500,'something went wrong on creating user')
   }
   return res.status(201).json(
    new ApiResponse(200,createdUser,"userregisterd sucessfully")
   )
})

const loginUser = asyncHandler( async(req,res)=>{
    // req.body =>data
    //username or uniquevalue
    // find the user
    //password check
    //acces and refresh token
    //send cookies

    const {username,email,password} = req.body
    if(!username&&!email){
      throw new ApiError(400,"username or email is required")
    }
   const user = await User.findOne({
      $or:[{username},{email}]
    })
    if(!user){
      throw new ApiError(404,"User does not Exist")
    }
    
    const isPasswordValid = await user.ispasswordCorrect(password)
    
    if(!isPasswordValid){
      throw new ApiError(401,"invalid credentails")
    }
    
    const {accesToken, refreshToken} = await genrateAccessTokenandRefereshToken(user._id)
   
    //optional
    const loggedInUser = await User.findById(user._id).select("-password -refreshToken")

    const options ={
      httpOnly :true,
      secure:true
    }
    return res
    .status(200)
    .cookie("accesToken",accesToken,options)
    .cookie("refreshToken",refreshToken,options)
    .json(
      new ApiResponse(200,{
        user:loggedInUser,accesToken,refreshToken
      },"user logged in successfully")
    )
  
}) 

const logoutUser  = asyncHandler( async(req,res)=>{
     await User.findByIdAndUpdate(req.user._id,{
      $set:{
        refreshToken:undefined
      }
     },{
      new:true
    }) 
    const options = {
      httpOnly:true,
      secure:true
    }
    return res
    .status(200)
    .cookie("accesToken",options)
    .cookie("refreshToken",options)
    .json(
      new ApiResponse(200,{
      
      }),"user logged  out successfully"
    )

})
export {registerUser, loginUser,logoutUser}