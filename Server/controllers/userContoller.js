import User from "../model/userModel.js";

// bcrypt for hashing password
import bcrypt from 'bcrypt';

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

export{register};