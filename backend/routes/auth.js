import express from "express"
import {login, register} from "../controllers/auth.js"
import {protect} from "../middleware/auth.js"

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get('/me', protect, (req, res) => {
  res.json({
    _id: req.user._id,
    name: req.user.name,
    email: req.user.email,
    role: req.user.role
  });
});


export default router;