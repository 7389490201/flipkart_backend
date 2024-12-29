const express = require("express");
const router = express.Router();
const Cart = require("../models/cart.Model");
const { requireSignIn, userMiddleware } = require("../middleware");


router.post("/user/cart/addtocart",requireSignIn,userMiddleware,(req,res)=>{
    const {product,quantity,price} = req.body;
    console.log(product,quantity,price);

    Cart.findOne({userId:req.user.id}).then((cart)=>{
        if(cart){
        let existingproduct = cart.cartItems.find(c=>c.product == product)
        if(existingproduct){
            existingproduct.quantity += quantity;
            existingproduct.price += price;
            cart.save().then((updatedsameproduct)=>{
                return res.status(201).json({message:updatedsameproduct})
            }).catch((err)=>{
                return res.status(400).json({message:err.message})
            })
        }else{
            cart.cartItems.push({product,price,quantity});
            cart.save().then((updatenewproduct)=>{
                return res.status(201).json({message:updatenewproduct})
            }).catch((err)=>{
                return res.status(400).json({message:err.message})
            })
        }}else{
            const newcart = new Cart({userId:req.user.id,
                cartItems:[
                    {
                        product:product,
                        quantity:quantity,
                        price:price,
                    }
                ]
            })
            newcart.save().then((createcart)=>{
                return res.status(201).json({message:createcart});
            }).catch(err=>{
                return res.status(400).json({message:err.messsage})
            })
        }
    }).catch((err)=>{
        return res.status(500).json({message:err.message})
    })
})

//perfectly working code


module.exports = router