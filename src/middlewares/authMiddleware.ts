import { NextFunction, Request, Response } from "express";

export const veryfyToken = (req: Request, res: Response, next: NextFunction) : void => {
    const token = req.headers.authorization?.split(' ')[1];
    if(!token) {
        res.status(403).json({
            error: "No token Provided"
        });
        return;
    }
}