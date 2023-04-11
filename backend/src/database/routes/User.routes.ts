import express from 'express';
import UserController from '../controllers/User.controller';
import apiKeyMiddleware from '../middlewares/apiKeyMiddleware';
import validateJwt from '../middlewares/jwtValidation';
import validateLogin from '../middlewares/validateLogin';
import validateRegister from '../middlewares/validateRegister';

const userController = new UserController();

export default class User {
  public router: express.Router;

  constructor() {
    this.router = express.Router();
    this.router.get('/user', validateJwt, userController.getById);
    this.router.post('/register', apiKeyMiddleware, validateRegister, userController.create);
    this.router.post('/login', apiKeyMiddleware, validateLogin, userController.login);
    this.router.put('/validate', apiKeyMiddleware, userController.validate);
    this.router.put('/:id/update', apiKeyMiddleware, userController.update);
    this.router.patch('/:id/delete', apiKeyMiddleware, userController.delete);
  }
}
