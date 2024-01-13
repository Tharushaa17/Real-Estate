import express from 'express';
const router = express.Router();
import { singup, singin, google, singOut } from '../controllers/auth.controllers.js';

router.post('/sing-up', singup)
router.post('/sign-in', singin)
router.post('/google', google)
router.get('/sign-out', singOut)

export default router;