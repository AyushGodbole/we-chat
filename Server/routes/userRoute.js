import {Router} from 'express';
import { getAllUsers, login, register, setAvatar } from '../controllers/userContoller.js';
 
// creating router object
const router = Router();

// which function to call when '/register' hits
router.post('/register',register);

// which function to call when '/login' hits
router.post('/login',login);

// which function to call when '/logout' hits
router.post('/setAvatar/:id',setAvatar);

// all user routd
router.get('/allusers/:id',getAllUsers);
export default router;