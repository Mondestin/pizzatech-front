// Service for handling authentication-related API calls
const API_URL = 'https://pizza-management-api-production.up.railway.app/api/v1';

const defaultHeaders = {
  'Accept': 'application/json',
  'Content-Type': 'application/json'
};

export interface RegisterData {
  email: string;
  username: string;
  is_active: boolean;
  is_superuser: boolean;
  first_name: string;
  last_name: string;
  password: string;
}

export interface LoginData {
  username: string;
  password: string;
}

export interface AuthResponse {
  access_token: string;
  token_type: string;
}

export const register = async (data: Omit<RegisterData, 'is_active' | 'is_superuser'>): Promise<void> => {
  try {
    const payload = {
      ...data,
      is_active: true,
      is_superuser: false
    };

    const response = await fetch(`${API_URL}/users/register`, {
      method: 'POST',
      headers: defaultHeaders,
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || 'Erreur lors de l\'inscription');
    }

    const responseData = await response.json();
    localStorage.setItem('token', responseData.access_token);
  } catch (error) {
    console.error('Registration error:', error);
    throw error;
  }
};

export const login = async (email: string, password: string): Promise<void> => {
  try {
    const params = new URLSearchParams();
    params.append('username', email);
    params.append('password', password);

    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: {
        ...defaultHeaders,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: params,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || 'Erreur lors de la connexion');
    }

    const data = await response.json();
    localStorage.setItem('token', data.access_token);
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};

export const logout = (): void => {
  localStorage.removeItem('token');
}; 