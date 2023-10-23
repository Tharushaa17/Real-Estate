import express from 'express';
const router = express.Router();
import { singup, singin } from '../controllers/auth.controllers.js';

router.post('/sing-up', singup)
router.post('/sing-in', singin)

export default router;