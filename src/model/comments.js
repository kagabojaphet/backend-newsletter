import mongoose from "mongoose";

const commentschema=new mongoose.Schema({

    user:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }],
    comment:{
        type:String
    },
    postedat:{
        type:Date,
        default:new Date(Date.now())
    }

})

commentschema.pre(/^find/,function(next){
    this.populate({
        path:"user",
        select:"firstname lastname email"
    })
    next()
    
})


const Comment=mongoose.model("Comment",commentschema)
export default Comment