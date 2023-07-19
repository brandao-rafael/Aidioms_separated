import { Request, Response } from 'express';
import playPhrase from '../services/playphrase.service';
// import path from 'path';
// import fs from 'fs';

export default class PlayphraseController {
  public addNewVideo = async (req: Request, res: Response): Promise<void | Response> => {
    const { url } = req.body;
    try {
      const added = await playPhrase.download(url);
      return res.status(201).json({ message: added });
    } catch (error) {
      return res.status(500).end();
    }
  }

  public getVideo = async (req: Request, res: Response): Promise<void | Response> => {
    const { query } = req.query;

    try {
      const videoUrls = await playPhrase.getVideoBySearch(query as string);
      
      return res.status(200).json({ urls: videoUrls });
    } catch (error) {
      return res.status(500).end();
    }
  };
}