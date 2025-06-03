import { Card, CardContent } from "@/components/ui/card";
import { Clock, MapPin, Pizza } from "lucide-react";

const About = () => {
  const features = [
    {
      icon: Pizza,
      title: "Ingrédients Frais",
      description: "Nous utilisons uniquement les meilleurs ingrédients locaux pour un goût authentique."
    },
    {
      icon: Clock,
      title: "Service Rapide",
      description: "Préparation rapide sans compromettre la qualité et le goût."
    },
    {
      icon: MapPin,
      title: "Emplacement Idéal",
      description: "Situé au cœur de Paris pour un accès facile."
    }
  ];

  return (
    <section id="about" className="py-16 lg:py-24 bg-white">
      <div className="container mx-auto px-4 lg:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            À Propos de Bella Pizza
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Depuis 1985, nous servons des pizzas italiennes authentiques préparées selon des recettes traditionnelles transmises de génération en génération. Notre engagement envers la qualité et les saveurs authentiques a fait de nous un favori local.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
              Notre Histoire
            </h3>
            <p className="text-gray-600 mb-4">
              Fondée par la famille Rossi, Bella Pizza a commencé comme une petite pizzeria de quartier avec un grand rêve : apporter les saveurs authentiques italiennes à notre communauté parisienne. Aujourd'hui, nous perpétuons cette tradition avec la même passion et le même dévouement.
            </p>
            <p className="text-gray-600">
              Chaque pizza est étirée à la main et garnie d'ingrédients premium, puis cuite dans notre four à bois signature pour obtenir cette combinaison parfaite de croûte croustillante et de fromage fondu qui fait revenir nos clients.
            </p>
          </div>
          <div className="relative">
            <img 
              src="https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
              alt="Four à bois pour pizza"
              className="rounded-lg shadow-lg w-full"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <feature.icon className="h-12 w-12 text-red-600 mx-auto mb-4" />
                <h4 className="text-xl font-bold text-gray-900 mb-2">
                  {feature.title}
                </h4>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
