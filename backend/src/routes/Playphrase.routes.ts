import express from 'express';
import PlayphraseController from '../controllers/Playphrase.controller';

const playPhraseController = new PlayphraseController();

export default class PlayPhrase {
  public router: express.Router;

  constructor() {
    this.router = express.Router();
    this.router.post('/add', playPhraseController.addNewVideo);
    this.router.get('/video', playPhraseController.getVideo);
  }
}