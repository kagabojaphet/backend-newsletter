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
        type:Array,
        required:true
    },
    publishername:{
        type:String,
        required:true
    },
    category:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Category",
    },
    likes:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }],
    dislikes:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }],
    comment:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Comment"
    }]
});

newsschema.pre(/^find/,function(next){
    this.populate({
        path:"comment",
        select:"comment postedat"
    }).populate({
        path:"category",
        select:"categoryname"
    });
    next();
});


const news=mongoose.model("news",newsschema)
export default news