import mongoose from "mongoose";

const newsschema=new mongoose.Schema({
    newsmaintitle:{
        type:String,
        required:true
    },
    newstitle:{
        type:String,
        required:true
    },
    published:{
        type:String,
        required:true
        
    },
    newssummary:{
        type:String,
        required:true

    },
    newsdiscription:{
        type:String,
        required:true
    },
    newsimage:{
        type:String,
        required:true
    },
    publishername:{
        type:String,
        required:true
    },
    likes:{
        type:Number,
        default:0
    },
    dislikes:{
        type:Number,
        default:0
    },
    comment:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Comment"
    }]
})

newsschema.pre(/^find/,function(next){
    this.populate({
        path:"comment",
        select:"comment postedat"
    })
    next()
})


const news=mongoose.model("news",newsschema)
export default news