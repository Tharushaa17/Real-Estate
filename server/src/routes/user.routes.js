import express from "express";
import { deleteUser, getUsrListings, updateUser } from "../controllers/user.controllers.js";
import { verifyToken } from "../utils/verifyUser.js";
const router = express.Router();

router.post('/update/:id', verifyToken, updateUser);
router.delete('/delete/:id', verifyToken, deleteUser);
router.get('/listings/:id', verifyToken, getUsrListings)

export default router;