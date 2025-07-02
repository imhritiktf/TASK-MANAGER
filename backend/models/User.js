import mongoose from "mongoose";
import bcrypt from "bcryptjs"

const UserScehma = new mongoose.Schema({
    name: {type:String,
        required:true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role:{
        type:String,
        enum: ["user", "teamlead", "admin"],
        default: "user"
    }
})


UserScehma.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

UserScehma.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

export default mongoose.model("User", UserScehma)