import User from "../models/user.model.js";
import bycript from 'bcryptjs';

const singup = async (req, res, next) =>{
    const { username, email, password } = req.body;
    const hashedPasssword = bycript.hashSync(password, 10);
    const newUser = new User({ username, email, password: hashedPasssword });

    try {
        await newUser.save();
        res.status(201).json('User Created Successfully!');
    } catch (error) {
        next(error);
    }
};

export default singup