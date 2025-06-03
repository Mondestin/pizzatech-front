import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { login as loginService, register as registerService, logout as logoutService } from '@/services/authService';
import { toast } from '@/hooks/use-toast';

interface AuthContextType {
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, full_name: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
  }, []);

  const login = async (email: string, password: string) => {
    await loginService(email, password);
    setIsAuthenticated(true);
  };

  const register = async (email: string, full_name: string, password: string) => {
    await registerService({ email, full_name, password });
    setIsAuthenticated(true);
  };

  const logout = () => {
    logoutService();
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 