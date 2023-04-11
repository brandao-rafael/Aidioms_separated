import axios from 'axios';
import env from 'react-dotenv';

const { X_API_KEY, BASE_URL } = env;

// eslint-disable-next-line import/prefer-default-export
export const generateImage = async (token, prompt, quantity) => axios
  .post(
    `${BASE_URL}image/generator`,
    {
      prompt,
      quantity,
    },
    {
      headers: {
        'content-type': 'application/json',
        'x-api-key': X_API_KEY,
        authorization: token,
      },
    },
  ).then((data) => data).catch((error) => error);
