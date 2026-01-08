import axios from "axios";

axios.defaults.withCredentials = true;

const POSTS_URL = import.meta.env.VITE_POSTS_SERVICE_URL;
const USERS_URL = import.meta.env.VITE_USERS_SERVICE_URL;
const HEALTH_URL = import.meta.env.VITE_SERVERLESS_FUNCTION_URL;
const TOKEN_STORAGE_KEY = "microhub.auth.token";

export type Post = {
  id: number;
  author: number | string;
  authorName?: string;
  text: string;
  title: string;
  topics: string[];
};

export type AuthUser = {
  id: number;
  username: string;
  email: string;
};

export type LoginResponse = {
  token: string;
  user: AuthUser;
};

export type HealthStatus = {
  status: "ok" | "down";
  service: string;
  component: string;
  timestamp: string;
};

export type CreateUserPayload = {
  username: string;
  email: string;
  password: string;
};

export function getStoredToken(): string | undefined {
  return localStorage.getItem(TOKEN_STORAGE_KEY) || undefined;
}

export function setAuthToken(token?: string): void {
  if (token) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
    localStorage.setItem(TOKEN_STORAGE_KEY, token);
  } else {
    delete axios.defaults.headers.common.Authorization;
    localStorage.removeItem(TOKEN_STORAGE_KEY);
  }
}

export async function getPosts(topic?: string): Promise<Post[]> {
  const url = topic ? `${POSTS_URL}/posts?topic=${encodeURIComponent(topic)}` : `${POSTS_URL}/posts`;
  const response = await axios.get<Post[]>(url);
  return response.data;
}

export async function createPost(payload: {
  title: string;
  text: string;
  topics?: string[];
}): Promise<Post> {
  const response = await axios.post<Post>(`${POSTS_URL}/posts`, payload);
  return response.data;
}

export async function login(email: string, password: string): Promise<LoginResponse> {
  const response = await axios.post<LoginResponse>(`${USERS_URL}/users/login`, {
    email,
    password,
  });
  return response.data;
}

export async function registerUser(payload: CreateUserPayload): Promise<AuthUser> {
  const response = await axios.post<AuthUser>(`${USERS_URL}/users/register`, payload);
  return response.data;
}

export async function fetchCurrentUser(): Promise<AuthUser> {
  const response = await axios.get<AuthUser>(`${USERS_URL}/users/me`);
  return response.data;
}

export async function getHealth(): Promise<HealthStatus> {
  try {
    const response = await axios.get<HealthStatus>(HEALTH_URL, {
      withCredentials: false,
    });
    return response.data;
  } catch (error) {
    return {
      status: "down",
      service: "microhub",
      component: "health-function",
      timestamp: new Date().toISOString(),
    };
  }
}