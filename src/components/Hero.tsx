import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-orange-50">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')] bg-cover bg-center opacity-10"></div>
      
      <div className="relative z-10 container mx-auto px-4 lg:px-6 text-center">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6">
          Authentique Pizza
          <span className="block text-red-600">Italienne à Paris</span>
        </h1>
        
        <p className="text-lg md:text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
          Pizzas artisanales préparées avec les meilleurs ingrédients, cuites à la perfection dans notre four traditionnel à bois.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" className="bg-red-600 hover:bg-red-700 text-lg px-8">
            Voir le Menu
          </Button>
          <Button size="lg" variant="outline" className="text-lg px-8 border-red-600 text-red-600 hover:bg-red-600 hover:text-white">
            Commander en Ligne
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
