import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Pizza } from "@/services/adminService";
import { Plus, Pencil } from "lucide-react";

interface PizzaFormProps {
  pizza?: Pizza;
  onSubmit: (data: Omit<Pizza, 'id'>) => Promise<void>;
  mode: 'create' | 'edit';
}

const PizzaForm = ({ pizza, onSubmit, mode }: PizzaFormProps) => {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: pizza?.name || '',
    description: pizza?.description || '',
    price: pizza?.price || 0,
    image_url: pizza?.image_url || '',
    toppings: pizza?.toppings || []
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await onSubmit(formData);
      setOpen(false);
    } catch (error) {
      console.error('Error submitting pizza:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className={mode === 'create' ? "bg-red-600 hover:bg-red-700" : "bg-blue-600 hover:bg-blue-700"}>
          {mode === 'create' ? (
            <>
              <Plus className="h-4 w-4 mr-2" />
              Ajouter une Pizza
            </>
          ) : (
            <>
              <Pencil className="h-4 w-4 mr-2" />
              Modifier
            </>
          )}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{mode === 'create' ? 'Ajouter une Pizza' : 'Modifier la Pizza'}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nom</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="price">Prix (€)</Label>
            <Input
              id="price"
              type="number"
              step="0.01"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="image_url">URL de l'image</Label>
            <Input
              id="image_url"
              value={formData.image_url}
              onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
              required
            />
          </div>
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? 'Enregistrement...' : mode === 'create' ? 'Ajouter' : 'Modifier'}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default PizzaForm; 