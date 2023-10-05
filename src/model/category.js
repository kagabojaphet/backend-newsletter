import mongoose from "mongoose";

const categoryschema=new mongoose.Schema({
    categoryname:{
        type:String,
    },
});
const Category=mongoose.model("Category",categoryschema)

export default Category