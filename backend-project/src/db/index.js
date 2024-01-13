
import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";




async function ConnectDB(){
 try {
    await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
    console.log("DB Connected...!")
 } catch (error) {
    console.log("error in connection :",error)
    process.exit(1)
 }
} 
export default ConnectDB;