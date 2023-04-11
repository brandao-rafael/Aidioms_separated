import { Request, Response } from 'express';
import ChatService from '../services/chat.service';

export default class ChatController {
  public conversation = async (req: Request, res: Response): Promise<void | Response> => {
    const { prompt, userId, userSessionId, historic } = req.body;
    const response = await ChatService.conversation(prompt, historic, userId, userSessionId);
    return res.status(200).json(response);
  };

  public transcript = async (req: Request, res: Response): Promise<void | Response> => {
    try {
      const buffer = req.file?.buffer;
      if (!buffer) {
        throw new Error('Buffer is undefined');
      }
      // Remove the conversion to Uint8Array and Blob, pass the buffer directly
      const text = await ChatService.transcriptToText(buffer);
      
      return res.status(200).json({ text });
    } catch (error) {
      return res.status(500).json(error);
    }
  };


  public newSessionId = async (req: Request, res: Response): Promise<void | Response> => {
    try {
      const { userId } = req.body;
      const sessionId = await ChatService.newSessionId(userId);
      return res.status(201).json({ message: sessionId });
    } catch (error) {
      return res.status(500).json(error);
    }
  };
}
