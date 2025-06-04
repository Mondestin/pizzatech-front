import { Link } from "react-router-dom";
import { Pizza, Facebook, Instagram, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center space-x-2">
              <Pizza className="h-8 w-8 text-red-500" />
              <span className="text-xl font-bold text-white">PizzaTech</span>
            </Link>
            <p className="text-sm">
              Des pizzas artisanales préparées avec passion et des ingrédients de qualité supérieure.
            </p>
            <div className="flex space-x-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-red-500 transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-red-500 transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-red-500 transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Liens Rapides</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="hover:text-red-500 transition-colors">Accueil</Link>
              </li>
              <li>
                <Link to="/menu" className="hover:text-red-500 transition-colors">Menu</Link>
              </li>
              <li>
                <Link to="/#about" className="hover:text-red-500 transition-colors">À propos</Link>
              </li>
              <li>
                <Link to="/#contact" className="hover:text-red-500 transition-colors">Contact</Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-semibold mb-4">Contact</h3>
            <ul className="space-y-2">
              <li>123 Rue de la Pizza</li>
              <li>75001 Paris, France</li>
              <li>Tél: 01 23 45 67 89</li>
              <li>Email: contact@pizzatech.fr</li>
            </ul>
          </div>

          {/* Opening Hours */}
          <div>
            <h3 className="text-white font-semibold mb-4">Horaires d'Ouverture</h3>
            <ul className="space-y-2">
              <li className="flex justify-between">
                <span>Lun - Ven:</span>
                <span>11h00 - 23h00</span>
              </li>
              <li className="flex justify-between">
                <span>Samedi:</span>
                <span>11h00 - 00h00</span>
              </li>
              <li className="flex justify-between">
                <span>Dimanche:</span>
                <span>11h00 - 00h00</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm">
              © {new Date().getFullYear()} PizzaTech. Tous droits réservés.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link to="/privacy" className="text-sm hover:text-red-500 transition-colors">
                Politique de Confidentialité
              </Link>
              <Link to="/terms" className="text-sm hover:text-red-500 transition-colors">
                Conditions d'Utilisation
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
