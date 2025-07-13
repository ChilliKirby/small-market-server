import { Request, Response, NextFunction } from "express";
import { OAuth2Client } from "google-auth-library";

const verifyGoogleToken = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const client = new OAuth2Client();

        const idToken = req.body?.idToken;

        if (!idToken) {
            return res.status(400).json({ error: 'idToken is required in request body' });
        }

        const ticket = await client.verifyIdToken({
            idToken: idToken,
            audience: process.env.GOOGLE_CLIENT_ID,
        });

        const payload = ticket.getPayload();

        if (!payload) {
            return res.status(401).json({ error: 'Invalid Google Token' });
        }
        
        (req as any).customData = {
            name: payload.name,
            email: payload.email,
        };

        next();
    } catch (error) {
        console.log(error);
    }
};

export default verifyGoogleToken;