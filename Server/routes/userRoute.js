import {Router} from 'express';
import { register } from '../controllers/userContoller.js';
 
// creating router object
const router = Router();

// which function to call when '/register' hits
router.post('/register',register);

export default router;