import express from 'express';
import jwt from 'jsonwebtoken';

import verifyGoogleToken from '../../Middleware/GoogleTokenAuthentication';
import Admin from '../../Models/Admin';

const router = express.Router();

router.post('/adminlogin', verifyGoogleToken, async (req, res) => {

    const name = (req as any).customData.name;
    const email = (req as any).customData.email.trim();

    //res.send("req");
    const user = await Admin.findOne({ email: email });
    console.log(user);

    if (!user) {
        return res.status(404).send("User not found");
    }

    const JWT_SECRET = process.env.SMALL_MARKET_JT as string;

    const userId = user?._id.toString();

    const token = jwt.sign(
        { userId },              // payload (must be an object or string)
        JWT_SECRET,              // secret (must be a string or buffer)
        { expiresIn: '1d' }      // options (optional)
    );
    
    res.status(200).json({ 
        name: name,
        token: token 
    });
});

export default router;