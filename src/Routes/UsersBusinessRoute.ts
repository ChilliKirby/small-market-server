import express from 'express';

import usersGetCategories from '../../Controllers/UsersBusiness/UsersGetCategories';
import usersGetBusinessesWithCategories from '../../Controllers/UsersBusiness/UsersGetBusinessesWithCategories';


const router = express.Router();

router.get('/categories', usersGetCategories);
router.get('/businesseswithcategories', usersGetBusinessesWithCategories);

export default router;