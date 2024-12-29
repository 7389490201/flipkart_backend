const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
    userId:{type:mongoose.Schema.Types.ObjectId,
            ref:"User",
            required:true
    },
    cartItems:[
        {
            product:{type:mongoose.Schema.Types.ObjectId,
                    ref:"Product",
                    required:true
            },
            price:{type:Number},
            quantity: {
                type: Number,
                default: 1,
                min: 1
            }
        },
    ]
})


module.exports = mongoose.model("Cart",cartSchema)
//tested done