import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import { toast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";
import { getPizzas, Pizza } from "@/services/pizzaService";
import { Loader2, Plus, Info } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const Menu = () => {
  const { addToCart } = useCart();
  const [pizzas, setPizzas] = useState<Pizza[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedPizza, setSelectedPizza] = useState<Pizza | null>(null);

  useEffect(() => {
    const fetchPizzas = async () => {
      try {
        const data = await getPizzas();
        setPizzas(data);
        setError(null);
      } catch (err) {
        setError("Erreur lors du chargement du menu. Veuillez réessayer plus tard.");
        console.error("Error fetching pizzas:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPizzas();
  }, []);

  const handleAddToCart = (pizza: Pizza) => {
    // Convert API pizza format to cart item format
    const cartItem = {
      id: pizza.id,
      name: pizza.name,
      description: pizza.description,
      price: pizza.price,
      image: pizza.image_url,
      quantity: 1
    };

    addToCart(cartItem);
    toast({
      title: "Ajouté au Panier",
      description: `${pizza.name} a été ajouté à votre panier.`,
    });
  };

  if (loading) {
    return (
      <section id="menu" className="py-16 lg:py-24 bg-gray-50">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="text-center">
            <Loader2 className="h-8 w-8 animate-spin mx-auto text-red-600" />
            <p className="mt-4 text-gray-600">Chargement du menu...</p>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="menu" className="py-16 lg:py-24 bg-gray-50">
        <div className="container mx-auto px-4 lg:px-6">
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
      </section>
    );
  }

  return (
    <section id="menu" className="py-16 lg:py-24 bg-gray-50">
      <div className="container mx-auto px-4 lg:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Notre Menu
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Découvrez notre sélection de pizzas artisanales, chacune préparée avec des ingrédients premium et cuite à la perfection.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {pizzas.map((pizza) => (
            <Card key={pizza.id} className="hover:shadow-lg transition-shadow">
              <div className="aspect-square overflow-hidden rounded-t-lg">
                <img 
                  src={pizza.image_url}
                  alt={pizza.name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg">{pizza.name}</CardTitle>
                  <span className="text-xl font-bold text-red-600">{pizza.price.toFixed(2)} €</span>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">{pizza.description}</p>
                <div className="space-y-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" className="w-full">
                        <Info className="h-4 w-4 mr-2" />
                        Voir les Ingrédients
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>{pizza.name}</DialogTitle>
                        <DialogDescription>
                          Ingrédients inclus dans cette pizza
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid grid-cols-2 gap-2">
                        {pizza.toppings?.map((topping) => (
                          <div key={topping.id} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                            <span>{topping.name}</span>
                            <span className="text-sm text-gray-500">+{topping.price.toFixed(2)} €</span>
                          </div>
                        ))}
                      </div>
                    </DialogContent>
                  </Dialog>
                  <Button 
                    onClick={() => handleAddToCart(pizza)}
                    className="w-full bg-red-600 hover:bg-red-700"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Ajouter au Panier
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link to="/menu">
            <Button size="lg" variant="outline" className="border-red-600 text-red-600 hover:bg-red-600 hover:text-white">
              Voir le Menu Complet
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Menu;
