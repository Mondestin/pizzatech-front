import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Minus, Plus, Trash2 } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { toast } from "@/hooks/use-toast";

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
      <div className="min-h-screen bg-gray-50">
        <div className="bg-white shadow-sm">
          <div className="container mx-auto px-4 lg:px-6 h-16 flex items-center">
            <Link to="/" className="flex items-center space-x-2 text-gray-700 hover:text-red-600">
              <ArrowLeft className="h-5 w-5" />
              <span>Retour à l'Accueil</span>
            </Link>
          </div>
        </div>
        
        <div className="container mx-auto px-4 lg:px-6 py-16 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Votre Panier est Vide</h1>
          <p className="text-gray-600 mb-8">Ajoutez quelques délicieux articles pour commencer !</p>
          <Link to="/menu">
            <Button className="bg-red-600 hover:bg-red-700">
              Voir le Menu
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-4 lg:px-6 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2 text-gray-700 hover:text-red-600">
            <ArrowLeft className="h-5 w-5" />
            <span>Retour à l'Accueil</span>
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">Votre Commande</h1>
          <div></div>
        </div>
      </div>

      <div className="container mx-auto px-4 lg:px-6 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Articles du Panier</h2>
              <Button 
                variant="outline" 
                onClick={clearCart}
                className="text-red-600 border-red-600 hover:bg-red-50"
              >
                Vider le Panier
              </Button>
            </div>
            
            {cartItems.map((item) => (
              <Card key={item.id}>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4">
                    <img 
                      src={item.image} 
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg">{item.name}</h3>
                      <p className="text-gray-600 text-sm">{item.description}</p>
                      <p className="text-red-600 font-bold">{item.price}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="h-8 w-8"
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span className="text-lg font-medium w-8 text-center">{item.quantity}</span>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="h-8 w-8"
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => removeFromCart(item.id)}
                        className="h-8 w-8 text-red-600 hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle>Récapitulatif de la Commande</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <span>{item.name} × {item.quantity}</span>
                      <span>{(parseFloat(item.price.replace('€', '')) * item.quantity).toFixed(2)} €</span>
                    </div>
                  ))}
                </div>
                
                <div className="border-t pt-4">
                  <div className="flex justify-between text-sm">
                    <span>Sous-total</span>
                    <span>{getTotalPrice().toFixed(2)} €</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>TVA</span>
                    <span>{(getTotalPrice() * 0.20).toFixed(2)} €</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Livraison</span>
                    <span>3,99 €</span>
                  </div>
                </div>
                
                <div className="border-t pt-4">
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span>{(getTotalPrice() + (getTotalPrice() * 0.20) + 3.99).toFixed(2)} €</span>
                  </div>
                </div>
                
                <Button 
                  onClick={handleCheckout}
                  className="w-full bg-red-600 hover:bg-red-700 mt-6"
                >
                  Passer la Commande
                </Button>
                
                <Link to="/menu" className="block">
                  <Button variant="outline" className="w-full">
                    Continuer les Achats
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
