import { verify } from 'crypto';
import express from 'express';
import multer from 'multer';

import verifyGoogleToken from '../../Controllers/GoogleTokenAuthentication';
import {addBusiness} from '../../Controllers/AdminBusiness/adminAddBusiness';
import adminGetBusinesses from '../../Controllers/AdminBusiness/adminGetBusinesses';

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage: storage})


router.post('/addbusiness', upload.array("image", 4), addBusiness);
router.get('/admingetbusinesses', adminGetBusinesses);

export default router;