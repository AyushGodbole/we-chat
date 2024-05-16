import {mongoose,Schema,model} from "mongoose";

// defining schema
const userSchema = new Schema({
    username:{
        type:String,
        required:true,
        min:3,
        max:15,
        trim:true,
        unique:true,
    },
    email:{
        type:String,
        required:true,
        max:50,
        unique:true,
    },
    password:{
        type:String,
        required:true,
        min:6,
        max:15,
    },
    isAvatart:{
        type:Boolean,
        default:false,
    },
    avatarImage:{
        type:String,
        default:""
    }
});

const User = model("Users",userSchema);

export default User;

