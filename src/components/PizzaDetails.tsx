
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { X, Clock, Users } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { toast } from "@/hooks/use-toast";

interface PizzaDetailsProps {
  pizza: {
    id: number;
    name: string;
    description: string;
    price: string;
    image: string;
    category: string;
    ingredients?: string[];
    preparationTime?: string;
    servings?: string;
    calories?: string;
    allergens?: string[];
  };
  onClose: () => void;
}

const PizzaDetails = ({ pizza, onClose }: PizzaDetailsProps) => {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(pizza);
    toast({
      title: "Added to Cart",
      description: `${pizza.name} has been added to your cart.`,
    });
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <Card className="max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <CardHeader className="relative">
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-2 top-2"
            onClick={onClose}
          >
            <X className="h-4 w-4" />
          </Button>
          <div className="aspect-video overflow-hidden rounded-lg">
            <img 
              src={pizza.image}
              alt={pizza.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex justify-between items-start mt-4">
            <CardTitle className="text-2xl">{pizza.name}</CardTitle>
            <span className="text-2xl font-bold text-red-600">{pizza.price}</span>
          </div>
          <Badge variant="secondary" className="w-fit capitalize">
            {pizza.category}
          </Badge>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-gray-600">{pizza.description}</p>
          
          {pizza.ingredients && (
            <div>
              <h3 className="font-semibold text-lg mb-2">Ingredients</h3>
              <div className="flex flex-wrap gap-2">
                {pizza.ingredients.map((ingredient, index) => (
                  <Badge key={index} variant="outline">
                    {ingredient}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
            {pizza.preparationTime && (
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4 text-gray-500" />
                <span>{pizza.preparationTime}</span>
              </div>
            )}
            {pizza.servings && (
              <div className="flex items-center space-x-2">
                <Users className="h-4 w-4 text-gray-500" />
                <span>{pizza.servings}</span>
              </div>
            )}
            {pizza.calories && (
              <div className="text-gray-600">
                <span className="font-medium">{pizza.calories}</span> calories
              </div>
            )}
          </div>

          {pizza.allergens && (
            <div>
              <h3 className="font-semibold text-lg mb-2">Allergens</h3>
              <div className="flex flex-wrap gap-2">
                {pizza.allergens.map((allergen, index) => (
                  <Badge key={index} variant="destructive">
                    {allergen}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          <Button 
            onClick={handleAddToCart}
            className="w-full bg-red-600 hover:bg-red-700"
            size="lg"
          >
            Add to Cart - {pizza.price}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default PizzaDetails;
