import express from 'express'; 
import checkauth from '../middlewares/checkauth.js';
import {userList,saveUser,viewUser,editUser,deleteUser,userLogin,userSignup,usernameCheck} from  '../controllers/UsersControllers.js';
const router = express.Router();
const exp = express();
router.get('/',userList);
router.post('/',checkauth,saveUser);
router.get('/:id',viewUser);
router.put('/:id',editUser);
router.delete('/:id',deleteUser);
router.post('/login',userLogin);
router.post('/signup',userSignup);
router.post('/username_validation',usernameCheck)
export default router;