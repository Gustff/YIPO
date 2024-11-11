import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => boolean;
  logout: () => void;
  register: (username: string, password: string) => boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

const ADMIN_USER = {
  username: 'admin',
  password: 'gatito123',
  role: 'admin' as const
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = (username: string, password: string) => {
    if (username === ADMIN_USER.username && password === ADMIN_USER.password) {
      setUser(ADMIN_USER);
      localStorage.setItem('user', JSON.stringify(ADMIN_USER));
      return true;
    }
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const foundUser = users.find((u: User) => u.username === username && u.password === password);
    if (foundUser) {
      setUser(foundUser);
      localStorage.setItem('user', JSON.stringify(foundUser));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const register = (username: string, password: string) => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    if (users.some((u: User) => u.username === username)) {
      return false;
    }
    const newUser = { username, password, role: 'user' as const };
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    return true;
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};