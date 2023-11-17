import express from 'express';
const router = express.Router();
import { singup, singin, google, singOut } from '../controllers/auth.controllers.js';

router.post('/sing-up', singup)
router.post('/sing-in', singin)
router.post('/google', google)
router.get('/sing-out', singOut)

export default router;