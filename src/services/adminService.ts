// Service for handling admin-related API calls
const API_URL = 'https://pizza-management-api-production.up.railway.app/api/v1';

const defaultHeaders = {
  'Accept': 'application/json',
  'Content-Type': 'application/json'
};

export interface AdminUser {
  id: number;
  email: string;
  full_name: string;
  is_active: boolean;
  is_admin: boolean;
}

export interface AdminOrder {
  id: number;
  status: string;
  total_price: number;
  user_id: number;
  order_date: string;
  items: {
    id: number;
    pizza_id: number;
    quantity: number;
    price: number;
    pizza: {
      id: number;
      name: string;
      description: string;
      price: number;
      image_url: string;
    };
  }[];
}

export interface PizzaTopping {
  id: number;
  name: string;
  price: number;
}

export interface AdminPizza {
  id: number;
  name: string;
  description: string;
  price: number;
  image_url: string;
  toppings: PizzaTopping[];
}

export const getUsers = async (): Promise<AdminUser[]> => {
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

export const getOrders = async (): Promise<AdminOrder[]> => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No authentication token found');
    }

    const response = await fetch(`${API_URL}/orders/?skip=0&limit=100`, {
      headers: {
        ...defaultHeaders,
        'Authorization': `Bearer ${token}`
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || 'Error fetching orders');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching orders:', error);
    throw error;
  }
};

export const updateOrderStatus = async (orderId: number, status: string): Promise<AdminOrder> => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No authentication token found');
    }

    const response = await fetch(`${API_URL}/orders/${orderId}`, {
      method: 'PATCH',
      headers: {
        ...defaultHeaders,
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ status }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || 'Error updating order status');
    }

    return await response.json();
  } catch (error) {
    console.error('Error updating order status:', error);
    throw error;
  }
};

export const getPizzas = async (): Promise<AdminPizza[]> => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No authentication token found');
    }

    const response = await fetch(`${API_URL}/pizzas/`, {
      headers: {
        ...defaultHeaders,
        'Authorization': `Bearer ${token}`
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || 'Error fetching pizzas');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching pizzas:', error);
    throw error;
  }
};

export const createPizza = async (pizzaData: Omit<AdminPizza, 'id'>): Promise<AdminPizza> => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No authentication token found');
    }

    const response = await fetch(`${API_URL}/pizzas`, {
      method: 'POST',
      headers: {
        ...defaultHeaders,
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(pizzaData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || 'Error creating pizza');
    }

    return await response.json();
  } catch (error) {
    console.error('Error creating pizza:', error);
    throw error;
  }
};

export const updatePizza = async (pizzaId: number, pizzaData: Partial<AdminPizza>): Promise<AdminPizza> => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No authentication token found');
    }

    const response = await fetch(`${API_URL}/pizzas/${pizzaId}`, {
      method: 'PATCH',
      headers: {
        ...defaultHeaders,
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(pizzaData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || 'Error updating pizza');
    }

    return await response.json();
  } catch (error) {
    console.error('Error updating pizza:', error);
    throw error;
  }
};

export const deletePizza = async (pizzaId: number): Promise<void> => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No authentication token found');
    }

    const response = await fetch(`${API_URL}/pizzas/${pizzaId}`, {
      method: 'DELETE',
      headers: {
        ...defaultHeaders,
        'Authorization': `Bearer ${token}`
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || 'Error deleting pizza');
    }
  } catch (error) {
    console.error('Error deleting pizza:', error);
    throw error;
  }
}; 