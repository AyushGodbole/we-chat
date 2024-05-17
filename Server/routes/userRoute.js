import {Router} from 'express';
import { login, register } from '../controllers/userContoller.js';
 
// creating router object
const router = Router();

// which function to call when '/register' hits
router.post('/register',register);

// which function to call when '/login' hits
router.post('/login',login)

export default router;