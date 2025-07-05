import express from 'express';

import verifyGoogleToken from '../../Controllers/GoogleTokenAuthentication';

const router = express.Router();

router.post('/adminlogin', verifyGoogleToken, (req, res) =>{
    console.log("here")
    console.log(( req as any).customData.email);
    res.send("req");
});

export default router;