import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { login as loginService, register as registerService, logout as logoutService, RegisterData } from '@/services/authService';
import { getUserProfile, UserData } from '@/services/userService';
import { toast } from '@/hooks/use-toast';

export interface AuthContextType {
  isAuthenticated: boolean;
  userData: UserData | null;
  login: (email: string, password: string) => Promise<void>;
  register: (data: Omit<RegisterData, 'is_active' | 'is_superuser'>) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userData, setUserData] = useState<UserData | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
      fetchUserData();
    }
  }, []);

  const fetchUserData = async () => {
    try {
      const data = await getUserProfile();
      setUserData(data);
    } catch (error) {
      console.error('Error fetching user data:', error);
      logout();
    }
  };

  const login = async (email: string, password: string) => {
    await loginService(email, password);
    setIsAuthenticated(true);
    await fetchUserData();
  };

  const register = async (data: Omit<RegisterData, 'is_active' | 'is_superuser'>) => {
    await registerService(data);
    setIsAuthenticated(true);
    await fetchUserData();
  };

  const logout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    setUserData(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, userData, login, register, logout }}>
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