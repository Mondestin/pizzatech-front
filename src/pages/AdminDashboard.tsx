import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { getPizzas, updateOrderStatus } from "@/services/adminService";
import { getUsers } from "@/services/userService";
import { getOrders } from "@/services/orderService";
import { Pizza } from "@/services/adminService";
import { Order } from "@/services/orderService";
import { UserData } from "@/services/userService";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AdminHeader from "@/components/admin/AdminHeader";
import OrdersList from "@/components/admin/OrdersList";
import UsersList from "@/components/admin/UsersList";
import PizzasList from "@/components/admin/PizzasList";
import { Loader2 } from "lucide-react";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { isAuthenticated, userData } = useAuth();
  const [pizzas, setPizzas] = useState<Pizza[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [users, setUsers] = useState<UserData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      const [pizzasData, ordersData, usersData] = await Promise.all([
        getPizzas(),
        getOrders(),
        getUsers()
      ]);
      setPizzas(pizzasData);
      setOrders(ordersData);
      setUsers(usersData);
      setError(null);
    } catch (err) {
      setError("Erreur lors du chargement des données");
      console.error("Error fetching data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const checkAccess = async () => {
      if (!isAuthenticated || !userData?.is_superuser) {
        navigate('/');
        return;
      }
      await fetchData();
    };

    checkAccess();
  }, [isAuthenticated, userData, navigate]);

  const handleStatusChange = async (orderId: number, newStatus: string) => {
    try {
      await updateOrderStatus(orderId, newStatus);
      setOrders(orders.map(order => 
        order.id === orderId ? { ...order, status: newStatus } : order
      ));
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  };

  const handleAddPizza = () => {
    // TODO: Implement add pizza functionality
    console.log("Add pizza clicked");
  };

  if (loading) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-gray-50 py-16">
          <div className="container mx-auto px-4">
            <div className="text-center">
              <Loader2 className="h-8 w-8 animate-spin mx-auto text-red-600" />
              <p className="mt-4 text-gray-600">Chargement des données...</p>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  if (error) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-gray-50 py-16">
          <div className="container mx-auto px-4">
            <div className="text-center">
              <p className="text-red-600">{error}</p>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <AdminHeader />
          
          <div className="space-y-8">
            <OrdersList orders={orders} onStatusChange={handleStatusChange} />
            <UsersList users={users} />
            <PizzasList pizzas={pizzas} onPizzasChange={fetchData} />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AdminDashboard;
