import axios from 'axios';
import env from 'react-dotenv';

const { X_API_KEY, BASE_URL } = env;
// route

export const registerUser = async (user) => axios
  .post(
    `${BASE_URL}/user/register`,
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

export const sendEmailResetPassword = async (email) => axios
  .post(
    `${BASE_URL}/user/email-password-reset`,
    { email },
    {
      withCredentials: true,
      headers: {
        'content-type': 'application/json',
        x_api_key: X_API_KEY || 'banana',
      },
    },
  ).then((response) => response.data)
  .catch((error) => error);

export const resetPassword = async (code, password) => axios
  .put(
    `${BASE_URL}/user/password-reset`,
    {
      token: code,
      password,
    },
    {
      withCredentials: true,
      headers: {
        'content-type': 'application/json',
        x_api_key: X_API_KEY || 'banana',
      },
    },
  ).then((response) => response)
  .catch((error) => error);
