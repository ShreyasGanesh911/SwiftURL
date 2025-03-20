import mongoose from "mongoose";
import "dotenv/config"
const uri = process.env.MONGO_URI || "";
const connection = ()=>mongoose.connect(uri)

export default connection;