// require('dotenv').config({path:'./env'})
import dotenv from 'dotenv'
import connectDB from './db/index.js'
import mongoose from 'mongoose';
import { DB_NAME } from './constants.js';

dotenv.config()

// connectDB()
import express from 'express';
const app = express();
console.log(process.env.PORT);
connectDB()

// ;(async()=>{
//     try {
//       await  mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
//       app.on('error',(error)=>{
//         console.log(error)
//         throw error
//       })

//       app.listen(process.env.MONGODB_URI,()=>{
//         console.log(`app is running on port ${process.env.MONGODB_URI}`)
//       })

//     } catch (error) {
//        console.error("error: ",error) 
//     }
// })()
app.listen(8000,()=>{
  console.log('listning on port :',8000)
})