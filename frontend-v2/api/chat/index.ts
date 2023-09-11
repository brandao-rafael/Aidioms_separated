/* eslint-disable camelcase */
import axios, { AxiosResponse } from "axios";

const { X_API_KEY, BASE_URL } = process.env;

interface IHistoric {
  role: "user" | "assistant";
  content: string;
}

export const getSessionId = async (token: string) =>
  axios
    .get(`${BASE_URL}/chat/sessionId`, {
      withCredentials: true,
      headers: {
        "content-type": "application/json",
        x_api_key: X_API_KEY,
        authorization: token,
      },
    })
    .then((data: AxiosResponse) => data.data)
    .catch((error) => {
      switch (error.response.status) {
        case 401:
          return "Unauthorized";
        default:
          return "internal server error";
      }
    });

export const chatRespond = async (
  token: string,
  user_session_id: string,
  historic: IHistoric[],
  prompt: string
) =>
  axios
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
          "content-type": "application/json",
          x_api_key: X_API_KEY,
          authorization: token,
        },
      }
    )
    .then((data: AxiosResponse) => data.data)
    .catch((error) => {
      switch (error.response.status) {
        case 401:
          return "Unauthorized";
        default:
          return "internal server error";
      }
    });

export const transcript = async (token: string, blob: Blob) => {
  const formData = new FormData();
  formData.append("audio", blob, "audio.webm");

  return axios
    .post(`${BASE_URL}/chat/transcript`, formData, {
      withCredentials: true,
      headers: {
        "content-type": "multipart/form-data",
        x_api_key: X_API_KEY,
        authorization: token,
      },
    })
    .then((data: AxiosResponse) => data.data)
    .catch((error) => error);
};
