import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Calendar, MapPin, Clock } from "lucide-react";

const PastOrders = () => {
  // Mock data for past orders
  const [orders] = useState([
    {
      id: "CMD-001",
      date: "2024-06-01",
      time: "18:30",
      status: "Livrée",
      total: 42.97,
      deliveryAddress: "123 Rue de la Pizza, 75001 Paris",
      items: [
        { name: "Margherita", quantity: 2, price: 16.99 },
        { name: "Pepperoni", quantity: 1, price: 18.99 }
      ]
    },
    {
      id: "CMD-002",
      date: "2024-05-28",
      time: "19:15",
      status: "Livrée",
      total: 26.99,
      deliveryAddress: "123 Rue de la Pizza, 75001 Paris",
      items: [
        { name: "Truffe Deluxe", quantity: 1, price: 26.99 }
      ]
    },
    {
      id: "CMD-003",
      date: "2024-05-20",
      time: "20:00",
      status: "Livrée",
      total: 65.96,
      deliveryAddress: "123 Rue de la Pizza, 75001 Paris",
      items: [
        { name: "Poulet BBQ", quantity: 2, price: 21.99 },
        { name: "Méditerranéenne", quantity: 1, price: 19.99 },
        { name: "Pain à l'Ail", quantity: 1, price: 7.99 }
      ]
    },
    {
      id: "CMD-004",
      date: "2024-05-15",
      time: "17:45",
      status: "Annulée",
      total: 23.99,
      deliveryAddress: "123 Rue de la Pizza, 75001 Paris",
      items: [
        { name: "Quattro Stagioni", quantity: 1, price: 23.99 }
      ]
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Livrée":
        return "bg-green-100 text-green-800";
      case "Annulée":
        return "bg-red-100 text-red-800";
      case "En Cours":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-4 lg:px-6 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2 text-gray-700 hover:text-red-600">
            <ArrowLeft className="h-5 w-5" />
            <span>Retour à l'Accueil</span>
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">Commandes Passées</h1>
          <div></div>
        </div>
      </div>

      <div className="container mx-auto px-4 lg:px-6 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Historique des Commandes</h2>
            <p className="text-gray-600">Consultez toutes vos commandes précédentes et commandez à nouveau vos favoris</p>
          </div>

          {orders.length === 0 ? (
            <Card>
              <CardContent className="text-center py-12">
                <p className="text-gray-500 mb-4">Vous n'avez pas encore passé de commande.</p>
                <Link to="/menu">
                  <Button className="bg-red-600 hover:bg-red-700">
                    Voir le Menu
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-6">
              {orders.map((order) => (
                <Card key={order.id} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div>
                        <CardTitle className="text-lg">Commande #{order.id}</CardTitle>
                        <div className="flex items-center space-x-4 text-sm text-gray-600 mt-2">
                          <div className="flex items-center space-x-1">
                            <Calendar className="h-4 w-4" />
                            <span>{order.date}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Clock className="h-4 w-4" />
                            <span>{order.time}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <Badge className={getStatusColor(order.status)}>
                          {order.status}
                        </Badge>
                        <span className="text-xl font-bold text-red-600">
                          {order.total.toFixed(2)} €
                        </span>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-start space-x-2">
                        <MapPin className="h-4 w-4 text-gray-500 mt-0.5" />
                        <span className="text-sm text-gray-600">{order.deliveryAddress}</span>
                      </div>
                      
                      <div>
                        <h4 className="font-medium mb-2">Articles Commandés :</h4>
                        <div className="space-y-2">
                          {order.items.map((item, index) => (
                            <div key={index} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0">
                              <div>
                                <span className="font-medium">{item.name}</span>
                                <span className="text-gray-600 ml-2">x{item.quantity}</span>
                              </div>
                              <span className="font-medium">{(item.price * item.quantity).toFixed(2)} €</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="flex flex-col sm:flex-row gap-2 pt-4">
                        <Button variant="outline" className="flex-1">
                          Voir les Détails
                        </Button>
                        {order.status === "Livrée" && (
                          <Button className="flex-1 bg-red-600 hover:bg-red-700">
                            Commander à Nouveau
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PastOrders;
