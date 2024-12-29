const mongoose = require('mongoose');   

const productSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    slug:{
        type:String,
        required:true,
        unique:true 
    },
    price:{
        type:Number,
        required:true
    },
    quantity:{
        type:Number,
        required:true
    },
    description:{
        type:String,
        required:true,
        trim:true
    },
    productPicture:[
        {img:{type:String}}
    ],
    category:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Category',
        required:true
    },
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    review:[
        {
            userId:{type:mongoose.Schema.Types.ObjectId,ref:'User'},
            review:String
        }
    ],
    rating:[
        {
            userId:{type:mongoose.Schema.Types.ObjectId,ref:'User'},
            rating:Number
        }
    ],
    createdAt:{
        type:Date,
        default:Date.now
    }
    
},{timestamps:true})

module.exports = mongoose.model('Product',productSchema)