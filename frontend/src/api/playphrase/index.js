import axios from 'axios';
import env from 'react-dotenv';

const { BASE_URL } = env;

export const downloadByUrl = async (url) => axios.post(
  `${BASE_URL}/playphrase/add`,
  {
    url,
  },
  {
    withCredentials: true,
    headers: {
      'content-type': 'application/json',
    },
  },
).then((data) => data).catch((error) => error);

export const getVideo = async (query) => axios.get(
  `${BASE_URL}/playphrase/video?query=${query}`,
  {
    withCredentials: true,
    headers: {
      'content-type': 'application/json',
    },
  },
).then((response) => response).catch((error) => error);
