import User from "../model/userModel.js";

// bcrypt for hashing password
import bcrypt from 'bcrypt';

// register logic
const register = async(req,res,next)=>{
    try {
        const {username , email , password , confirm_password} = req.body;
    // console.log(username,email,password,confirm_password);

    // check if username already taken
    const usernameCheck = await User.findOne({username});
    if(usernameCheck){
        return res.json({
            message:"user already exists",
            status:false,
        });
    }

    // check if email already taken
    const emailCheck = await User.findOne({email});
    if(emailCheck){
        return res.json({
            message:"email already taken",
            status:false,
        })
    }

    // if not create the user

    // hash the password
    const hashedPassword = await bcrypt.hash(password,10);

    // create user in DB
    const user = await User.create({
        username,
        email,
        password:hashedPassword
    })

    await user.save();

    // delete user's plain password
    user.password = undefined;

    return res.json({
        userData:user,
        message:"user registered successfully",
        status:true,
    })
    } catch (error) {
        next(error);
    }
}


// login logic
const login = async(req,res,next)=>{

    try {
        const {username,password} = req.body;

        const user = await User.findOne({username});

        // check if user exists
        if(!user){
            return res.json({
                message:"user not registered!",
                status:false,
            })
        }

        // compare password
        const passwordCheck = await bcrypt.compare(password,user.password);

        if(!passwordCheck){
            return res.json({
                message:"Incorrect Password!",
                status:false,
            })
        }

        user.password = undefined;

        // console.log("login",user);

        return res.json({
            message:"user logged in successfully",
            status:true,
            userData:user
        })
        
    } catch (error) {
        next(error);
    }
}

// logout logic
const logout = async(req,res,next)=>{
    // localStorage.clear();

    return res.json({
        message:"user logged out successfully",
        status:true,
    })
}

// set avatar logic
const setAvatar = async(req,res,next)=>{
    try {
        const image = req.body.image;
        const userId = req.params.id;
        // console.log(image);

        const user = await User.findById(userId);
        // console.log("us",user);

        user.isAvatart = true;
        user.avatarImage = image;

        user.save();

        return res.json({
            isSet:user.isAvatart,
            image:user.avatarImage,
        })

    } catch (error) {
        next(error);
    }
}

// get all users logic
const getAllUsers = async(req,res,next)=>{
    try {
        // select all users except itself
        const users = await User.find({_id: {$ne:req.params.id}}).select([
            "email","username","avatarImage","_id",
        ])

        return res.json({users});
    } catch (error) {
        next(error);
    }
}

export{register,login,logout,setAvatar,getAllUsers};