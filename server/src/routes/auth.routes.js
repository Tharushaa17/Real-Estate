import express from 'express';
const router = express.Router();
import singup from '../controllers/auth.controllers.js';

router.post('/singup', singup)

export default router;