import mongoose from "mongoose";

export const connectDB=async ()=>{
    await mongoose.connect(process.env.DBHOST).then(console.log('connected to db'))
}