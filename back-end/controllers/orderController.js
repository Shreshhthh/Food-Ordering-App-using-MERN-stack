import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js"
import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

//place order from front end 
const placeOrder = async(req,res)=>{

    const frontend_url =" http://localhost:5173"

    try {
        const newOrder = new orderModel({
            userId : req.body.userId,
            items : req.body.items,
            amount : req.body.amount,
            address: req.body.address
        })
        await newOrder.save();
        await userModel.findByIdAndUpdate(req.body.userId,{cartData:{}})

        const line_items = req.body.items.map((item)=>({
            price_data : {
                currency : "inr",
                product_data:{
                    name:item.name
                },
                unit_amount:item.price*100,
            },
            quantity:item.quantity
        }))

        line_items.push({
            price_data:{
                currency:"inr",
                product_data:{
                    name:"Delivery Charges"
                },
                unit_amount:100*100
            },
            quantity:1
        })

        const session = await stripe.checkout.sessions.create({
            payment_method_types:["card"],
            line_items:line_items,
            mode:'payment',
            success_url:`http://localhost:5173/verify?success=true&orderId=${newOrder._id}`,
            cancel_url:`http://localhost:5173/verify?success=falseo&rderId=${newOrder._id}`
        })

        res.json({success:true, session_url:session.url})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"error occured while making payment"})
    }
}


const verifyOrder = async (req,res)=>{
    const {success,orderId} = req.body
    try {
        if(success==="true"){
            await orderModel.findByIdAndUpdate(orderId,{payment:true})
            res.json({success:true, message:"Paid"})
        }
        else{
            await orderModel.findByIdAndDelete(orderId)
            res.json({success:false, message:"Payment failed"})
        }
    } catch (error) {
        console.log(error);
        res.json({success:false, message:"Error Occured"})
    }
}

const userOrder = async (req,res) =>{
    try {
        const orders = await userModel.find({userId:req.body.userId})
        res.json({success:true, data:orders})
    } catch (error) {
        res.json({success:false, message:"cannot load order section"})
    }
}

//listing order for admin panel
const listOrders = async (req,res)=>{
   try {
    const orders = await orderModel.find({});
    res.json({success:true, data : orders})
   } catch (error) {
        console.log(error)
        res.json({success:false, message:"cannot fetch the list of orders"})
   }
}

export {placeOrder,verifyOrder, userOrder, listOrders}