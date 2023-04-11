import axios from 'axios';
import env from 'react-dotenv';

const { X_API_KEY, BASE_URL } = env;

export const registerUser = async (user) => axios
  .post(
    'https://aidiomsv10-backend-production.up.railway.app/user/register',
    {
      ...user,
    },
    {
      withCredentials: true,
      headers: {
        'content-type': 'application/json',
        x_api_key: X_API_KEY,
      },
    },
  )
  .then((data) => data.status)
  .catch((error) => {
    switch (error.response.status) {
      case 403:
        return 'Unauthorized';
      case 409:
        return 'Email already registered';
      case 400:
        return 'Some fields are invalid';
      default:
        return 'internal server error';
    }
  });

export const login = async (user) => axios
  .post(
    `${BASE_URL}/user/login`,
    {
      ...user,
    },
    {
      withCredentials: true,
      headers: {
        'content-type': 'application/json',
        x_api_key: X_API_KEY,
      },
    },
  )
  .then((response) => ({
    status: response.status, token: response.data.token, userName: response.data.userName,
  }))
  .catch((error) => {
    switch (error.response.status) {
      case 401:
        return 'unauthorized';
      default:
        return 'internal server error';
    }
  });

export const validateEmailUser = async (email, code) => axios
  .put(
    `${BASE_URL}/user/validate`,
    {
      email,
      validationCode: code,
    },
    {
      withCredentials: true,
      headers: {
        'content-type': 'application/json',
        x_api_key: X_API_KEY,
      },
    },
  ).then((response) => ({ status: response.status }))
  .catch((error) => ({ status: error.response.status, message: error.response.data.message }));
