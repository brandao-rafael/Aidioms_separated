import { Configuration, OpenAIApi } from 'openai';
import 'dotenv/config';
// import { ImageGenerated } from '../model/image.model';

export default class ImageGeneratorService {
  public static generateImage = async (prompt: string, _userId: number, quantity: number = 1) => {
    
    try {
      const configuration = new Configuration({
        apiKey: process.env.OPENAI_API_KEY,
      });
      const openai = new OpenAIApi(configuration);
      const response = await openai.createImage({
        prompt,
        n: quantity,
        response_format: 'b64_json',
        size: "256x256",
      });
      const b64Json = response.data.data;
      return b64Json;
      
    } catch (error) {    
      return error;
    }
  }
}