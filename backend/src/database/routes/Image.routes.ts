import express from 'express';
import ImageController from '../controllers/Image.controller';
import validateJwt from '../middlewares/jwtValidation';

const imageController = new ImageController();

export default class Image {
  public router: express.Router;

  constructor() {
    this.router = express.Router();
    this.router.post('/generator', validateJwt, imageController.generateImage);
  }
}
