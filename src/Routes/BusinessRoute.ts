import { verify } from 'crypto';
import express from 'express';

import verifyGoogleToken from '../../Controllers/GoogleTokenAuthentication';

const router = express.Router();

router.post('/addbusiness', async(req, res) => {
    console.log("hitting server");
});

export default router;