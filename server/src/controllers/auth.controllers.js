import User from "../models/user.model.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { errorHandler } from '../utils/errorhandler.js'

export const singup = async (req, res, next) =>{
    const { username, email, password } = req.body;
    const hashedPasssword = bcrypt.hashSync(password, 10);
    const newUser = new User({ username, email, password: hashedPasssword });

    try {
        await newUser.save();
        res.status(201).json('User Created Successfully!');
    } catch (error) {
        next(error);
    }
};

export const singin = async (req, res, next) =>{
    const { email, password } = req.body;

    try {
        const validUser = await User.findOne({ email });      
            if (!validUser) 
                return next(errorHandler(404, 'User not found!'));

        const validPassword = bcrypt.compareSync(password, validUser.password);
            if (!validPassword) 
                return next(errorHandler(401, 'Wrong credentials!'));
                
            const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
            const { password: pass, ...rest } = validUser._doc;
                res.cookie('access_token', token, { httpOnly: true }).status(200).json(rest);

    } catch (error) {
        next(error);
    }
};

export const google = async (req, res, next) => {
    try {
      const user = await User.findOne({ email: req.body.email });
      if (user) {
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        const { password: pass, ...rest } = user._doc;
            res .cookie('access_token', token, { httpOnly: true }).status(200).json(rest);

      } else {
        const generatedPassword = Math.random().toString(36).slice(-8)+Math.random().toString(36).slice(-8);
        const hashedPassword = bcrypt.hashSync(generatedPassword, 10);

        const newUser = new User({
          username:req.body.name.split(' ').join('').toLowerCase()+Math.random().toString(36).slice(-4),
          email: req.body.email,
          password: hashedPassword,
          avatar: req.body.photo,
        });

        await newUser.save();

        const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
        const { password: pass, ...rest } = newUser._doc;
            res.cookie('access_token', token, { httpOnly: true }).status(200).json(rest);
      }
    } catch (error) {
      next(error);
    }
  };

  export const singOut = async (req, res, next) => {
    try {
        console.log("hit");
        res.clearCookie('access_token');
        res.status(200).json('User has been Logged Out!');
    } catch (error) {
        next(error)
    }
}