/* eslint-disable camelcase */
import axios from 'axios';
import env from 'react-dotenv';

const { X_API_KEY, BASE_URL } = env;

export const getSessionId = async (token) => axios
  .get(
    `${BASE_URL}/chat/sessionId`,
    {
      withCredentials: true,
      headers: {
        'content-type': 'application/json',
        x_api_key: X_API_KEY,
        authorization: token,
      },
    },
  )
  .then((data) => data.data)
  .catch((error) => {
    switch (error.response.status) {
      case 401:
        return 'Unauthorized';
      default:
        return 'internal server error';
    }
  });

export const chatRespond = async (token, user_session_id, historic, prompt) => axios
  .post(
    `${BASE_URL}/chat/conversation`,
    {
      userSessionId: user_session_id,
      historic,
      prompt,
    },
    {
      withCredentials: true,
      headers: {
        'content-type': 'application/json',
        x_api_key: X_API_KEY,
        authorization: token,
      },
    },
  ).then((data) => data.data).catch((error) => {
    switch (error.response.status) {
      case 401:
        return 'Unauthorized';
      default:
        return 'internal server error';
    }
  });

export const transcript = async (token, blob) => {
  const formData = new FormData();
  formData.append('audio', blob, 'audio.webm');

  return axios.post(
    `${BASE_URL}/chat/transcript`,
    formData,
    {
      withCredentials: true,
      headers: {
        'content-type': 'multipart/form-data',
        x_api_key: X_API_KEY,
        authorization: token,
      },
    },
  ).then((data) => data).catch((error) => error);
};
