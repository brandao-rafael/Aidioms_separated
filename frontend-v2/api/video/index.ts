import axios, { AxiosResponse } from "axios";

const { BASE_URL, X_API_KEY } = process.env;

export const downloadByUrl = async (
  url: string
): Promise<AxiosResponse | Error> =>
  axios
    .post(
      `${BASE_URL}/playphrase/add`,
      {
        url,
      },
      {
        withCredentials: true,
        headers: {
          "content-type": "application/json",
          x_api_key: X_API_KEY,
        },
      }
    )
    .then((data: AxiosResponse) => data)
    .catch((error: Error) => error);

export const getVideo = async (query: string): Promise<AxiosResponse | Error> =>
  axios
    .get(`${BASE_URL}/playphrase/video?query=${query}`, {
      withCredentials: true,
      headers: {
        "content-type": "application/json",
        x_api_key: X_API_KEY,
      },
    })
    .then((response: AxiosResponse) => response)
    .catch((error: Error) => error);
