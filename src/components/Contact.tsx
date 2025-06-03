import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Phone, Clock } from "lucide-react";

const Contact = () => {
  const contactInfo = [
    {
      icon: MapPin,
      title: "Adresse",
      details: ["123 Rue de la Pizza", "75001 Paris"]
    },
    {
      icon: Phone,
      title: "Téléphone",
      details: ["01 23 45 67 89", "06 12 34 56 78"]
    },
    {
      icon: Clock,
      title: "Horaires",
      details: ["Lun-Jeu: 11h-22h", "Ven-Dim: 11h-23h"]
    }
  ];

  return (
    <section id="contact" className="py-16 lg:py-24 bg-white">
      <div className="container mx-auto px-4 lg:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Venez Nous Visiter
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Venez découvrir le goût authentique de l'Italie au cœur de Paris. Nous sommes là pour vous servir les meilleures pizzas de la ville.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {contactInfo.map((info, index) => (
            <Card key={index} className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <info.icon className="h-12 w-12 text-red-600 mx-auto mb-4" />
                <CardTitle className="text-xl">{info.title}</CardTitle>
              </CardHeader>
              <CardContent>
                {info.details.map((detail, i) => (
                  <p key={i} className="text-gray-600">{detail}</p>
                ))}
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="bg-gray-50 rounded-lg p-8 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Prêt à Commander ?
          </h3>
          <p className="text-gray-600 mb-6">
            Appelez-nous maintenant ou visitez notre restaurant pour une expérience pizza fraîche.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-red-600 hover:bg-red-700">
              Appeler
            </Button>
            <Button size="lg" variant="outline" className="border-red-600 text-red-600 hover:bg-red-600 hover:text-white">
              Itinéraire
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
