import axios, { AxiosResponse } from 'axios';

const { X_API_KEY, BASE_URL } = process.env;

export const generateImage = async (
  token: string, 
  prompt: string, 
  quantity: number
): Promise<AxiosResponse | Error> => 
  axios.post(
    `${BASE_URL}/image/generator`,
    {
      prompt,
      quantity,
    },
    {
      headers: {
        'content-type': 'application/json',
        x_api_key: X_API_KEY,
        authorization: token,
      },
    },
  ).then((data: AxiosResponse) => data)
  .catch((error: Error) => error);
