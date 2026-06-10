import express from 'express';

import usersGetCategories from '../../Controllers/UsersBusiness/UsersGetCategories';


const router = express.Router();

router.get('/categories', usersGetCategories);

export default router;