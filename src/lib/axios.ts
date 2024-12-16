/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import {signOut} from "next-auth/react";

export const API_URL = "https://tactology-be-ybj6.onrender.com/";

// Create an Axios instance
const apiClient = axios.create({
  baseURL: API_URL,
});

apiClient.interceptors.response.use(
  (response) => response, // Let successful responses pass through
  async (error) => {
    if (error.response && error.response.status === 400) {
      const message = error.response.data?.message;

      // Check if the error message corresponds to token expiration
      if (message && message.toLowerCase().includes("token expired")) {
        await signOut({callbackUrl: "/login"}); // Redirect user to login
      }
    }
    return Promise.reject(error); // Forward the error for further handling
  }
);

export default apiClient;
