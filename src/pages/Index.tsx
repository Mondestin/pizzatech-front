import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Pizza, Clock, Star, Truck } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Menu from "@/components/Menu";

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center">
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/50 z-10" />
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ 
            backgroundImage: "url('https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=2070')",
          }}
        />
        <div className="container mx-auto px-4 relative z-20">
          <div className="max-w-2xl text-white">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Découvrez l'Art de la Pizza
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-200">
              Des pizzas artisanales préparées avec passion et des ingrédients de qualité supérieure.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/menu">
                <Button size="lg" className="bg-red-600 hover:bg-red-700 text-lg px-8">
                  Commander Maintenant
                </Button>
              </Link>
              <Link to="/#about">
                <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10 text-lg px-8">
                  En Savoir Plus
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <Clock className="h-12 w-12 text-red-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Livraison Rapide</h3>
              <p className="text-gray-600">
                Livraison en moins de 30 minutes dans tout Paris
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <Star className="h-12 w-12 text-red-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Ingrédients Premium</h3>
              <p className="text-gray-600">
                Des ingrédients frais et de qualité sélectionnés avec soin
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <Truck className="h-12 w-12 text-red-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Service 24/7</h3>
              <p className="text-gray-600">
                Commandez à tout moment, nous sommes là pour vous servir
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Menu Preview Section */}
      <Menu />

      {/* About Section */}
      <section id="about" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6">Notre Histoire</h2>
              <p className="text-gray-600 mb-6">
                Depuis plus de 10 ans, nous nous efforçons de créer les meilleures pizzas artisanales de Paris. 
                Notre passion pour la cuisine italienne authentique se reflète dans chaque pizza que nous préparons.
              </p>
              <p className="text-gray-600 mb-8">
                Nous sélectionnons uniquement les meilleurs ingrédients locaux et importés pour garantir 
                une expérience culinaire exceptionnelle à chaque bouchée.
              </p>
              <Link to="/menu">
                <Button className="bg-red-600 hover:bg-red-700">
                  Découvrir Notre Menu
                </Button>
              </Link>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-lg overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=1981"
                  alt="Pizza artisanale"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-lg shadow-lg">
                <div className="flex items-center gap-2">
                  <Pizza className="h-8 w-8 text-red-600" />
                  <div>
                    <p className="font-semibold">Pizzas Artisanales</p>
                    <p className="text-sm text-gray-600">Faites à la main</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6">Contactez-nous</h2>
            <p className="text-gray-600 mb-8">
              Une question ? Une suggestion ? N'hésitez pas à nous contacter !
            </p>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="font-semibold mb-2">Adresse</h3>
                <p className="text-gray-600">123 Rue de la Pizza, 75001 Paris</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="font-semibold mb-2">Téléphone</h3>
                <p className="text-gray-600">01 23 45 67 89</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
