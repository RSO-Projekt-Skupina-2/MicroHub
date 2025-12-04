import axios from "axios";

axios.defaults.withCredentials = true;

export type Post = {
  id: number;
  author: string;
  text: string;
  title: string;
  topics: string[];
};

const BASE_URL = "http://localhost:8080";


export async function getPosts(): Promise<Post[]> {
  const response = await axios.get<Post[]>(`${BASE_URL}/posts`);
  console.log(response.data);
  return response.data;
}