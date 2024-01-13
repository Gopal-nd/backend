import jwt from "jsonwebtoken";
import { ApiError } from "../utils/ApiErrror.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js";


export const verifyJWT = asyncHandler(async(req,res,next)=>{
  try {
     const token  = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ","")
  
     if(!token){
      throw new ApiError(401,"unauthorized request")
     }
     
     const decodedToken = jwt.verify(token.process.env.REFRESH_TOKEN_SECRET)
  
     const user = await User.findById(decodedToken?._id).select(
      "-password -refreshToken"
     )
     if(!user){
      throw new ApiError(401,"Invalid Acess Token")
     }
     req.user = user;
     next()
  } catch (error) {
    throw new ApiError(401,error?.message || "Invalid acess token")
  }
})