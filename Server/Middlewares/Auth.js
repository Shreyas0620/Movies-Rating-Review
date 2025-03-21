import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../Models/UserModels.js";
//@desc Autenticated user and get token 
const generateToken = (id)=>{
    return jwt.sign({id},process.env.JWT_SECRET,{
        expiresIn:"7d", 
    })
}

//protection
const protect = asyncHandler(async (req,res,next)=>{
    let token;
    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
        try{
            token = req.headers.authorization.split(" ")[1];
            // verify token 
            const decoded = jwt.verify(token,process.env.JWT_SECRET)
            // get user id decoded token
            req.user = await User.findById(decoded.id).select("-password")
            next()
        }catch(error){
            console.error(error)
            res.status(401)
            throw new Error("Not authorized,token failed")
        }
        }
        // if token exist 
        if(!token){
            res.status(401);
            throw new Error("Not authorized,no token")
        }
})

const admin = (req,res,next)=>{
    if(req.user && req.user.isAdmin){
        next();
    }else{
        res.status(401)
        throw new Error("Not authorized as an admin")
    }

}

export{generateToken,protect,admin};