import { verify } from 'crypto';
import express from 'express';
import multer from 'multer';

import verifyGoogleToken from '../../Controllers/GoogleTokenAuthentication';
import {addBusiness} from '../../Controllers/AdminBusiness/adminAddBusiness';

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage: storage})

// router.post('/addbusiness', upload.array("image", 4), async(req, res) => {
//     console.log("hitting server");
//     console.log(req.body);
//     console.log(req.files);

    
// });
router.post('/addbusiness', upload.array("image", 4), addBusiness)

export default router;