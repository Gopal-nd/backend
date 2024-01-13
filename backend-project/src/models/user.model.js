import mongoose,{Schema} from "mongoose";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const userScheme = new Schema({
    username:{
        type:String,
        required:true,
        unique:true,
        lowecase:true,
        trim:true,
        index:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowecase:true,
        trim:true,
    },
    fullName:{
        type:String,
        required:true,
        index:true,
        trim:true,
    },
    avatar:{
        type:String, //cloudinary
        required:true,
    },
    coverImage:{
        type:String, //cloudeinary
    },
    watchHistory:[
        {
            type:Schema.Types.ObjectId,
            ref:"Videos"
        }
    ],
    password:{
        type:String,
        required:[true,"Password is Required"]
    },
    refreshToken:{
        type:String
    }
},{
    timestamps:true
})

userScheme.pre('save',async function(next){
    if(!this.isModified('password')) return next()

    this.password = bcrypt.hash(this.password,10)
    next()
})

userScheme.methods.ispasswordCorrect = async function (password){
   return await bcrypt.compare(password,this.password)
}
userScheme.methods.genrateAccessToken = function(){
  return  jwt.sign({
        _id:this._id,
        email :this.email,
        username : this.fullName
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
        expiresIn:process.env.ACCESS_TOKEN_EXPIRY
    })
}

userScheme.methods.genrateRefreshToken = function(){
    return  jwt.sign({
        _id:this._id,
        email :this.email,
        username : this.fullName
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
        expiresIn:process.env.REFRESH_TOKEN_EXPIRY
    })
}

export const User = mongoose.model('User',userScheme)