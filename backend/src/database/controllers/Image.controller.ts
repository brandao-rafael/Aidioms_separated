import { Request, Response } from "express";
import ImageGeneratorService from "../services/imageGenerator.service";

export default class ImageController {
  public generateImage = async (req: Request, res: Response) => {
    const { prompt, userId, quantity, filter } = req.body;
    const url = await ImageGeneratorService.generateImage(prompt, userId, quantity, filter);
    return res.status(200).json({ url });
  }
}