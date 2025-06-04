// Service for handling order-related API calls
const API_URL = 'https://pizzatech-back-production.up.railway.app';

export interface CreateOrderItem {
  pizza_id: number;
  quantity: number;
  price: number;
}

export interface OrderItem {
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
    toppings: {
      id: number;
      name: string;
      price: number;
    }[];
  };
}

export interface CreateOrderData {
  status: string;
  total_price: number;
  order_date: string;
  items: CreateOrderItem[];
}

export interface Order {
  id: number;
  status: string;
  total_price: number;
  user_id: number;
  order_date: string;
  items: OrderItem[];
}

export const createOrder = async (data: CreateOrderData): Promise<Order> => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No authentication token found');
    }

    console.log('Creating order with data:', {
      status: data.status,
      total_price: data.total_price,
      order_date: data.order_date,
      items: data.items.map(item => ({
        pizza_id: item.pizza_id,
        quantity: item.quantity,
        price: item.price,
        total: item.price * item.quantity
      }))
    });

    const response = await fetch(`${API_URL}/orders`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Order creation failed:', {
        status: response.status,
        statusText: response.statusText,
        error: errorData
      });
      throw new Error(errorData.detail || 'Erreur lors de la création de la commande');
    }

    const orderResponse = await response.json();
    console.log('Order created successfully:', orderResponse);
    return orderResponse;
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
      method: 'GET',
      headers: {
        'accept': 'application/json',
        'Content-Type': 'application/json',
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