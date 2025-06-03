import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Pizza, Users, DollarSign, ShoppingCart, Settings, LogOut } from "lucide-react";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");

  const stats = [
    { title: "Commandes Totales", value: "152", icon: ShoppingCart, color: "text-blue-600" },
    { title: "Revenus", value: "3 240 €", icon: DollarSign, color: "text-green-600" },
    { title: "Clients", value: "89", icon: Users, color: "text-purple-600" },
    { title: "Articles du Menu", value: "24", icon: Pizza, color: "text-red-600" },
  ];

  const recentOrders = [
    { id: "#001", customer: "Jean Dupont", total: "25,99 €", status: "terminée", time: "il y a 2h" },
    { id: "#002", customer: "Marie Martin", total: "18,50 €", status: "en préparation", time: "il y a 1h" },
    { id: "#003", customer: "Michel Dubois", total: "32,75 €", status: "en attente", time: "il y a 30m" },
    { id: "#004", customer: "Sophie Bernard", total: "22,00 €", status: "terminée", time: "il y a 15m" },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "terminée": return "bg-green-100 text-green-800";
      case "en préparation": return "bg-yellow-100 text-yellow-800";
      case "en attente": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="px-4 lg:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Pizza className="h-8 w-8 text-red-600" />
            <span className="text-2xl font-bold text-gray-900">Bella Pizza Paris Admin</span>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon">
              <Settings className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <LogOut className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white shadow-sm min-h-screen">
          <nav className="p-4 space-y-2">
            {[
              { id: "overview", label: "Vue d'ensemble", icon: Pizza },
              { id: "orders", label: "Commandes", icon: ShoppingCart },
              { id: "customers", label: "Clients", icon: Users },
              { id: "settings", label: "Paramètres", icon: Settings },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left ${
                  activeTab === item.id
                    ? "bg-red-100 text-red-700"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                <item.icon className="h-5 w-5" />
                <span>{item.label}</span>
              </button>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          {activeTab === "overview" && (
            <div className="space-y-6">
              <h1 className="text-3xl font-bold text-gray-900">Tableau de Bord</h1>
              
              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                  <Card key={index}>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium text-gray-600">
                        {stat.title}
                      </CardTitle>
                      <stat.icon className={`h-4 w-4 ${stat.color}`} />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{stat.value}</div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Recent Orders */}
              <Card>
                <CardHeader>
                  <CardTitle>Commandes Récentes</CardTitle>
                  <CardDescription>Dernières commandes clients</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentOrders.map((order) => (
                      <div key={order.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center space-x-4">
                          <div>
                            <p className="font-medium">{order.id}</p>
                            <p className="text-sm text-gray-600">{order.customer}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4">
                          <Badge className={getStatusColor(order.status)}>
                            {order.status}
                          </Badge>
                          <div className="text-right">
                            <p className="font-medium">{order.total}</p>
                            <p className="text-sm text-gray-600">{order.time}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === "orders" && (
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-6">Gestion des Commandes</h1>
              <Card>
                <CardHeader>
                  <CardTitle>Toutes les Commandes</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">Interface de gestion des commandes à venir...</p>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === "customers" && (
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-6">Clients</h1>
              <Card>
                <CardHeader>
                  <CardTitle>Liste des Clients</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">Interface de gestion des clients à venir...</p>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === "settings" && (
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-6">Paramètres</h1>
              <Card>
                <CardHeader>
                  <CardTitle>Paramètres du Restaurant</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">Interface des paramètres à venir...</p>
                </CardContent>
              </Card>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
