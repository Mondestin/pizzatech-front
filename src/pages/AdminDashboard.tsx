import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Pizza, Users, DollarSign, ShoppingCart, Settings, LogOut, Loader2, Plus, Edit2, Trash2 } from "lucide-react";
import { getUsers, getOrders, updateOrderStatus, getPizzas, createPizza, updatePizza, deletePizza, AdminUser, AdminOrder, AdminPizza } from "@/services/adminService";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import ConfirmDialog from "@/components/ConfirmDialog";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [orders, setOrders] = useState<AdminOrder[]>([]);
  const [pizzas, setPizzas] = useState<AdminPizza[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isCreatingPizza, setIsCreatingPizza] = useState(false);
  const [editingPizza, setEditingPizza] = useState<AdminPizza | null>(null);
  const { logout } = useAuth();
  const navigate = useNavigate();

  // Form state
  const [pizzaForm, setPizzaForm] = useState({
    name: "",
    description: "",
    price: "",
    image_url: "",
  });

  const [deleteDialog, setDeleteDialog] = useState<{
    isOpen: boolean;
    pizzaId: number | null;
    pizzaName: string;
  }>({
    isOpen: false,
    pizzaId: null,
    pizzaName: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [usersData, ordersData, pizzasData] = await Promise.all([
          getUsers(),
          getOrders(),
          getPizzas()
        ]);
        setUsers(usersData);
        setOrders(ordersData);
        setPizzas(pizzasData);
        setError(null);
      } catch (err) {
        setError("Error loading data. Please try again later.");
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleStatusUpdate = async (orderId: number, newStatus: string) => {
    try {
      const updatedOrder = await updateOrderStatus(orderId, newStatus);
      setOrders(orders.map(order => 
        order.id === orderId ? updatedOrder : order
      ));
    } catch (err) {
      console.error("Error updating order status:", err);
    }
  };

  const handleCreatePizza = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const newPizza = await createPizza({
        ...pizzaForm,
        price: Number(pizzaForm.price),
        toppings: [],
      });
      setPizzas([...pizzas, newPizza]);
      setIsCreatingPizza(false);
      setPizzaForm({ name: "", description: "", price: "", image_url: "" });
    } catch (err) {
      console.error("Error creating pizza:", err);
    }
  };

  const handleUpdatePizza = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPizza) return;
    try {
      const updatedPizza = await updatePizza(editingPizza.id, {
        ...pizzaForm,
        price: Number(pizzaForm.price),
      });
      setPizzas(pizzas.map(pizza => 
        pizza.id === editingPizza.id ? updatedPizza : pizza
      ));
      setEditingPizza(null);
      setPizzaForm({ name: "", description: "", price: "", image_url: "" });
    } catch (err) {
      console.error("Error updating pizza:", err);
    }
  };

  const handleDeletePizza = async (pizzaId: number) => {
    try {
      await deletePizza(pizzaId);
      setPizzas(pizzas.filter(pizza => pizza.id !== pizzaId));
      setDeleteDialog({ isOpen: false, pizzaId: null, pizzaName: "" });
    } catch (err) {
      console.error("Error deleting pizza:", err);
    }
  };

  const stats = [
    { title: "Commandes Totales", value: orders.length.toString(), icon: ShoppingCart, color: "text-blue-600" },
    { title: "Revenus", value: `${orders.reduce((sum, order) => sum + order.total_price, 0).toFixed(2)} €`, icon: DollarSign, color: "text-green-600" },
    { title: "Clients", value: users.length.toString(), icon: Users, color: "text-purple-600" },
    { title: "Articles du Menu", value: "24", icon: Pizza, color: "text-red-600" },
  ];

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "completed": return "bg-green-100 text-green-800";
      case "pending": return "bg-yellow-100 text-yellow-800";
      case "cancelled": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
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
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-red-600" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <Button onClick={() => window.location.reload()}>Retry</Button>
        </div>
      </div>
    );
  }

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
            <Link to="/">
              <Button variant="outline" className="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Retour à l'accueil
              </Button>
            </Link>
            <Button onClick={handleLogout} variant="destructive">
              Déconnexion
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
              { id: "pizzas", label: "Articles", icon: Pizza },
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
                    {orders.slice(0, 5).map((order) => (
                      <div key={order.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center space-x-4">
                          <div>
                            <p className="font-medium">#{order.id}</p>
                            <p className="text-sm text-gray-600">
                              {users.find(u => u.id === order.user_id)?.full_name || 'Unknown User'}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4">
                          <Badge className={getStatusColor(order.status)}>
                            {order.status}
                          </Badge>
                          <div className="text-right">
                            <p className="font-medium">{order.total_price.toFixed(2)} €</p>
                            <p className="text-sm text-gray-600">{formatDate(order.order_date)}</p>
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
                  <div className="space-y-4">
                    {orders.map((order) => (
                      <div key={order.id} className="border rounded-lg p-4">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <p className="font-medium">Commande #{order.id}</p>
                            <p className="text-sm text-gray-600">
                              Client: {users.find(u => u.id === order.user_id)?.full_name || 'Unknown User'}
                            </p>
                            <p className="text-sm text-gray-600">
                              Date: {formatDate(order.order_date)}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-lg">{order.total_price.toFixed(2)} €</p>
                            <Badge className={`mt-2 ${getStatusColor(order.status)}`}>
                              {order.status}
                            </Badge>
                          </div>
                        </div>
                        <div className="border-t pt-4">
                          <p className="font-medium mb-2">Articles:</p>
                          <div className="space-y-2">
                            {order.items.map((item) => (
                              <div key={item.id} className="flex justify-between text-sm">
                                <span>{item.quantity}x {item.pizza.name}</span>
                                <span>{item.price.toFixed(2)} €</span>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div className="mt-4 flex justify-end space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleStatusUpdate(order.id, "completed")}
                            disabled={order.status === "completed"}
                          >
                            Marquer comme terminée
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleStatusUpdate(order.id, "cancelled")}
                            disabled={order.status === "cancelled"}
                          >
                            Annuler
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
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
                  <CardDescription>Gérez vos clients et leurs informations</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {users.map((user) => (
                      <div key={user.id} className="border rounded-lg p-6 bg-white hover:shadow-md transition-shadow">
                        <div className="flex justify-between items-start">
                          <div className="space-y-4">
                            <div>
                              <h3 className="text-xl font-semibold">{user.full_name}</h3>
                              <p className="text-gray-600">{user.email}</p>
                            </div>
                            
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <p className="text-sm text-gray-500">ID Client</p>
                                <p className="font-medium">#{user.id}</p>
                              </div>
                              <div>
                                <p className="text-sm text-gray-500">Date d'inscription</p>
                                <p className="font-medium">
                                  {new Date(user.created_at).toLocaleDateString('fr-FR', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                  })}
                                </p>
                              </div>
                            </div>

                            <div className="flex flex-wrap gap-2">
                              {user.is_admin && (
                                <Badge className="bg-purple-100 text-purple-800 px-3 py-1">
                                  <Settings className="h-3 w-3 mr-1" />
                                  Administrateur
                                </Badge>
                              )}
                              <Badge className={`px-3 py-1 ${user.is_active ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
                                {user.is_active ? (
                                  <>
                                    <svg className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                    Actif
                                  </>
                                ) : (
                                  <>
                                    <svg className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                    Inactif
                                  </>
                                )}
                              </Badge>
                            </div>
                          </div>

                          <div className="flex flex-col items-end space-y-4">
                            <div className="text-right">
                              <p className="text-sm text-gray-500">Commandes</p>
                              <p className="text-xl font-bold">
                                {orders.filter(order => order.user_id === user.id).length}
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="text-sm text-gray-500">Total dépensé</p>
                              <p className="text-xl font-bold text-green-600">
                                {orders
                                  .filter(order => order.user_id === user.id)
                                  .reduce((sum, order) => sum + order.total_price, 0)
                                  .toFixed(2)} €
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Recent Orders Preview */}
                        <div className="mt-6 pt-6 border-t">
                          <h4 className="text-sm font-medium text-gray-500 mb-3">Commandes récentes</h4>
                          <div className="space-y-2">
                            {orders
                              .filter(order => order.user_id === user.id)
                              .slice(0, 3)
                              .map(order => (
                                <div key={order.id} className="flex justify-between items-center text-sm">
                                  <div className="flex items-center space-x-2">
                                    <ShoppingCart className="h-4 w-4 text-gray-400" />
                                    <span>Commande #{order.id}</span>
                                  </div>
                                  <div className="flex items-center space-x-4">
                                    <Badge className={getStatusColor(order.status)}>
                                      {order.status}
                                    </Badge>
                                    <span className="text-gray-600">{order.total_price.toFixed(2)} €</span>
                                    <span className="text-gray-500">{formatDate(order.order_date)}</span>
                                  </div>
                                </div>
                              ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === "pizzas" && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-gray-900">Gestion des Articles</h1>
                <Button 
                  onClick={() => setIsCreatingPizza(true)}
                  className="bg-red-600 hover:bg-red-700"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Nouvelle Pizza
                </Button>
              </div>

              {/* Create/Edit Pizza Form */}
              {(isCreatingPizza || editingPizza) && (
                <Card className="mb-6">
                  <CardHeader>
                    <CardTitle>{editingPizza ? "Modifier la Pizza" : "Nouvelle Pizza"}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={editingPizza ? handleUpdatePizza : handleCreatePizza} className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Nom</label>
                        <Input
                          value={pizzaForm.name}
                          onChange={(e) => setPizzaForm({ ...pizzaForm, name: e.target.value })}
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                        <Textarea
                          value={pizzaForm.description}
                          onChange={(e) => setPizzaForm({ ...pizzaForm, description: e.target.value })}
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Prix (€)</label>
                        <Input
                          type="number"
                          step="0.01"
                          value={pizzaForm.price}
                          onChange={(e) => setPizzaForm({ ...pizzaForm, price: e.target.value })}
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">URL de l'image</label>
                        <Input
                          value={pizzaForm.image_url}
                          onChange={(e) => setPizzaForm({ ...pizzaForm, image_url: e.target.value })}
                          required
                        />
                      </div>
                      <div className="flex justify-end space-x-2">
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => {
                            setIsCreatingPizza(false);
                            setEditingPizza(null);
                            setPizzaForm({ name: "", description: "", price: "", image_url: "" });
                          }}
                        >
                          Annuler
                        </Button>
                        <Button type="submit" className="bg-red-600 hover:bg-red-700">
                          {editingPizza ? "Mettre à jour" : "Créer"}
                        </Button>
                      </div>
                    </form>
                  </CardContent>
                </Card>
              )}

              {/* Pizzas List */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {pizzas.map((pizza) => (
                  <Card key={pizza.id}>
                    <CardContent className="p-6">
                      <div className="aspect-w-16 aspect-h-9 mb-4">
                        <img
                          src={pizza.image_url}
                          alt={pizza.name}
                          className="object-cover rounded-lg w-full h-48"
                        />
                      </div>
                      <h3 className="text-lg font-semibold mb-2">{pizza.name}</h3>
                      <p className="text-gray-600 text-sm mb-4">{pizza.description}</p>
                      <div className="flex justify-between items-center">
                        <span className="text-lg font-bold">{pizza.price.toFixed(2)} €</span>
                        <div className="flex space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              setEditingPizza(pizza);
                              setPizzaForm({
                                name: pizza.name,
                                description: pizza.description,
                                price: pizza.price.toString(),
                                image_url: pizza.image_url,
                              });
                            }}
                          >
                            <Edit2 className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-red-600 hover:text-red-700"
                            onClick={() => setDeleteDialog({
                              isOpen: true,
                              pizzaId: pizza.id,
                              pizzaName: pizza.name,
                            })}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Delete Confirmation Dialog */}
              <ConfirmDialog
                isOpen={deleteDialog.isOpen}
                onClose={() => setDeleteDialog({ isOpen: false, pizzaId: null, pizzaName: "" })}
                onConfirm={() => deleteDialog.pizzaId && handleDeletePizza(deleteDialog.pizzaId)}
                title="Supprimer la pizza"
                description={`Êtes-vous sûr de vouloir supprimer "${deleteDialog.pizzaName}" ? Cette action est irréversible.`}
                confirmText="Supprimer"
                cancelText="Annuler"
              />
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
