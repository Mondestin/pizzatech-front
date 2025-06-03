import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import { createOrder } from "@/services/orderService";
import { toast } from "@/components/ui/use-toast";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Cart = () => {
  const navigate = useNavigate();
  const { cartItems, removeFromCart, updateQuantity, getTotalPrice, clearCart } = useCart();
  const { isAuthenticated } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const handleCheckout = async () => {
    if (!isAuthenticated) {
      toast({
        title: "Connexion requise",
        description: "Veuillez vous connecter pour passer commande.",
        variant: "destructive",
      });
      navigate("/login");
      return;
    }

    try {
      setIsLoading(true);
      console.log('Starting checkout process with cart items:', cartItems);

      const orderData = {
        status: "pending",
        total_price: getTotalPrice(),
        order_date: new Date().toLocaleString('fr-FR', { timeZone: 'Europe/Paris' }),
        items: cartItems.map(item => ({
          pizza_id: item.id,
          quantity: item.quantity,
          price: Number(item.price)
        }))
      };

      console.log('Prepared order data:', {
        status: orderData.status,
        total_price: orderData.total_price,
        items_count: orderData.items.length,
        items: orderData.items
      });

      const order = await createOrder(orderData);
      console.log('Order created:', order);

      clearCart();
      toast({
        title: "Commande réussie",
        description: "Votre commande a été enregistrée avec succès.",
      });
      navigate("/orders");
    } catch (error) {
      console.error('Checkout failed:', error);
      toast({
        title: "Erreur",
        description: error instanceof Error ? error.message : "Une erreur est survenue lors de la commande",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (cartItems.length === 0) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-gray-50 py-16">
          <div className="container mx-auto px-4">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Votre Panier est Vide</h2>
              <p className="text-gray-600 mb-8">
                Ajoutez des pizzas à votre panier pour commencer votre commande.
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
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Votre Panier</h1>
          
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Articles</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {cartItems.map((item) => (
                      <div key={item.id} className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-20 h-20 object-cover rounded-lg"
                          />
                          <div>
                            <h3 className="font-medium">{item.name}</h3>
                            <p className="text-gray-500">{Number(item.price).toFixed(2)} €</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center space-x-2">
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              disabled={item.quantity <= 1}
                            >
                              <Minus className="h-4 w-4" />
                            </Button>
                            <span className="w-8 text-center">{item.quantity}</span>
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            >
                              <Plus className="h-4 w-4" />
                            </Button>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => removeFromCart(item.id)}
                          >
                            <Trash2 className="h-4 w-4 text-red-600" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Order Summary */}
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Récapitulatif</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Sous-total</span>
                      <span className="font-medium">{getTotalPrice().toFixed(2)} €</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Livraison</span>
                      <span className="font-medium">Gratuite</span>
                    </div>
                    <div className="border-t pt-4">
                      <div className="flex justify-between">
                        <span className="font-bold">Total</span>
                        <span className="font-bold">{getTotalPrice().toFixed(2)} €</span>
                      </div>
                    </div>
                    <Button
                      className="w-full bg-red-600 hover:bg-red-700"
                      onClick={handleCheckout}
                      disabled={isLoading}
                    >
                      {isLoading ? "Traitement..." : "Commander"}
                    </Button>
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

export default Cart;
