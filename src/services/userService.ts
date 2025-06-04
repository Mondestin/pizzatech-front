const API_URL = 'https://pizza-management-api-production.up.railway.app/api/v1';

const defaultHeaders = {
   'Accept': 'application/json',
  'Content-Type': 'application/json'
};

export interface UserData {
  id: number;
  email: string;
  username: string;
  first_name: string;
  last_name: string;
  is_active: boolean;
  is_superuser: boolean;
}

export const getUserProfile = async (): Promise<UserData> => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No authentication token found');
    }

    const response = await fetch(`${API_URL}/users/me`, {
      headers: {
        ...defaultHeaders,
        'Authorization': `Bearer ${token}`
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || 'Error fetching user profile');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching user profile:', error);
    throw error;
  }
};

export const getUsers = async (): Promise<UserData[]> => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No authentication token found');
    }

    const response = await fetch(`${API_URL}/users/`, {
      headers: {
        ...defaultHeaders,
        'Authorization': `Bearer ${token}`
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || 'Error fetching users');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
}; 