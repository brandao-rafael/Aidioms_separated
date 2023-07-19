import axios from "axios"
import 'dotenv/config';

export default class playPhrase {
  static download = async (url: string) => {
    return await axios.post(
      `${process.env.PS_BASE_URL}/download`,
      {
        url,
      },
      {
        headers: {
          'content-type': 'application/json',
        },
      },
    ).then((data) => data).catch((error) => error);
  }

  private static search = async (query: string) => {
    return await axios.post(
      `${process.env.PS_BASE_URL}/search`,
      {
        query,
      },
      {
        headers: {
          'content-type': 'application/json',
        },
      },
    ).then((data) => data).catch((error) => error);
  }

  private static getDataVideo = async (query: string) => {
    return await axios.get(
      `${process.env.PS_BASE_URL}${query}`,
      {
        headers: {
          'content-type': 'application/json',
        },
      },
    ).then((data) => data).catch((error) => error);
  }

  static getVideoBySearch = async (query: string) => {
    const response = await this.search(query);
    const arrayClips: string[] = []
    response.data.clips.map((url: string) => {
      arrayClips.push(`${process.env.PS_BASE_URL}${url}`)
    })
    return arrayClips;
  }
}