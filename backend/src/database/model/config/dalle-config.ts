/* eslint-disable import/prefer-default-export */
/* eslint-disable @typescript-eslint/naming-convention */
import axios, { AxiosRequestConfig } from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const config: AxiosRequestConfig = {
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
  },
};

export const dalleConfig = axios.create(config);
