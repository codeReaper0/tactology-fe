/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import {getSession, signOut} from "next-auth/react";
import Cookies from "js-cookie";

export const API_URL = "https://tactology-be-ybj6.onrender.com/graphql"; // Replace with your GraphQL endpoint

// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

// Function to retrieve the access token from the session
const getAccessToken = async (): Promise<string | null> => {
  const session = await getSession();
  return session?.accessToken || null; // Access token from NextAuth session
};

// Axios request function for GraphQL requests
export const axiosGraphQLRequest = async (
  query: string,
  variables: any = null
): Promise<any> => {
  try {
    const accessToken = await getAccessToken();

    // Config for the GraphQL request
    const config: any = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      data: {
        query,
        variables,
      },
    };

    // Conditionally add Authorization header if accessToken exists
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    const response = await axiosInstance(config);
    return response?.data; // Return response data
  } catch (error: any) {
    console.error("GraphQL request failed:", error);
    if (axios.isAxiosError(error)) {
      // Handle specific Axios error cases here
    }
    throw error;
  }
};

// Axios interceptor to handle 401 errors
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      signOut();
      Cookies.remove("user"); // Remove any related user cookies
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
