import { verify } from 'crypto';
import express from 'express';
import multer from 'multer';

import verifyGoogleToken from '../../Controllers/GoogleTokenAuthentication';

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage: storage})

router.post('/addbusiness', upload.array("image", 4), async(req, res) => {
    console.log("hitting server");
    console.log(req.body);
    console.log(req.files);
});

export default router;