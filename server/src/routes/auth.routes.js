import express from 'express';
const router = express.Router();
import singup from '../controllers/auth.controllers.js';

router.post('/sing-up', singup)

export default router;