import { createContext, useContext, useState, ReactNode } from 'react';
import { register as registerUser, login as loginUser, RegisterData, LoginData, AuthResponse } from '@/services/authService';
import { toast } from '@/hooks/use-toast';

interface AuthContextType {
  isAuthenticated: boolean;
  token: string | null;
  register: (data: RegisterData) => Promise<void>;
  login: (data: LoginData) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(!!token);

  const register = async (data: RegisterData) => {
    try {
      const response: AuthResponse = await registerUser(data);
      setToken(response.access_token);
      setIsAuthenticated(true);
      localStorage.setItem('token', response.access_token);
      
      toast({
        title: "Inscription réussie",
        description: "Votre compte a été créé avec succès.",
      });
    } catch (error) {
      toast({
        title: "Erreur d'inscription",
        description: error instanceof Error ? error.message : "Une erreur est survenue lors de l'inscription",
        variant: "destructive",
      });
      throw error;
    }
  };

  const login = async (data: LoginData) => {
    try {
      const response: AuthResponse = await loginUser(data);
      setToken(response.access_token);
      setIsAuthenticated(true);
      localStorage.setItem('token', response.access_token);
      
      toast({
        title: "Connexion réussie",
        description: "Vous êtes maintenant connecté.",
      });
    } catch (error) {
      toast({
        title: "Erreur de connexion",
        description: error instanceof Error ? error.message : "Une erreur est survenue lors de la connexion",
        variant: "destructive",
      });
      throw error;
    }
  };

  const logout = () => {
    setToken(null);
    setIsAuthenticated(false);
    localStorage.removeItem('token');
    toast({
      title: "Déconnexion",
      description: "Vous avez été déconnecté avec succès.",
    });
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, token, register, login, logout }}>
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