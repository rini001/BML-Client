// src/context/AuthContext.tsx
import { createContext, useState, useEffect, type ReactNode } from 'react';
import axios from '../api/axios';

interface User {
  email: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  login: async () => {},
  register: async () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const fetchUser = async () => {
    try {
      const res = await axios.get('/api/auth/me', { withCredentials: true });
      console.log("Fetched user:", res.data);
      setUser(res.data);
    } catch {
      setUser(null);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const login = async (email: string, password: string) => {
    await axios.post('/api/auth/login', { email, password }, { withCredentials: true });
    await fetchUser();
  };

  const register = async (email: string, password: string) => {
    await axios.post('/api/auth/register', { email, password }, { withCredentials: true });
    await fetchUser();
  };

  const logout = async () => {
    await axios.get('/api/auth/logout', { withCredentials: true });
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
