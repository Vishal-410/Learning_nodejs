import express from 'express'
import { userLogin, userRegister,userLogOut,updatePassword } from '../controllers/UserController.js';
import { functionVerifyToken } from '../middleware/userAuthMiddleware.js';
import { upload } from '../middleware/multer.middleware.js';

const router = express.Router();


router.post('/register',
upload.fields([
  {
    name: "avatar",
    maxCount: 1
  },
 
]),
 userRegister);
router.post('/login',userLogin);
router.post('/logout',functionVerifyToken, userLogOut);
router.post('/updatePassword',functionVerifyToken, updatePassword);



export default router;