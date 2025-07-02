import jwt from "jsonwebtoken"
import User from "../models/User.js"

export const protect = async (req, res, next) => {
    let token;

    if (req.headers.authorization?.startsWith("Bearer")) {
        token = req.headers.authorization.split(" ")[1]
        try {
            const decoded = jwt.verify(token, process.env.SECRET_KEY);
            req.user = await User.findById(decoded.id).select("-password");
            next()
        } catch (error) {
            res.status(401).json({ message: "Unauthorized" })
        }
    }

    if (!token) res.status(401).json({ message: "No token provided" });
}

export const authorize = (roles) => (req, res ,next)=>{

    console.log(req.user.role)
    if(!roles.includes(req.user.role)){
        return res.status(403).json({ message: "Access denied" });
    }
    next()
}