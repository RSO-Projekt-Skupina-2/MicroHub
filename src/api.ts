import axios from "axios";

axios.defaults.withCredentials = true;

export type Post = {
  id: number;
  author: string;
  text: string;
  title: string;
  topics: string[];
};

const POSTS_URL = import.meta.env.VITE_POSTS_SERVICE_URL;

export async function getPosts(): Promise<Post[]> {
  try {
    const response = await axios.get<Post[]>(`${POSTS_URL}/posts`);
    console.log("Posts:", response.data);
    return response.data;
  } catch (error) {
    console.error(`Failed to fetch from ${POSTS_URL}/posts:`, error);
    throw error;
  }
}

// Klic serverless funkcije
const HEALTH_URL = import.meta.env.VITE_SERVERLESS_FUNCTION_URL;

export type HealthStatus = {
  status: string;
  service: string;
  component: string;
  timestamp: string;
};

export async function getHealth(): Promise<HealthStatus> {
  try {
    const response = await axios.get<HealthStatus>(HEALTH_URL, {
      withCredentials: false
    });
    console.log("Health:", response.data);
    return response.data;
  } catch (error) {
    console.error(`Failed to fetch from ${HEALTH_URL}:`, error);
    return {
      status: "down",
      service: "microhub",
      component: "health-function",
      timestamp: new Date().toISOString()
    };
  }
}