import mongoose from "mongoose";

const messageschemas= new mongoose.Schema({
    email:{
        type:String,
        required:[true,`please enter your email`]
    },
    message:{
        type:String,
        required:[true,`please enter your message`]

    }
})
const mmessage=mongoose.model("mmessage",messageschemas)
export default mmessage