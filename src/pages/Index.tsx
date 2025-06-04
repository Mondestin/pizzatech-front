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
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-6">Contactez-nous</h2>
              <p className="text-gray-600">
                Une question ? Une suggestion ? N'hésitez pas à nous contacter !
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-12">
              {/* Contact Info */}
              <div className="space-y-8">
                <div className="bg-white p-8 rounded-lg shadow-sm">
                  <h3 className="text-xl font-semibold mb-6">Informations de Contact</h3>
                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="bg-red-50 p-3 rounded-full">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-medium mb-1">Adresse</h4>
                        <p className="text-gray-600">123 Rue de la Pizza, 75001 Paris</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="bg-red-50 p-3 rounded-full">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-medium mb-1">Téléphone</h4>
                        <p className="text-gray-600">01 23 45 67 89</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="bg-red-50 p-3 rounded-full">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-medium mb-1">Email</h4>
                        <p className="text-gray-600">contact@pizzatech.fr</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white p-8 rounded-lg shadow-sm">
                  <h3 className="text-xl font-semibold mb-6">Horaires d'Ouverture</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Lundi - Vendredi</span>
                      <span className="font-medium">11h00 - 23h00</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Samedi - Dimanche</span>
                      <span className="font-medium">11h00 - 00h00</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Map */}
              <div className="h-[600px] rounded-lg overflow-hidden shadow-sm">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2624.9916256937595!2d2.292292615509614!3d48.85837007928757!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e66e2964e34e2d%3A0x8ddca9ee380ef7e0!2sTour%20Eiffel!5e0!3m2!1sfr!2sfr!4v1647874586701!5m2!1sfr!2sfr"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
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
