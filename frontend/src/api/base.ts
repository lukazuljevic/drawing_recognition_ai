import axios from "axios";

export const api = axios.create({
  baseURL: "/api",
  headers: {
    "Content-Type": "application/json",
  },
});

interface ApiErrorResponse {
  statusCode: number;
  message: string;
  error: string;
}

api.interceptors.response.use(
  (response) => response.data,
  (error: Error) => {
    if (axios.isAxiosError<ApiErrorResponse>(error)) {
      const apiError = error.response?.data;
      return Promise.reject(apiError?.message || error.message);
    }
    return Promise.reject("Network error");
  }
);
