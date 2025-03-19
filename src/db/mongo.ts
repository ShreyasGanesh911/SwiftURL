import mongoose from "mongoose";
const uri = process.env.MONGO_URI || "mongodb://localhost:27017/url";
console.log(uri)
const connection = ()=>mongoose.connect(uri)

export default connection;