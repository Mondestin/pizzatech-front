import { Pizza, MapPin, Phone, Clock } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4 lg:px-6">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <Pizza className="h-8 w-8 text-red-500" />
              <span className="text-2xl font-bold">Bella Pizza Paris</span>
            </div>
            <p className="text-gray-400 mb-4 max-w-md">
              Pizzas italiennes authentiques préparées avec amour et les meilleurs ingrédients. 
              Au service de notre communauté depuis 1985 avec des recettes traditionnelles et une qualité moderne.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Liens Rapides</h4>
            <ul className="space-y-2">
              <li><a href="#home" className="text-gray-400 hover:text-white transition-colors">Accueil</a></li>
              <li><a href="#about" className="text-gray-400 hover:text-white transition-colors">À Propos</a></li>
              <li><a href="#menu" className="text-gray-400 hover:text-white transition-colors">Menu</a></li>
              <li><a href="#contact" className="text-gray-400 hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Informations</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <MapPin className="h-5 w-5 text-red-500" />
                <span className="text-gray-400 text-sm">123 Rue de la Pizza, 75001 Paris</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-red-500" />
                <span className="text-gray-400 text-sm">01 23 45 67 89</span>
              </div>
              <div className="flex items-center space-x-3">
                <Clock className="h-5 w-5 text-red-500" />
                <span className="text-gray-400 text-sm">Lun-Dim: 11h-22h</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            © 2024 Bella Pizza Paris. Tous droits réservés. Fait avec ❤️ pour les amateurs de pizza.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
