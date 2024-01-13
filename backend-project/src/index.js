// require('dotenv').config({path:'./env'})
import { app } from './app.js';
import dotenv from 'dotenv'
dotenv.config()
import connectDB from './db/index.js'


console.log(process.env.PORT);
// connectDB()
connectDB()
.then(()=>{
  app.listen(8000,()=>{
    console.log('listning on port :',8000)
  })
})
.catch((err)=>{
  console.log('error as :',err)
})

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
