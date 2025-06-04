// Service for handling order-related API calls
const API_URL = 'https://pizza-management-api-production.up.railway.app/api/v1';

const defaultHeaders = {
  'Accept': 'application/json',
  'Content-Type': 'application/json'
};

export interface CreateOrderItem {
  pizza_id: number;
  quantity: number;
}

export interface OrderItem {
  pizza_id: number;
  pizza_name: string;
  quantity: number;
  unit_price: number;
  subtotal: number;
}

export interface CreateOrderData {
  user_id: number;
  items: CreateOrderItem[];
}

export interface Order {
  id: number;
  user_id: number;
  items: OrderItem[];
  status: string;
  total_price: number;
  created_at: string;
  updated_at: string | null;
}

export const createOrder = async (orderData: CreateOrderData): Promise<Order> => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No authentication token found');
    }

    const response = await fetch(`${API_URL}/orders/`, {
      method: 'POST',
      headers: {
        ...defaultHeaders,
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(orderData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || 'Error creating order');
    }

    return await response.json();
  } catch (error) {
    console.error('Error creating order:', error);
    throw error;
  }
};

export const getOrders = async (): Promise<Order[]> => {
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
      throw new Error(errorData.detail || 'Erreur lors de la récupération des commandes');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching orders:', error);
    throw error;
  }
}; 