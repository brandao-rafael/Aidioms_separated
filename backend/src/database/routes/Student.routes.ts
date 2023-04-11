import express from 'express';
import StudentController from '../controllers/Students.controller';
import apiKeyMiddleware from '../middlewares/apiKeyMiddleware';

const studentController = new StudentController();

export default class Student {
  public router: express.Router;

  constructor() {
    this.router = express.Router();
    this.router.get('/', apiKeyMiddleware, studentController.getAll);
    this.router.post('/', apiKeyMiddleware, studentController.create);
    this.router.get('/:id', apiKeyMiddleware, studentController.getById);
    this.router.put('/:id', apiKeyMiddleware, studentController.update);
    this.router.put('/delete/:id', apiKeyMiddleware, studentController.delete);
  }
}
