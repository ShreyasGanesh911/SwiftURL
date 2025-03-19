import mongoose,{ Schema } from "mongoose";

const UserSchema = new Schema({
    name:{
        type: String,
        required: [true, "Name is required"]
    },
    email:{
        type: String,
        required: [true, "Email is required"],
        unique: [true, "Email already exists"]
    },
    password:{
        type: String,
        required: [true, "Password is required"]
    },
    created_at:{
        type: Date,
        default: Date.now
    }

},
{
    timestamps: true
}
)

const User = mongoose.model("User", UserSchema)

export default User;