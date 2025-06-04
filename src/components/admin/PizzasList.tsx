import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Pizza } from "@/services/adminService";
import { Pizza as PizzaIcon, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import PizzaForm from "./PizzaForm";
import { toast } from "@/components/ui/use-toast";
import { createPizza, updatePizza, deletePizza } from "@/services/adminService";

interface PizzasListProps {
  pizzas: Pizza[];
  onPizzasChange: () => void;
}

const PizzasList = ({ pizzas, onPizzasChange }: PizzasListProps) => {
  const [isDeleting, setIsDeleting] = useState<number | null>(null);

  const handleCreatePizza = async (data: Omit<Pizza, 'id'>) => {
    try {
      await createPizza(data);
      toast({
        title: "Succès",
        description: "La pizza a été ajoutée avec succès.",
      });
      onPizzasChange();
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de l'ajout de la pizza.",
        variant: "destructive",
      });
    }
  };

  const handleUpdatePizza = async (pizzaId: number, data: Partial<Pizza>) => {
    try {
      await updatePizza(pizzaId, data);
      toast({
        title: "Succès",
        description: "La pizza a été mise à jour avec succès.",
      });
      onPizzasChange();
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la mise à jour de la pizza.",
        variant: "destructive",
      });
    }
  };

  const handleDeletePizza = async (pizzaId: number) => {
    if (!confirm("Êtes-vous sûr de vouloir supprimer cette pizza ?")) return;
    
    setIsDeleting(pizzaId);
    try {
      await deletePizza(pizzaId);
      toast({
        title: "Succès",
        description: "La pizza a été supprimée avec succès.",
      });
      onPizzasChange();
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la suppression de la pizza.",
        variant: "destructive",
      });
    } finally {
      setIsDeleting(null);
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-xl font-bold">Menu des Pizzas</CardTitle>
        <PizzaForm onSubmit={handleCreatePizza} mode="create" />
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {pizzas.map((pizza) => (
            <div key={pizza.id} className="bg-white rounded-lg border p-4">
              <div className="relative aspect-square w-full mb-4 overflow-hidden rounded-lg">
                <img
                  src={pizza.image_url}
                  alt={pizza.name}
                  className="object-cover w-full h-full"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = 'https://placehold.co/400x400?text=Pizza';
                  }}
                />
              </div>
              <div className="flex items-center space-x-3 mb-3">
                <div className="p-2 rounded-full bg-red-100">
                  <PizzaIcon className="h-5 w-5 text-red-600" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">{pizza.name}</h3>
                  <p className="text-sm text-gray-500">{pizza.description}</p>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-lg font-bold text-gray-900">{pizza.price.toFixed(2)} €</p>
                <Badge className="bg-green-100 text-green-800">
                  {pizza.toppings?.length || 0} ingrédients
                </Badge>
              </div>
              <div className="mt-4 flex justify-end space-x-2">
                <PizzaForm 
                  pizza={pizza} 
                  onSubmit={(data) => handleUpdatePizza(pizza.id, data)} 
                  mode="edit" 
                />
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleDeletePizza(pizza.id)}
                  disabled={isDeleting === pizza.id}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default PizzasList; 