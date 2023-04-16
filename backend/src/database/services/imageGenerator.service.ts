import { Configuration, CreateImageRequestSizeEnum, OpenAIApi } from 'openai';
import 'dotenv/config';
import Filter from '../interfaces/image/Filter';
// import { ImageGenerated } from '../model/image.model';

export default class ImageGeneratorService {
  private static generatePrompt = (filter: Filter) => {
    let prompt = ''
    if (Object.entries(filter).length === 0 && filter.constructor === Object) return '';
    Object.entries(filter).forEach((element) => {
      prompt += `${element[0].toUpperCase()}: ${element[1]}; `;
    });
    return prompt;
    
  }

  public static generateImage = async (prompt: string, _userId: number, quantity: number = 1, filter: Filter) => {
    let size = '256x256';

    if (filter?.size) {
      size = filter.size;
      delete filter.size;
    }
    const filteredPrompt = `${prompt.replace('\n', '')} ${this.generatePrompt(filter)}`;
    try {
      const configuration = new Configuration({
        apiKey: process.env.OPENAI_API_KEY,
      });
      const openai = new OpenAIApi(configuration);
      const response = await openai.createImage({
        prompt: filteredPrompt,
        n: quantity,
        response_format: 'b64_json',
        size: size as CreateImageRequestSizeEnum,
      });
      const b64Json = response.data.data;
      return b64Json;
      
    } catch (error) {    
      return error;
    }
  }
}