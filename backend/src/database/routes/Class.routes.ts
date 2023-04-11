import express from 'express';
import ClassController from '../controllers/Class.controller';
import apiKeyMiddleware from '../middlewares/apiKeyMiddleware';
import validateClass from '../middlewares/validateClass';

const classController = new ClassController();

export default class Class {
  public router: express.Router;

  constructor() {
    this.router = express.Router();
    this.router.get('/', apiKeyMiddleware, classController.getAll);
    this.router.post('/create', apiKeyMiddleware, validateClass, classController.create);
    this.router.get('/:id', apiKeyMiddleware, classController.getOne);
    this.router.put('/:id', apiKeyMiddleware, classController.update);
    this.router.put('/delete/:id', apiKeyMiddleware, classController.delete);
  }
}
