// Service for handling pizza-related API calls
const API_URL = 'https://pizza-management-api-production.up.railway.app/api/v1';

export interface Topping {
  id: number;
  name: string;
  price: number;
}

export interface Pizza {
  id: number;
  name: string;
  description: string;
  price: number;
  image_url: string;
  toppings: Topping[];
}

export const getPizzas = async (skip: number = 0, limit: number = 100): Promise<Pizza[]> => {
  try {
    const response = await fetch(`${API_URL}/pizzas/?skip=${skip}&limit=${limit}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      credentials: 'include', // Include credentials if needed
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch pizzas');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching pizzas:', error);
    throw error;
  }
}; 