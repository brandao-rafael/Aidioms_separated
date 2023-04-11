import { Configuration, OpenAIApi } from 'openai';
import UserSessionId from '../model/userSessionId.model';
import 'dotenv/config';
import Chat from '../model/chat.model';
import IHistoric from '../interfaces/chat/IHistoric';
import axios, { AxiosRequestConfig } from 'axios';
import FormData from 'form-data';

export default class ChatService {
  private static createUserSessionId = async (userId: number, sessionId: number) => {
    const inserted = await UserSessionId.create({ userId, sessionId });
    return inserted.getDataValue('id');
  };

  private static generateSessionId = () => {
    const randomNumber = Math.floor(Math.random() * (99999 - 10000 + 1) + 10000);
    return parseInt(`${Date.now()}${randomNumber}`, 10);
  };

  public static newSessionId = async (userId: number) => {
    const sessionId = this.generateSessionId();
    const id = await this.createUserSessionId(userId, sessionId);
    if (!id) return null;
    
    return id;
  };

  private static insertChat = async (
    userSessionId: number,
    prompt: string,
    output: string,
  ) => Chat.create({ userSessionId, prompt, output });

  private static getOutput = async (user: string, content: IHistoric[]) => {
    const configuration = new Configuration({
      apiKey: process.env.OPENAI_API_KEY,
    });
    const openai = new OpenAIApi(configuration);
    const completion = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: content,
      user,
    });
    return completion;
  };

  private static speechToText = async (audioBuffer: Buffer) => {
    const apiKey = process.env.OPENAI_API_KEY;
    const apiUrl = 'https://api.openai.com/v1/audio/transcriptions';
    const model = 'whisper-1';
    const responseFormat = 'text';
  
    const formData = new FormData();
    formData.append('file', audioBuffer, 'audio.webm');
    formData.append('model', model);
    formData.append('response_format', responseFormat);
    formData.append('prompt', 'Hi, my name is George and I am an English teacher!');
  
    const headers = formData.getHeaders();
    const config: AxiosRequestConfig = {
      headers: {
        ...headers,
        Authorization: `Bearer ${apiKey}`,
      },
      method: 'POST',
      url: apiUrl,
      data: formData,
    };
  
    const response = await axios(config);
    return response.data;
  }

  public static transcriptToText = async (audioBuffer: Buffer) => {
    const response = await this.speechToText(audioBuffer);
    return response
  };

  public static conversation = async (
    prompt: string,
    historic: IHistoric[],
    userId: number,
    userSessionId: number,
  ) => {
    try {
      const completion = await this.getOutput(userId.toString(), historic);
      await this.insertChat(
        userSessionId,
        prompt,
        completion.data.choices[0].message?.content as string,
      );
      return completion.data.choices[0].message;
    } catch (error) {
      return error;
    }
  };
}
