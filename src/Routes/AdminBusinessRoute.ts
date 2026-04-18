import { verify } from 'crypto';
import express from 'express';
import multer from 'multer';

import verifyGoogleToken from '../../Middleware/GoogleTokenAuthentication';
import jwtAuthentication from '../../Middleware/jwtAuthentication';
import { addBusiness } from '../../Controllers/AdminBusiness/adminAddBusiness';
import adminGetBusinesses from '../../Controllers/AdminBusiness/adminGetBusinesses';
import adminGetBusiness from '../../Controllers/AdminBusiness/adminGetBusiness';
import adminUpdateBusiness from '../../Controllers/AdminBusiness/adminUpdateBusiness';
import adminUpdateBusinessImage from '../../Controllers/AdminBusiness/adminUpdateBusinessImage';
import { sanitizeMiddleware } from '../../Middleware/sanitizeMiddleware';
import { validateBusiness } from '../../Middleware/validateBusiness';
import { handleValidation } from '../../Middleware/handleValidation';

const router = express.Router();
const storage = multer.memoryStorage();

//If this multer does not find a valid image file, the route 
//will handle it.
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 5 * 1024 * 1024, //5 MB max
    },
    fileFilter: (req, file, cb: multer.FileFilterCallback) => {
        const allowed = ['image/jpeg', 'image/png',];

        if (!allowed.includes(file.mimetype)) {
            return cb(null, false); //reject file silently and let route handle
        }

        cb(null, true);
    }
})


router.post('/addbusiness', jwtAuthentication, upload.single("image"), validateBusiness, handleValidation, sanitizeMiddleware, addBusiness);
router.put('/adminupdatebusiness/:id', jwtAuthentication, adminUpdateBusiness);
router.get('/admingetbusinesses', jwtAuthentication, adminGetBusinesses);
router.get('/admingetbusiness', jwtAuthentication, adminGetBusiness);
router.put('/adminupdatebusinessimage/:id', jwtAuthentication, upload.single("image"), adminUpdateBusinessImage);

export default router;