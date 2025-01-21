import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { User } from "../models/user";
import Jwt from "jsonwebtoken";
import { ENV_VARS } from "../configs/configs";

export const register = async (req: Request, res: Response): Promise<any> => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                error: "All Fileds are Requiered"
            });
        }

        const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;

        if (!gmailRegex.test(email)) {
            return res.status(400).json({
                error: "Invalid Gmail"
            });
        }

        if (password.length < 5) {
            return res.status(400).json({
                error: "Password must be greater than the length of 5"
            });
        }

        const existingUserByEmail = await User.findOne({ email: email });

        if (existingUserByEmail) {
            return res.status(400).json({
                error: "User already exists"
            });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            email: email,
            password: hashedPassword
        });
        await newUser.save();

        const token = await Jwt.sign({ userId: newUser._id }, ENV_VARS.JWT_SECRET, { expiresIn: "15d" });

        res.status(201).json({
            user: {
                ...newUser.toObject(),
                token
            }
        });

    } catch (error) {
        console.log("Error in register controller: ", error);
        res.status(500).json({
            error: "Failed to Register"
        });
    }
}