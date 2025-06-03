import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Pizza, ShoppingCart, LogOut } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { getItemCount } = useCart();
  const { isAuthenticated, logout } = useAuth();

  // Navigation items in French
  const navItems = [
    { name: "Accueil", href: "/" },
    { name: "Menu", href: "/menu" },
    { name: "À propos", href: "/#about" },
    { name: "Contact", href: "/#contact" },
  ];

  return (
    <header className="fixed top-0 w-full bg-white/95 backdrop-blur-sm shadow-sm z-50">
      <div className="container mx-auto px-4 lg:px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <Pizza className="h-8 w-8 text-red-600" />
          <span className="text-2xl font-bold text-gray-900">Bella Pizza Paris</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className="text-gray-700 hover:text-red-600 transition-colors font-medium"
            >
              {item.name}
            </Link>
          ))}
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <Link to="/orders" className="text-gray-700 hover:text-red-600">
                  Mes Commandes
                </Link>
                <Button
                  variant="ghost"
                  onClick={logout}
                  className="text-gray-700 hover:text-red-600"
                >
                  <LogOut className="h-5 w-5 mr-2" />
                  Déconnexion
                </Button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-gray-700 hover:text-red-600">
                  Connexion
                </Link>
                <Link to="/register" className="text-gray-700 hover:text-red-600">
                  Inscription
                </Link>
              </>
            )}
            <Link to="/cart">
              <Button variant="ghost" className="text-gray-700 hover:text-red-600 relative">
                <ShoppingCart className="h-5 w-5" />
                {getItemCount() > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {getItemCount()}
                  </span>
                )}
              </Button>
            </Link>
          </div>
        </nav>

        {/* Mobile Navigation */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px]">
            <div className="flex flex-col space-y-6 mt-8">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className="text-lg font-medium text-gray-700 hover:text-red-600 transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="flex flex-col space-y-4">
                {isAuthenticated ? (
                  <>
                    <Link to="/orders" onClick={() => setIsOpen(false)}>
                      <Button variant="ghost" className="w-full text-gray-700 hover:text-red-600 justify-start">
                        Mes Commandes
                      </Button>
                    </Link>
                    <Button
                      variant="ghost"
                      onClick={logout}
                      className="w-full text-gray-700 hover:text-red-600 justify-start"
                    >
                      <LogOut className="h-5 w-5 mr-2" />
                      Déconnexion
                    </Button>
                  </>
                ) : (
                  <>
                    <Link to="/login" onClick={() => setIsOpen(false)}>
                      <Button variant="ghost" className="w-full text-gray-700 hover:text-red-600">
                        Connexion
                      </Button>
                    </Link>
                    <Link to="/register" onClick={() => setIsOpen(false)}>
                      <Button className="bg-red-600 hover:bg-red-700 w-full">
                        Inscription
                      </Button>
                    </Link>
                  </>
                )}
                <Link to="/cart" onClick={() => setIsOpen(false)}>
                  <Button variant="ghost" className="w-full text-gray-700 hover:text-red-600 justify-start relative">
                    <ShoppingCart className="h-5 w-5 mr-2" />
                    Panier
                    {getItemCount() > 0 && (
                      <span className="ml-2 bg-red-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                        {getItemCount()}
                      </span>
                    )}
                  </Button>
                </Link>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};

export default Header;
