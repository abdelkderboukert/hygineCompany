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

// Sample product sectors data with different themes
const productSectors = [
  {
    id: "pSVKtoCNmJocgpPTYmYa",
    name: "Nettoyage en Place / Stérilisation en Place",
    description:
      "Solutions chimiques professionnelles pour la stérilisation dans diverses industries",
    image: "/placeholder.svg?height=300&width=400",
    activators: ["désinfectants", "désinfectants pour les mains", "stérilisants"],
    theme: {
      gradient: "from-blue-500 to-blue-700",
      bgColor: "bg-blue-50",
      iconColor: "text-blue-600",
      borderColor: "border-blue-200",
      hoverColor: "hover:bg-blue-600",
    },
  },
  {
    id: "G2bxJGI8T8AibUtZtwkD",
    name: "Nettoyage Hors Place (COP)",
    description:
      "Nettoyage des équipements et composants qui ne peuvent pas être nettoyés sur place, nécessitant un démontage et un nettoyage dans une zone dédiée.",
    image: "/placeholder.svg?height=300&width=400",
    activators: [
      "nettoyants-alcalins",
      "nettoyants-acides",
      "eau-purifiee",
      // "action-mecanique",
      // "temperature",
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
    id: "djHzgM7n8JA7I8AEmNeC",
    name: "Hygiène Corporelle",
    description:
      "Ensemble des pratiques et des soins destinés à maintenir la propreté du corps, prévenir les maladies et favoriser le bien-être physique et mental.",
    image: "/placeholder.svg?height=300&width=400",
    activators: ["savon", "shampoing", "dentifrice"],
    theme: {
      gradient: "from-cyan-500 to-cyan-700",
      bgColor: "bg-cyan-50",
      iconColor: "text-cyan-600",
      borderColor: "border-cyan-200",
      hoverColor: "hover:bg-cyan-600",
    },
  },
  {
    id: "mL4fIyquLQWct4oprf4M",
    name: "Collectivité",
    description:
      "Un groupe d'individus partageant des caractéristiques, des intérêts, un territoire ou des objectifs communs, et interdépendants au sein d'une structure sociale.",
    image: "/placeholder.svg?height=300&width=400",
    activators: ["citoyens", "résidents", "organisations-publiques"],
    theme: {
      gradient: "from-purple-500 to-purple-700",
      bgColor: "bg-purple-50",
      iconColor: "text-purple-600",
      borderColor: "border-purple-200",
      hoverColor: "hover:bg-purple-600",
    },
  },
  {
    id: "AKf0XnxFSybJEiGKbANm",
    name: "Additifs",
    description:
      "Substances ajoutées intentionnellement à un produit (alimentaire, cosmétique, industriel, etc.) en faible quantité pour modifier ses caractéristiques (conservation, goût, texture, couleur, stabilité) ou faciliter sa fabrication, sans être consommées seules comme ingrédients principaux.",
    image: "/placeholder.svg?height=300&width=400",
    activators: ["conservateurs", "colorants", "exhausteurs-de-gout"],
    theme: {
      gradient: "from-orange-500 to-orange-700",
      bgColor: "bg-orange-50",
      iconColor: "text-orange-600",
      borderColor: "border-orange-200",
      hoverColor: "hover:bg-orange-600",
    },
  },
  {
    id: "Mb0qxk60dAdiPwu7eKL3",
    name: "Agricole",
    description:
      "Relatif à l'agriculture, l'ensemble des activités humaines qui transforment le milieu naturel pour produire des ressources végétales (cultures) et animales (élevage) utiles aux besoins de l'homme (alimentation, fibres, énergie).",
    image: "/placeholder.svg?height=300&width=400",
    activators: ["cultures", "élevage", "machinisme-agricole"],
    theme: {
      gradient: "from-red-500 to-red-700",
      bgColor: "bg-red-50",
      iconColor: "text-red-600",
      borderColor: "border-red-200",
      hoverColor: "hover:bg-red-600",
    },
  },
];

export default function ProductCatalogPage() {
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
              <Link href="/products" className="text-blue-600 font-medium">
                Produits
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
              Catalogue de produits
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Parcourez notre gamme complète de produits chimiques et
              d'équipements de stérilisation pour tous les besoins de
              l'industrie
            </p>
          </div>
        </div>
      </section>

      {/* Product Sectors Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {productSectors.map((sector) => (
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
                  <Link href={`/products/${sector.id}`}>
                    <Button
                      className={`w-full ${sector.theme.hoverColor} group-hover:text-white transition-all duration-300 bg-white text-gray-700 border-2 ${sector.theme.borderColor} hover:border-transparent`}
                    >
                      Parcourir les produits
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Product Finder */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Besoin d'aide pour trouver le bon produit ?
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Nos spécialistes produits peuvent vous aider à trouver la
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
                <span className="text-xl font-bold">Hygindust</span>
              </div>
              <p className="text-gray-400">
                Votre partenaire de confiance pour les produits chimiques et
                équipements de stérilisation de première qualité.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Produits</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link
                    href="/products/sterilization-chemicals"
                    className="hover:text-white transition-colors"
                  >
                    Produits chimiques de stérilisation
                  </Link>
                </li>
                <li>
                  <Link
                    href="/products/cleaning-chemicals"
                    className="hover:text-white transition-colors"
                  >
                    Produits chimiques de nettoyage
                  </Link>
                </li>
                <li>
                  <Link
                    href="/products/sterilization-equipment"
                    className="hover:text-white transition-colors"
                  >
                    Équipement de stérilisation
                  </Link>
                </li>
                <li>
                  <Link
                    href="/products"
                    className="hover:text-white transition-colors"
                  >
                    Voir tous les produits
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
                    Guides produits
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