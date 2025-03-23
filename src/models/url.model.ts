import mongoose, { Schema } from "mongoose"
const UrlSchema = new Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:[true,"User ID is required"]
    },
    category:{
        type:String,
        required:true,
        enum:[ "Social", "Business", "News", "Shopping", "Education", 
            "Entertainment", "Personal", "Work", "Tech", "Other"],
        default:"Other"
    },
    shortUrl:{
        type:String,
        required:true,
        unique:[true,"Short URL already exists"]
    },
    longUrl:{
        type:String,
        required:true,
    },
    qr:{
        type:String
    },
    url:String,
    clickCount:{
        type:Number,
        default:0
    },
    lastClick:{
        type:Date,
    },
    deviceTypes:{
        type: Map,
        of: Number,
    },
    created_at:{
        type:Date,
        default:Date.now
    },

})
const Url = mongoose.model("Url", UrlSchema)
export default Url;