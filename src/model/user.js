import mongoose from "mongoose";

const userschema=new mongoose.Schema({
    firstname:{
        type:String,
        require:true
    },
    lastname:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true,
        unique:true
    },
    password:{
        type:String,
        require:true
    },
    confirmpassword:{
        type:String,
        require:true
    },
    role:{
        type:String,
        enum:["user","admin"],
        default:"admin"
    },
    createdate:{
        type:Date,
        default:Date.now()
    }

})
const User=mongoose.model("User",userschema)
export default User