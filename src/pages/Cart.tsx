import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { toast } from "@/hooks/use-toast";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Cart = () => {
  const { cartItems, updateQuantity, removeFromCart, clearCart, getTotalPrice } = useCart();

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      toast({
        title: "Panier vide",
        description: "Veuillez ajouter des articles à votre panier avant de passer commande.",
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: "Commande Passée !",
      description: "Votre commande a été soumise avec succès.",
    });
    clearCart();
  };

  if (cartItems.length === 0) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-gray-50 py-16">
          <div className="container mx-auto px-4">
            <div className="text-center">
              <ShoppingBag className="h-16 w-16 mx-auto text-gray-400 mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Votre Panier est Vide</h2>
              <p className="text-gray-600 mb-8">
                Ajoutez des articles à votre panier avant de passer à la caisse.
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
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Votre Panier</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {cartItems.map((item) => (
                      <div key={item.id} className="flex items-center gap-4 py-4 border-b last:border-0">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-20 h-20 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <h3 className="font-medium">{item.name}</h3>
                          <p className="text-sm text-gray-500">{item.description}</p>
                          <div className="flex items-center gap-2 mt-2">
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() => updateQuantity(item.id, Math.max(0, item.quantity - 1))}
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
                        </div>
                        <div className="text-right">
                          <p className="font-medium">{item.price}</p>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => removeFromCart(item.id)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="h-4 w-4" />
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
                  <CardTitle>Récapitulatif de la Commande</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span>Sous-total</span>
                      <span>{getTotalPrice().toFixed(2)} €</span>
                    </div>
                    <div className="flex justify-between">
                      <span>TVA (20%)</span>
                      <span>{(getTotalPrice() * 0.2).toFixed(2)} €</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Livraison</span>
                      <span>2.99 €</span>
                    </div>
                    <div className="border-t pt-4">
                      <div className="flex justify-between font-bold">
                        <span>Total</span>
                        <span>{(getTotalPrice() * 1.2 + 2.99).toFixed(2)} €</span>
                      </div>
                    </div>
                    <Button 
                      onClick={handleCheckout}
                      className="w-full bg-red-600 hover:bg-red-700"
                    >
                      Passer la Commande
                    </Button>
                    <Button 
                      onClick={clearCart}
                      variant="outline" 
                      className="w-full"
                    >
                      Vider le Panier
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
