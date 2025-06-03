import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, User, Mail, Clock, MapPin } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const PastOrders = () => {
  const { token } = useAuth();

  // Mock data for past orders
  const pastOrders = [
    {
      id: "1",
      date: "2024-03-15",
      time: "19:30",
      status: "Livré",
      total: 45.99,
      deliveryAddress: "123 Rue de la Paix, 75001 Paris",
      items: [
        { name: "Margherita", quantity: 2, price: 12.99 },
        { name: "Coca-Cola", quantity: 1, price: 3.99 },
      ],
    },
    // Add more mock orders as needed
  ];

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "livré":
        return "text-green-600";
      case "en cours":
        return "text-yellow-600";
      case "annulé":
        return "text-red-600";
      default:
        return "text-gray-600";
    }
  };

  // Mock user data - in a real app, this would come from the API
  const userData = {
    email: "user@example.com",
    full_name: "Mondes Myss",
    address: "123 Rue de la Paix, 75001 Paris",
    phone: "+33 1 23 45 67 89",
  };

  if (pastOrders.length === 0) {
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
            {/* User Profile */}
            <div>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <User className="h-5 w-5 mr-2" />
                    Mon Profil
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <Mail className="h-4 w-4 mr-2 text-gray-500" />
                      <span className="text-gray-700">{userData.email}</span>
                    </div>
                    <div className="flex items-center">
                      <User className="h-4 w-4 mr-2 text-gray-500" />
                      <span className="text-gray-700">{userData.full_name}</span>
                    </div>
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-2 text-gray-500" />
                      <span className="text-gray-700">{userData.address}</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-2 text-gray-500" />
                      <span className="text-gray-700">{userData.phone}</span>
                    </div>
                    <Button variant="outline" className="w-full">
                      Modifier le Profil
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Past Orders */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Mes Commandes</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {pastOrders.map((order) => (
                      <div key={order.id} className="border-b last:border-0 pb-6 last:pb-0">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <p className="text-sm text-gray-500">
                              Commande #{order.id} • {order.date} à {order.time}
                            </p>
                            <p className={`font-medium ${getStatusColor(order.status)}`}>
                              {order.status}
                            </p>
                          </div>
                          <p className="font-bold">{order.total.toFixed(2)} €</p>
                        </div>
                        <div className="space-y-2">
                          <p className="text-sm text-gray-500">{order.deliveryAddress}</p>
                          <div className="space-y-1">
                            {order.items.map((item, index) => (
                              <p key={index} className="text-sm">
                                {item.quantity}x {item.name} - {item.price.toFixed(2)} €
                              </p>
                            ))}
                          </div>
                        </div>
                        <Button variant="outline" className="mt-4">
                          Commander à Nouveau
                        </Button>
                      </div>
                    ))}
                  </div>
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
