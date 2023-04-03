import express from "express";
import User from "../models/userModel.js";
import bcrypt from 'bcryptjs';

import expressAsyncHandler from 'express-async-handler';
import { auth, generateToken } from "../utils.js";


const userRouter = express.Router();

userRouter.post('/login', expressAsyncHandler(async (req, res) => {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
        if (bcrypt.compareSync(req.body.password, user.password)) {
            res.send({
                _id: user._id,
                username: user.username,
                email: user.email,
                isAdmin: user.isAdmin,
                token: generateToken(user)
            });
            return;
        }
    }
    
    res.status(401).send({ message: 'Invalid email or password' });
}));

userRouter.post('/register', expressAsyncHandler(async (req, res) => {
    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password)
    });
    const user = await newUser.save();
    res.send({
        _id: user._id,
        username: user.username,
        email: user.email,
        isAdmin: user.isAdmin,
        itemsInCartDb: user.isAdmin,
        token: generateToken(user)
    });

}));

userRouter.put('/profile', auth, expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
    if (user) {
        user.username = req.body.username || user.username;
        user.email = req.body.email || user.email;
        if (req.body.password) {
            user.password = bcrypt.hashSync(req.body.password, 8);
        }

        const updatedUser = await user.save();
        res.send({
            _id: updatedUser._id,
            username: updatedUser.username,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
            token:generateToken(updatedUser)
        });

    }else{
        res.status(404).send({message: 'User Not Found'})
    }
}));



export default userRouter;
