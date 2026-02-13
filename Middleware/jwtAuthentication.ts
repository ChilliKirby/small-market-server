import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

/**
 * Checks jwt of admin client to verify authorization. 
 * @param req 
 * @param res 
 * @param next 
 * @returns 
 */
const jwtAuthentication = (req: Request, res: Response, next: NextFunction) => {

    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
        return res.status(401).json({ message: "No token" });
    }

    try {
         const user = jwt.verify(token, process.env.SMALL_MARKET_JT!);
         next();
    } catch (error) {
        return res.status(403).json({ message: "Invalid token."});
    }
}