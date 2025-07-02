import express from "express"
import { createTask, getTasks, updateStatus } from "../controllers/tasks.js"
import {protect,authorize} from "../middleware/auth.js"
const router = express.Router();

router.use(protect); 

router.get("/", getTasks);
router.post("/", authorize(["admin", "teamlead"]), createTask);
router.put("/:id/status", updateStatus);

export default router;