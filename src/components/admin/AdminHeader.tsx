import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Package, Users, Pizza, ShoppingCart } from "lucide-react";

const AdminHeader = () => {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between">
        <Link to="/" className="inline-flex items-center text-red-600 hover:text-red-700">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Retour à l'Accueil
        </Link>
        <h1 className="text-3xl font-bold text-gray-900">Tableau de Bord Admin</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-red-100 text-red-600">
              <Package className="h-6 w-6" />
            </div>
            <div className="ml-4">
              <h2 className="text-sm font-medium text-gray-600">Commandes</h2>
              <p className="text-2xl font-semibold text-gray-900">Gestion des commandes</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-red-100 text-red-600">
              <Users className="h-6 w-6" />
            </div>
            <div className="ml-4">
              <h2 className="text-sm font-medium text-gray-600">Utilisateurs</h2>
              <p className="text-2xl font-semibold text-gray-900">Gestion des utilisateurs</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-red-100 text-red-600">
              <Pizza className="h-6 w-6" />
            </div>
            <div className="ml-4">
              <h2 className="text-sm font-medium text-gray-600">Pizzas</h2>
              <p className="text-2xl font-semibold text-gray-900">Gestion du menu</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminHeader; 