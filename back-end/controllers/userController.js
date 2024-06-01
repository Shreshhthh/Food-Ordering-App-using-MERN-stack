import userModel from "../models/userModel.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import validator from "validator"

//login user
const loginUser = async (req, res)=>{
    const {email,password} = req.body
    try {
        const user = await userModel.findOne({email})

        if(!user){
            return res.json({success:false, message:"User does not exist"})
        }

        const isMatch = await bcrypt.compare(password,user.password)
        if(!isMatch){
            return res.json({success:false, message:"invalid credentials"})
        }

        const token = createToken(user._id);
        return res.json({success:true, token})

    } catch (error) {
        
    }
}

const createToken=(id)=>{
    return jwt.sign({id},process.env.JWT_SECRET)
}

//register User
const registerUSer =async (req,res)=>{

    const {name, email, password} = req.body
    try {
    const exists = await userModel.findOne({email})

     //checking if the user already exist or not
    if(exists){
       return res.json({success:false, message:"User already exist"})
    }
    
    //validating email and strong password
    if(!validator.isEmail(email)){
        res.json({success:false, message:"Please Enter a valid email"})
    }

    if(password.length<9){
        res.json({success:false, message:"Please enter a strong password"})
    }

    //hashing password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password,salt) 

    //creating user
    const newUser = new userModel({
        name:name,
        email:email,
        password:hashedPassword
    })

    const user = await newUser.save()
    const token = createToken(user._id)
    res.json({success:true, token})
    } catch (error) {
        console.log(error)
        res.json({success:false, message:"Error"})
    }
}

export {loginUser, registerUSer}