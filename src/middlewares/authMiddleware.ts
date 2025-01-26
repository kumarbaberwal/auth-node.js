import { NextFunction, Request, Response } from "express";
import Jwt from "jsonwebtoken";
import { ENV_VARS } from "../configs/configs";

export const veryfyToken = (req: Request, res: Response, next: NextFunction) : void => {
    const token = req.headers.authorization?.split(' ')[1];
    if(!token) {
        res.status(403).json({
            error: "No token Provided"
        });
        return;
    }

    try {
        const decode = Jwt.verify(token, ENV_VARS.JWT_SECRET) as {userId: string};
        req.user = decode;
        next();
    } catch (error) {
        res.status(500).json({
            error: "Invalid Token"
        });
    }
}