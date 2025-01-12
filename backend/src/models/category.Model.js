const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true,
    },
    slug:{
        type:String,
        required:true,
        unique:true
    },
    parentId:{
        type:String,
     
    },
   categoryPicture:{type:String,
    required:true
   }

},{timestamps:true})

module.exports = mongoose.model("Category" , categorySchema)


