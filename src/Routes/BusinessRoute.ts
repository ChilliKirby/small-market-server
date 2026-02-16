import { verify } from 'crypto';
import express from 'express';
import multer from 'multer';

import verifyGoogleToken from '../../Middleware/GoogleTokenAuthentication';
import jwtAuthentication from '../../Middleware/jwtAuthentication';
import {addBusiness} from '../../Controllers/AdminBusiness/adminAddBusiness';
import adminGetBusinesses from '../../Controllers/AdminBusiness/adminGetBusinesses';
import adminGetBusiness from '../../Controllers/AdminBusiness/adminGetBusiness';

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage: storage})


router.post('/addbusiness', upload.array("image", 4), addBusiness);
router.get('/admingetbusinesses',jwtAuthentication, adminGetBusinesses);
router.get('/admingetbusiness', jwtAuthentication, adminGetBusiness);
export default router;