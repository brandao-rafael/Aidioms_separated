import { Request, Response } from "express";
import ImageGeneratorService from "../services/imageGenerator.service";

export default class ImageController {
  public generateImage = async (req: Request, res: Response) => {
    const { prompt, userId, quantity, filter } = req.body;
    const base_64 = await ImageGeneratorService.generateImage(prompt, userId, quantity, filter);
    return res.status(200).json({ base_64 });
  }
}