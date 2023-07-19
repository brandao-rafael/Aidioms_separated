import express from 'express';
import ChatController from '../controllers/Chat.controller';
import validateJwt from '../middlewares/jwtValidation';
import multer from 'multer';

const storage = multer.memoryStorage();
const upload = multer({ storage });

const chatController = new ChatController();

export default class Chat {
  public router: express.Router;

  constructor() {
    this.router = express.Router();
    this.router.post('/conversation', validateJwt, chatController.conversation);
    this.router.post('/transcript', validateJwt, upload.single('audio'), chatController.transcript);
    this.router.get('/sessionId', validateJwt, chatController.newSessionId);
  }
}
