import express from 'express'
import { userRegister, userLogin, userData, userDeleted, allUSerData, createUserAddress,getUserWithAddresses } from '../controller/user.controller.js';
import { authenticateUser } from '../middleware/auth.middleware.js';

const router = express.Router();

router.post('/register', userRegister);
router.post('/login', userLogin);
router.get('/get', authenticateUser, userData);
router.delete('/delete', authenticateUser, userDeleted);
router.get('/list/:page', allUSerData)
router.post('/address', authenticateUser, createUserAddress);
router.get('/get/:id', authenticateUser, getUserWithAddresses);





export default router