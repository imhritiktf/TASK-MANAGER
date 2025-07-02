import User from "../models/User.js"
import jwt from "jsonwebtoken"


export const register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    console.log(req.body)

    if (!name || !email || !password || !role) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(409).json({ message: "User already exists with this email" });
    }

    const user = await User.create({ name, email, password, role });

    const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, {
      expiresIn: "30d",
    });

    res.status(201).json({
      message: "User registered successfully",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      }
    });
  } catch (error) {
    console.error("Registration Error:", error);
    res.status(500).json({ message: "Server error during registration" });
  }
};


export const login = async (req, res)=>{
    const {email, password} = req.body;
    const user = await User.findOne({email})
    if(!user || !(await user.matchPassword(password))){
        return res.status(401).json({ message: "Invalid credentials" });
    }
    const token = jwt.sign({id: user._id}, process.env.SECRET_KEY, {expiresIn: "30d"})
    res.json({token})
}