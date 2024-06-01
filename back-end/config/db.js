import mongoose from "mongoose";

export const connectDB=async ()=>{
    await mongoose.connect('mongodb+srv://shreshthawathiab:Shreshth137@cluster0.jkbrffh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0').then(console.log('connected to db'))
}