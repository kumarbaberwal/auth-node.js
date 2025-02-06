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

        const saltRounds = 10;
        const salt = await bcrypt.genSalt(saltRounds);
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

export const login = async (req: Request, res: Response): Promise<any> => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                error: "All Fileds are Requiered"
            });
        }

        const user = await User.findOne({ email: email });

        if (!user) {
            return res.status(404).json({
                error: "Email not registered"
            });
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);

        if (!isPasswordCorrect) {
            return res.status(400).json({
                error: "Password is incorrect"
            });
        }

        const token = await Jwt.sign({ userId: user._id }, ENV_VARS.JWT_SECRET, { expiresIn: "15d" });

        res.status(200).json({
            user: {
                ...user.toObject(),
                token
            }
        });
    } catch (error) {
        console.log("Error in login controller: ", error);
        res.status(500).json({
            error: "Failed to login"
        });
    }
}


export const fetchUser = async (req: Request, res: Response): Promise<any> => {
    try {
        // Access only the `id` from `req.user`
        const userId = req.user?.userId;

        if (!userId) {
            return res.status(400).json({
                error: "No UserId found",
            });
        }

        console.log(userId); // Log the userId
        res.status(200).json({
            userId
        });
    } catch (error) {
        res.status(400).json({
            error: "No UserId found"
        });
    }
}