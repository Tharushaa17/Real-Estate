import jwt from 'jsonwebtoken';
import { errorHandler } from './errorhandler.js';

export const verifyToken = (req, res, next) => {
    const token = req.cookies.access_token;

    if(!token) return next(errorHandler(401, 'Unathorized')); 

    jwt.verify(token, process.env.JWT_SECRET, (err, user)=> {
        if(err) return next(errorHandler(403, 'Frobidden')); 

        req.user = user;
        next();
    });
};