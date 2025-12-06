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