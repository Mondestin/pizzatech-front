import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, User, Mail, MapPin, Phone, Loader2 } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { getUserProfile, UserData } from "@/services/userService";
import { getOrders, Order } from "@/services/orderService";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const PastOrders = () => {
  const { isAuthenticated } = useAuth();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [userData, ordersData] = await Promise.all([
          getUserProfile(),
          getOrders()
        ]);
        setUserData(userData);
        setOrders(ordersData);
        setError(null);
      } catch (err) {
        setError("Erreur lors du chargement des données. Veuillez réessayer plus tard.");
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };

    if (isAuthenticated) {
      fetchData();
    }
  }, [isAuthenticated]);

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('fr-FR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      timeZone: 'Europe/Paris'
    });
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
              <Button 
                onClick={() => window.location.reload()} 
                className="mt-4 bg-red-600 hover:bg-red-700"
              >
                Réessayer
              </Button>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  if (orders.length === 0) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-gray-50 py-16">
          <div className="container mx-auto px-4">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Aucune Commande</h2>
              <p className="text-gray-600 mb-8">
                Vous n'avez pas encore passé de commande.
              </p>
              <Link to="/menu">
                <Button className="bg-red-600 hover:bg-red-700">
                  Voir le Menu
                </Button>
              </Link>
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
          <div className="mb-8">
            <Link to="/" className="inline-flex items-center text-red-600 hover:text-red-700">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Retour à l'Accueil
            </Link>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Past Orders */}
            <div className="lg:col-span-2">
              <Card className="border-none shadow-lg">
                <CardHeader className="bg-white border-b">
                  <CardTitle className="text-xl font-bold text-gray-900">Mes Commandes</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-6">
                    {orders.map((order) => (
                      <div key={order.id} className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <p className="text-sm text-gray-500">
                              Commande #{order.id} • {formatDate(order.order_date)}
                            </p>
                            <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium mt-2 ${getStatusColor(order.status)}`}>
                              {order.status}
                            </span>
                          </div>
                          <p className="font-bold text-lg text-gray-900">{order.total_price.toFixed(2)} €</p>
                        </div>
                        <div className="space-y-3 pt-3 border-t border-gray-100">
                          {order.items.map((item) => (
                            <div key={item.id} className="flex justify-between items-center">
                              <div>
                                <p className="text-sm font-medium text-gray-900">{item.pizza.name}</p>
                                <p className="text-xs text-gray-500">
                                  {item.quantity}x • {item.price.toFixed(2)} €
                                </p>
                              </div>
                              <p className="text-sm font-medium text-gray-900">
                                {(item.price * item.quantity).toFixed(2)} €
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* User Profile Section */}
            <div>
              <Card className="border-none shadow-lg">
                <CardHeader className="bg-white border-b">
                  <CardTitle className="text-xl font-bold text-gray-900">Profil Utilisateur</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  {userData && (
                    <div className="space-y-4">
                      <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                        <User className="h-5 w-5 text-red-600" />
                        <span className="text-gray-900">{userData.full_name}</span>
                      </div>
                      <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                        <Mail className="h-5 w-5 text-red-600" />
                        <span className="text-gray-900">{userData.email}</span>
                      </div>
                      <Button variant="outline" className="w-full mt-4 border-red-600 text-red-600 hover:bg-red-600 hover:text-white">
                        Modifier le Profil
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default PastOrders;
