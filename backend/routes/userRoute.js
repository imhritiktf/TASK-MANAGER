import express from 'express';
import { getUsers } from '../controllers/user.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

router.get('/', protect, getUsers);

export default router;