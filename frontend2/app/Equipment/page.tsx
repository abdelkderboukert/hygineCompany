import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Shield, ArrowRight } from "lucide-react";
import { Header } from "@/components/Header";

// Sample Equipment sectors data with different themes
const EquipmentSectors = [
  {
    id: "z6Qj0cQ0RnCkugc4aS9d",
    name: "Hygiène des personnes",
    description:
      "Équipements préservant la propreté et la sécurité individuelles, tels que les distributeurs de savon, les gels hydro-alcooliques et autres articles de protection individuelle",
    image: "/placeholder.svg?height=300&width=400",
    activators: [
      "distributeurs de savon",
      "désinfectants",
      "EPI",
      "soins des mains",
    ],
    theme: {
      gradient: "from-pink-500 to-pink-700",
      bgColor: "bg-pink-50",
      iconColor: "text-pink-600",
      borderColor: "border-pink-200",
      hoverColor: "hover:bg-pink-600",
    },
  },
  {
    id: "ghA4zwh1vNBnyEzpQvRr",
    name: "Essuyage et séchage des mains",
    description:
      "Solutions rapides et hygiéniques pour le séchage des mains : distributeurs de papier essuie-tout, sèche-mains électriques, rouleaux d'essuyage et accessoires associés",
    image: "/placeholder.svg?height=300&width=400",
    activators: [
      "distributeurs de papier essuie-tout",
      "sèche-mains",
      "rouleaux d'essuyage",
    ],
    theme: {
      gradient: "from-yellow-500 to-yellow-700",
      bgColor: "bg-yellow-50",
      iconColor: "text-yellow-600",
      borderColor: "border-yellow-200",
      hoverColor: "hover:bg-yellow-600",
    },
  },
  {
    id: "muPwFNBOLnvi24ESXNHN",
    name: "Hygiène des sanitaires",
    description:
      "Équipements pour le nettoyage et la désinfection des toilettes et des lavabos : distributeurs de papier toilette, brosses, supports muraux, désodorisants et poubelles",
    image: "/placeholder.svg?height=300&width=400",
    activators: [
      "distributeurs de papier toilette",
      "brosses de toilettes",
      "désodorisants",
      "poubelles",
    ],
    theme: {
      gradient: "from-teal-500 to-teal-700",
      bgColor: "bg-teal-50",
      iconColor: "text-teal-600",
      borderColor: "border-teal-200",
      hoverColor: "hover:bg-teal-600",
    },
  },
  {
    id: "vK8j23X85Vk8NsmEq4uJ",
    name: "Hygiène et entretien des sols",
    description:
      "Produits et machines professionnels pour l'entretien des sols : autolaveuses, balais professionnels, chariots de nettoyage, raclettes, seaux, serpillères et détergents",
    image: "/placeholder.svg?height=300&width=400",
    activators: [
      "autolaveuses",
      "serpillères",
      "balais",
      "détergents pour sols",
    ],
    theme: {
      gradient: "from-green-500 to-green-700",
      bgColor: "bg-green-50",
      iconColor: "text-green-600",
      borderColor: "border-green-200",
      hoverColor: "hover:bg-green-600",
    },
  },
  {
    id: "1UTT1vN4pUY4sSTBwwWA",
    name: "Divers équipements",
    description:
      "Une large sélection d'outils complémentaires pour garder n'importe quel environnement propre et organisé",
    image: "/placeholder.svg?height=300&width=400",
    activators: ["outils utilitaires", "organisateurs", "aides au rangement"],
    theme: {
      gradient: "from-gray-500 to-gray-700",
      bgColor: "bg-gray-50",
      iconColor: "text-gray-600",
      borderColor: "border-gray-200",
      hoverColor: "hover:bg-gray-600",
    },
  },
  {
    id: "rMkhCqG7dO9muzuFuQeQ",
    name: "Cireuse à chaussures",
    description:
      "Machines automatiques qui nettoient et polissent les chaussures – parfaites pour les bureaux, les hôtels et les lieux publics",
    image: "/placeholder.svg?height=300&width=400",
    activators: ["cireuses à chaussures", "lustrage", "brillance"],
    theme: {
      gradient: "from-amber-500 to-amber-700",
      bgColor: "bg-amber-50",
      iconColor: "text-amber-600",
      borderColor: "border-amber-200",
      hoverColor: "hover:bg-amber-600",
    },
  },
  {
    id: "9xCQnGDgWp2gcoditZtz",
    name: "Brosses et Outils de Nettoyage",
    description:
      "Gamme complète de brosses industrielles, balais, raclettes, grattoirs et autres outils pour chaque surface et chaque environnement",
    image: "/placeholder.svg?height=300&width=400",
    activators: ["brosses industrielles", "grattoirs", "raclettes"],
    theme: {
      gradient: "from-red-500 to-red-700",
      bgColor: "bg-red-50",
      iconColor: "text-red-600",
      borderColor: "border-red-200",
      hoverColor: "hover:bg-red-600",
    },
  },
  {
    id: "3yUKKQ33WivZITTFZPws",
    name: "Industrie agroalimentaire",
    description:
      "Équipements spécialisés respectant les normes d'hygiène strictes de l'industrie alimentaire : brosses HACCP, seaux de qualité alimentaire, équipements en acier inoxydable et outils à code couleur pour éviter la contamination croisée",
    image: "/placeholder.svg?height=300&width=400",
    activators: [
      "brosses HACCP",
      "seaux de qualité alimentaire",
      "acier inoxydable",
      "outils à code couleur",
    ],
    theme: {
      gradient: "from-purple-500 to-purple-700",
      bgColor: "bg-purple-50",
      iconColor: "text-purple-600",
      borderColor: "border-purple-200",
      hoverColor: "hover:bg-purple-600",
    },
  },
];

export default function EquipmentCatalogPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      {/* <header className="border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-2">
              <Shield className="h-8 w-8 text-blue-600" />
              <span className="text-2xl font-bold text-gray-900">HygieneMax</span>
            </div>
            <nav className="hidden md:flex space-x-8">
              <Link href="/" className="text-gray-700 hover:text-blue-600 transition-colors">
                Accueil
              </Link>
              <Link href="/Equipments" className="text-blue-600 font-medium">
                Équipements
              </Link>
              <Link href="/suppliers" className="text-gray-700 hover:text-blue-600 transition-colors">
                Fournisseurs
              </Link>
              <Link href="/#contact" className="text-gray-700 hover:text-blue-600 transition-colors">
                Contact
              </Link>
            </nav>
            <Button className="bg-blue-600 hover:bg-blue-700">Obtenir un devis</Button>
          </div>
        </div>
      </header> */}
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-green-50 py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Catalogue d'équipements
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Parcourez notre gamme complète de produits chimiques et
              d'équipements de stérilisation pour tous les besoins de
              l'industrie
            </p>
          </div>
        </div>
      </section>

      {/* Equipment Sectors Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {EquipmentSectors.map((sector) => (
              <Card
                key={sector.id}
                className={`overflow-hidden group hover:shadow-xl transition-all duration-300 ${sector.theme.borderColor} border-2`}
              >
                <div className="relative h-48">
                  <Image
                    src={sector.image || "/placeholder.svg"}
                    alt={sector.name}
                    fill
                    className="object-cover"
                  />
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${sector.theme.gradient} opacity-20`}
                  ></div>
                </div>
                <CardHeader className={sector.theme.bgColor}>
                  <div className="flex items-center space-x-3">
                    <div
                      className={`w-12 h-12 rounded-full ${sector.theme.bgColor} border-2 ${sector.theme.borderColor} flex items-center justify-center`}
                    >
                      <Shield className={`h-6 w-6 ${sector.theme.iconColor}`} />
                    </div>
                    <CardTitle className="text-2xl text-gray-900">
                      {sector.name}
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4 p-6">
                  <CardDescription className="text-base text-gray-700">
                    {sector.description}
                  </CardDescription>
                  <div className="space-y-3">
                    <p className="text-sm font-medium text-gray-800">
                      Catégories d'activateurs:
                    </p>
                    <div className="grid grid-cols-1 gap-2">
                      {sector.activators.map((activator) => (
                        <div
                          key={activator}
                          className={`flex items-center p-2 rounded-lg ${sector.theme.bgColor} border ${sector.theme.borderColor}`}
                        >
                          <span
                            className={`w-2 h-2 ${sector.theme.iconColor.replace(
                              "text-",
                              "bg-"
                            )} rounded-full mr-3`}
                          ></span>
                          <span className="text-sm font-medium text-gray-700">
                            {activator
                              .split("-")
                              .map(
                                (word) =>
                                  word.charAt(0).toUpperCase() + word.slice(1)
                              )
                              .join(" ")}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <Link href={`/Equipment/${sector.id}`}>
                    <Button
                      className={`w-full ${sector.theme.hoverColor} group-hover:text-white transition-all duration-300 bg-white text-gray-700 border-2 ${sector.theme.borderColor} hover:border-transparent`}
                    >
                      Parcourir les équipements
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Equipment Finder */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Besoin d'aide pour trouver le bon équipement ?
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Nos spécialistes en équipement peuvent vous aider à trouver la
                solution de stérilisation parfaite pour vos besoins spécifiques
              </p>
            </div>
            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                Contacter un spécialiste
              </Button>
              <Button size="lg" variant="outline">
                Télécharger le catalogue complet
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Shield className="h-6 w-6 text-blue-400" />
                <span className="text-xl font-bold">HygieneMax</span>
              </div>
              <p className="text-gray-400">
                Votre partenaire de confiance pour les produits chimiques et
                équipements de stérilisation de première qualité.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Équipements</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link
                    href="/Equipments/sterilization-chemicals"
                    className="hover:text-white transition-colors"
                  >
                    Produits chimiques de stérilisation
                  </Link>
                </li>
                <li>
                  <Link
                    href="/Equipments/cleaning-chemicals"
                    className="hover:text-white transition-colors"
                  >
                    Produits chimiques de nettoyage
                  </Link>
                </li>
                <li>
                  <Link
                    href="/Equipments/sterilization-equipment"
                    className="hover:text-white transition-colors"
                  >
                    Équipement de stérilisation
                  </Link>
                </li>
                <li>
                  <Link
                    href="/Equipments"
                    className="hover:text-white transition-colors"
                  >
                    Voir tous les équipements
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Entreprise</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/" className="hover:text-white transition-colors">
                    Accueil
                  </Link>
                </li>
                <li>
                  <Link
                    href="/suppliers"
                    className="hover:text-white transition-colors"
                  >
                    Fournisseurs
                  </Link>
                </li>
                <li>
                  <Link
                    href="/#about"
                    className="hover:text-white transition-colors"
                  >
                    À propos de nous
                  </Link>
                </li>
                <li>
                  <Link
                    href="/#contact"
                    className="hover:text-white transition-colors"
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Centre d'aide
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Guides d'équipement
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Garantie
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Retours
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 HygieneMax. Tous droits réservés.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
