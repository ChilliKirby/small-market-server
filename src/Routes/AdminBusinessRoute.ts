import { verify } from 'crypto';
import express from 'express';
import multer from 'multer';

import verifyGoogleToken from '../../Middleware/GoogleTokenAuthentication';
import jwtAuthentication from '../../Middleware/jwtAuthentication';
import {addBusiness} from '../../Controllers/AdminBusiness/adminAddBusiness';
import adminGetBusinesses from '../../Controllers/AdminBusiness/adminGetBusinesses';
import adminGetBusiness from '../../Controllers/AdminBusiness/adminGetBusiness';
import adminUpdateBusiness from '../../Controllers/AdminBusiness/adminUpdateBusiness';
import adminUpdateBusinessImage from '../../Controllers/AdminBusiness/adminUpdateBusinessImage';

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage: storage})


router.post('/addbusiness', upload.single("image"), addBusiness);
router.put('/adminupdatebusiness/:id', jwtAuthentication, adminUpdateBusiness);
router.get('/admingetbusinesses',jwtAuthentication, adminGetBusinesses);
router.get('/admingetbusiness', jwtAuthentication, adminGetBusiness);
router.put('/adminupdatebusinessimage/:id', jwtAuthentication, upload.single("image"), adminUpdateBusinessImage);

export default router;