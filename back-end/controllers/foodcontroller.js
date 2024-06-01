
import foodModel from "../models/foodModel.js";
import fs from "fs"

const addFood=async(req,res)=>{
    const image_filename = `${req.file.filename}`

    const food = new foodModel({
        name:req.body.name,
        price : req.body.price,
        description:req.body.description,
        image:image_filename,
        category:req.body.category
    })

    try {
        await food.save()
        res.json({success:true , message:"item added"})
    } catch (error) {
        console.log(error)
        res.json({success:false, message:error})
    }
}

// list all foods

const foodList=async (req,res)=>{
    const listFood = await foodModel.find({})
    try{
        res.json({success:true , message:"list of foods", data:listFood})
    }catch(error){
        console.log(error)
        res.json({success:false, message: "cannot fetch the items"})
    }
}

//remove food 

const removeFood= async (req,res)=>{
    try {
        const food = await foodModel.findById(req.body.id);
        fs.unlink(`uploads/${food.image}`,()=>{})

        await foodModel.findOneAndDelete(req.body.id);
        res.json({success:true , message:"Item removed"})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:"unknown error occured"})
    }

}

export {addFood , foodList , removeFood}