import jwt from "jsonwebtoken";
import User from "../models/User.js";



const protectRoute = async(req, resizeBy, next) => {
    try {
        //get the token
        const token = req.header("Authorization").replace("Bearer", "");
        if(!token) return res.status(401).json({message:"No authentication token, access denied"});

        //verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        //find the user
        const user = findById(decoded.userId).select("-password");

        if(!user) return res.status(401).json({message:"Token is not valid"});

        res.user = user;
        next();
    } catch (error) {
        console.log("Authentiocation error:", error.message);
        res.status(401).json({message:"Token is not valid"}); 
    }
};

export default protectRoute;