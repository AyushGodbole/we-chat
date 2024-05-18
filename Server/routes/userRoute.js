import {Router} from 'express';
import { login, logout, register, setAvatar } from '../controllers/userContoller.js';
 
// creating router object
const router = Router();

// which function to call when '/register' hits
router.post('/register',register);

// which function to call when '/login' hits
router.post('/login',login);

// which function to call when '/logout' hits
router.get('/logout',logout);

// which function to call when '/logout' hits
router.post('/setAvatar/:id',setAvatar);
export default router;