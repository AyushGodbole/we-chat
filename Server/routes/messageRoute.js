import {Router} from 'express';
import { addMessage, getAllMessages } from '../controllers/messageController.js';
 
// creating router object
const router = Router();

// which function to call when '/register' hits
router.post('/addmsg',addMessage);

// which function to call when '/login' hits
router.post('/getAllMessages',getAllMessages);

export default router;