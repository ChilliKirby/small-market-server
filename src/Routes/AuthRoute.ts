import express from 'express';

import verifyGoogleToken from '../../Controllers/GoogleTokenAuthentication';
import Admin from '../../Models/Admin';

const router = express.Router();

router.post('/adminlogin', verifyGoogleToken, async (req, res) =>{
    
    const email = (req as any).customData.email;

    //res.send("req");
    const user = await Admin.findOne({ email: email});
    console.log("sonic")
    if(!user){
        res.status(404).send("User not found");
    } 


});

export default router;