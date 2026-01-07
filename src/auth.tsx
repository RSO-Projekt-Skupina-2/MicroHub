import { createContext, useContext, useEffect, useMemo, useState, ReactNode, useCallback, useRef } from "react";
import {
  AuthUser,
  CreateUserPayload,
  fetchCurrentUser,
  getStoredToken,
  login as loginApi,
  registerUser,
  setAuthToken,
} from "./api";

interface AuthContextValue {
  user?: AuthUser;
  token?: string;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (payload: CreateUserPayload) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | undefined>(undefined);
  const [token, setToken] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(true);
  const hasBooted = useRef(false);

  useEffect(() => {
    if (hasBooted.current) return;
    hasBooted.current = true;

    const boot = async () => {
      const storedToken = getStoredToken();

      if (!storedToken) {
        setLoading(false);
        return;
      }

      try {
        setAuthToken(storedToken);
        const currentUser = await fetchCurrentUser();
        setUser(currentUser);
        setToken(storedToken);
      } catch (error) {
        setAuthToken(undefined);
        setToken(undefined);
        setUser(undefined);
      } finally {
        setLoading(false);
      }
    };

    boot();
  }, []);

  const handleLogin = useCallback(async (email: string, password: string) => {
    const result = await loginApi(email, password);
    setAuthToken(result.token);
    setUser(result.user);
    setToken(result.token);
  }, []);

  const handleRegister = useCallback(async (payload: CreateUserPayload) => {
    await registerUser(payload);
    await handleLogin(payload.email, payload.password);
  }, [handleLogin]);

  const handleLogout = useCallback(() => {
    setAuthToken(undefined);
    setUser(undefined);
    setToken(undefined);
  }, []);

  const value = useMemo(
    () => ({ user, token, loading, login: handleLogin, register: handleRegister, logout: handleLogout }),
    [user, token, loading, handleLogin, handleRegister, handleLogout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return ctx;
}
