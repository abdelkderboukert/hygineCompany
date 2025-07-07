"use client";

import { useState } from "react";
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
import { Badge } from "@/components/ui/badge";
import {
  Shield,
  Truck,
  Award,
  Phone,
  Mail,
  MapPin,
  CheckCircle,
} from "lucide-react";
import { Header } from "@/components/Header";

export default function HomePage() {
  interface FormData {
    name: string;
    company: string;
    message: string;
    email: string;
    phoneNumber: number | undefined;
    ref: number | undefined;
  }

  const [formData, setFormData] = useState<FormData>({
    name: "",
    company: "",
    message: "",
    email: "",
    phoneNumber: undefined,
    ref: 0,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Update handleSubmit
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const response = await fetch("/api/sendEmail", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();
    if (response.ok) {
      alert("Email sent successfully!"); // Email envoyé avec succès !
    } else {
      alert("Error sending email: " + data.error); // Erreur lors de l'envoi de l'email :
    }
  };
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
              <Link href="#home" className="text-gray-700 hover:text-blue-600 transition-colors">
                Accueil
              </Link>
              <Link href="#products" className="text-gray-700 hover:text-blue-600 transition-colors">
                Produits
              </Link>
              <Link href="#about" className="text-gray-700 hover:text-blue-600 transition-colors">
                À propos
              </Link>
              <Link href="#contact" className="text-gray-700 hover:text-blue-600 transition-colors">
                Contact
              </Link>
            </nav>
            <Button className="bg-blue-600 hover:bg-blue-700">Obtenir un devis</Button>
          </div>
        </div>
      </header> */}
      <Header />
      {/* Hero Section */}
      <section
        id="home"
        className="bg-gradient-to-br from-blue-50 to-green-50 py-20"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="mb-4 bg-blue-100 text-blue-800 hover:bg-blue-100">
                Solutions d'hygiène professionnelles
              </Badge>
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
                Produits et équipements d'hygiène de première qualité
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Fournir aux entreprises et institutions des produits et équipements
                d'hygiène de qualité supérieure. Des désinfectants aux équipements
                de nettoyage industriels, nous assurons les normes de propreté les
                plus élevées.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                  <Link href="#products">Voir les produits</Link>
                </Button>
                <Button size="lg" variant="outline">
                  Contacter le service commercial
                </Button>
              </div>
            </div>
            <div className="relative">
              <Image
                src="/main2.jpg"
                alt="Produits et équipements d'hygiène"
                width={600}
                height={500}
                className="rounded-lg shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Pourquoi choisir Hygindust ?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Nous fournissons des solutions d'hygiène complètes avec une qualité
              et un service inégalés
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center border-0 shadow-lg">
              <CardHeader>
                <Shield className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <CardTitle>Qualité Certifiée</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Tous nos produits respectent les normes internationales
                  d'hygiène et de sécurité avec les certifications appropriées
                </CardDescription>
              </CardContent>
            </Card>
            <Card className="text-center border-0 shadow-lg">
              <CardHeader>
                <Truck className="h-12 w-12 text-green-600 mx-auto mb-4" />
                <CardTitle>Livraison Rapide</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Service de livraison rapide et fiable pour s'assurer que vos
                  fournitures d'hygiène ne manquent jamais
                </CardDescription>
              </CardContent>
            </Card>
            <Card className="text-center border-0 shadow-lg">
              <CardHeader>
                <Award className="h-12 w-12 text-purple-600 mx-auto mb-4" />
                <CardTitle>Support Expert</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Consultation professionnelle et support continu pour tous vos
                  besoins en équipement d'hygiène
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section id="products" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Nos catégories de produits
            </h2>
            <p className="text-xl text-gray-600">
              Gamme complète de produits et équipements d'hygiène pour tous les
              besoins
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
            <Card className="group hover:shadow-xl transition-shadow">
              <CardHeader>
                <Image
                  src="/bidon.png?height=200&width=300"
                  alt="Désinfectants pour les mains"
                  width={300}
                  height={200}
                  className="rounded-lg mb-4 mx-auto w-full"
                />
                <CardTitle>Produits de Nettoyage</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="mb-4">
                  Désinfectants pour les mains de qualité supérieure, savons
                  antibactériens et distributeurs pour tous les environnements
                </CardDescription>
                <Button
                  variant="outline"
                  className="w-full group-hover:bg-blue-600 group-hover:text-white transition-colors"
                >
                  <Link href="/products/">Voir les produits</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-xl transition-shadow">
              <CardHeader>
                <Image
                  src="/equp.png?height=200&width=300"
                  alt="Équipement de nettoyage"
                  width={300}
                  height={200}
                  className="rounded-lg mb-4 mx-auto w-full"
                />
                <CardTitle>Équipement de Nettoyage</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="mb-4">
                  Machines de nettoyage de qualité industrielle, aspirateurs et
                  équipement d'entretien
                </CardDescription>
                <Button
                  variant="outline"
                  className="w-full group-hover:bg-blue-600 group-hover:text-white transition-colors"
                >
                  <Link href="/Equipment/">Voir les produits</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                À propos d'Hygindust
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Avec plus de 15 ans d'expérience dans l'industrie de l'hygiène,
                Hygindust est le partenaire de confiance des entreprises, des
                établissements de santé, des écoles et des institutions de la
                région.
              </p>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-6 w-6 text-green-600 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      Assurance Qualité
                    </h3>
                    <p className="text-gray-600">
                      Tous les produits subissent des tests de qualité rigoureux
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-6 w-6 text-green-600 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      Prix Compétitifs
                    </h3>
                    <p className="text-gray-600">
                      Les meilleurs prix sans compromettre la qualité
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-6 w-6 text-green-600 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      Solutions Personnalisées
                    </h3>
                    <p className="text-gray-600">
                      Programmes d'hygiène adaptés à vos besoins spécifiques
                    </p>
                  </div>
                </div>
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                  <Link href="/about">À propos de nous</Link>
                </Button>
              </div>
            </div>
            <div>
              <Image
                src="/IMG_4530.jpg"
                alt="À propos d'Hygindust"
                width={500}
                height={400}
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Suppliers Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Nos Fournisseurs de Confiance
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Nous collaborons avec des fabricants leaders mondiaux pour vous
              offrir les produits d'hygiène de la plus haute qualité
            </p>
          </div>

          {/* Featured Suppliers */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            <Card className="group hover:shadow-xl transition-all duration-300">
              <CardHeader className="text-center">
                <div className="w-24 h-24 mx-auto mb-4 bg-white rounded-lg shadow-md flex items-center justify-center">
                  <Image
                    src="/heute-removebg-preview.png"
                    alt="Logo du fournisseur 1"
                    width={120}
                    height={80}
                    className="max-w-full max-h-full object-contain"
                  />
                </div>
                <CardTitle className="text-xl">HEUTE</CardTitle>
                <Badge className="bg-blue-100 text-blue-800">
                  {/* Partenaire Premium */}
                </Badge>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center mb-4">
                  Fabricant leader d'équipements de nettoyage industriel et de
                  systèmes de désinfection
                </CardDescription>
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex justify-between">
                    <span>Localisation:</span>
                    <span>Allemagne</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Spécialité:</span>
                    <span>Équipement de nettoyage</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Depuis:</span>
                    <span>2018</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-xl transition-all duration-300">
              <CardHeader className="text-center">
                <div className="w-24 h-24 mx-auto mb-4 bg-white rounded-lg shadow-md flex items-center justify-center">
                  <Image
                    src="/Lechler_Company-Logo-removebg-preview.png?height=80&width=120"
                    alt="Logo du fournisseur 2"
                    width={120}
                    height={80}
                    className="max-w-full max-h-full object-contain"
                  />
                </div>
                <CardTitle className="text-xl">Lechler</CardTitle>
                <Badge className="bg-green-100 text-green-800">
                  {/* Partenaire Certifié */}
                </Badge>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center mb-4">
                  Fabrication de buses de pulvérisation de précision
                </CardDescription>
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex justify-between">
                    <span>Localisation:</span>
                    <span>Allemagne</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Spécialité:</span>
                    <span>Technologie de pulvérisation</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Depuis:</span>
                    <span>2020</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-xl transition-all duration-300">
              <CardHeader className="text-center">
                <div className="w-24 h-24 mx-auto mb-4 bg-white rounded-lg shadow-md flex items-center justify-center">
                  <Image
                    src="/Logo_CFSBrands-Jofel-2023Curvas-01.webp?height=80&width=120"
                    alt="Logo du fournisseur 3"
                    width={120}
                    height={80}
                    className="max-w-full max-h-full object-contain"
                  />
                </div>
                <CardTitle className="text-xl">Jofel CFS</CardTitle>
                <Badge className="bg-purple-100 text-purple-800">
                  {/* Partenaire Écologique */}
                </Badge>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center mb-4">
                  Production, commercialisation et distribution de systèmes et
                  équipements de nettoyage et d'hygiène professionnels
                </CardDescription>
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex justify-between">
                    <span>Localisation:</span>
                    <span>France</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Spécialité:</span>
                    <span>Systèmes et équipements d'hygiène</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Depuis:</span>
                    <span>2019</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-xl transition-all duration-300">
              <CardHeader className="text-center">
                <div className="w-24 h-24 mx-auto mb-4 bg-white rounded-lg shadow-md flex items-center justify-center">
                  <Image
                    src="/Logo_DELABIE.png?height=80&width=120"
                    alt="Logo du fournisseur 4"
                    width={120}
                    height={80}
                    className="max-w-full max-h-full object-contain"
                  />
                </div>
                <CardTitle className="text-xl">DELABIE</CardTitle>
                <Badge className="bg-red-100 text-red-800">
                  {/* Qualité Médicale */}
                </Badge>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center mb-4">
                  Ils sont connus pour leurs produits durables, ergonomiques,
                  sûrs et hygiéniques conçus pour un usage intensif
                </CardDescription>
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex justify-between">
                    <span>Localisation:</span>
                    <span>France</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Spécialité:</span>
                    <span>Équipements sanitaires</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Depuis:</span>
                    <span>2017</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-xl transition-all duration-300">
              <CardHeader className="text-center">
                <div className="w-24 h-24 mx-auto mb-4 bg-white rounded-lg shadow-md flex items-center justify-center">
                  <Image
                    src="/ramex.png?height=80&width=120"
                    alt="Logo du fournisseur 5"
                    width={120}
                    height={80}
                    className="max-w-full max-h-full object-contain"
                  />
                </div>
                <CardTitle className="text-xl">Ramex</CardTitle>
                <Badge className="bg-yellow-100 text-yellow-800">
                  {/* Partenaire Volume */}
                </Badge>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center mb-4">
                  Fabrication d'équipements et accessoires de nettoyage
                  professionnels
                </CardDescription>
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex justify-between">
                    <span>Localisation:</span>
                    <span>Italie</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Spécialité:</span>
                    <span>
                      Fabrication d'équipements et accessoires de nettoyage
                      professionnels
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Depuis:</span>
                    <span>2016</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-xl transition-all duration-300">
              <CardHeader className="text-center">
                <div className="w-24 h-24 mx-auto mb-4 bg-white rounded-lg shadow-md flex items-center justify-center">
                  <Image
                    src="/Tork-Logo-700x394.webp?height=80&width=120"
                    alt="Logo du fournisseur 6"
                    width={120}
                    height={80}
                    className="max-w-full max-h-full object-contain"
                  />
                </div>
                <CardTitle className="text-xl">Tork</CardTitle>
                <Badge className="bg-gray-100 text-gray-800">
                  {/* Partenaire Innovation */}
                </Badge>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center mb-4">
                  Systèmes avancés de gestion des déchets et solutions de
                  recyclage
                </CardDescription>
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex justify-between">
                    <span>Localisation:</span>
                    <span>Suède</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Spécialité:</span>
                    <span>Solutions et produits d'hygiène professionnels</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Depuis:</span>
                    <span>2021</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Supplier Stats */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Notre Réseau Mondial
              </h3>
              <p className="text-gray-600">
                Construire des partenariats mondiaux pour mieux vous servir
              </p>
            </div>
            <div className="grid md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-3xl font-bold text-blue-600 mb-2">10+</div>
                <div className="text-gray-600">Fournisseurs de Confiance</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-green-600 mb-2">15</div>
                <div className="text-gray-600">Pays</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-purple-600 mb-2">
                  500+
                </div>
                <div className="text-gray-600">Produits Disponibles</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-orange-600 mb-2">
                  99.8%
                </div>
                <div className="text-gray-600">Note de Qualité</div>
              </div>
            </div>
          </div>

          {/* View All Suppliers Button */}
          <div className="text-center mt-12">
            <Link href="/suppliers">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 px-8">
                Voir tous les fournisseurs
                <svg
                  className="ml-2 h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Supplier Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Devenez Notre Fournisseur
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Rejoignez notre réseau de fournisseurs de confiance et aidez-nous à
              offrir des solutions d'hygiène de qualité dans le monde entier
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Exigences pour les fournisseurs
              </h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-6 w-6 text-green-600 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-gray-900">
                      Certifications de Qualité
                    </h4>
                    <p className="text-gray-600">
                      ISO 9001, FDA, CE, ou certifications de qualité équivalentes
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-6 w-6 text-green-600 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-gray-900">
                      Capacité de Production
                    </h4>
                    <p className="text-gray-600">
                      Capacité à répondre aux commandes à grande échelle et à
                      maintenir un approvisionnement constant
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-6 w-6 text-green-600 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-gray-900">
                      Normes de Conformité
                    </h4>
                    <p className="text-gray-600">
                      Adhésion aux réglementations internationales d'hygiène et de
                      sécurité
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-6 w-6 text-green-600 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-gray-900">
                      Prix Compétitifs
                    </h4>
                    <p className="text-gray-600">
                      Prix de gros compétitifs avec des réductions pour volume
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <Image
                src="/IMG_4560.png?height=400&width=500"
                alt="Partenariat fournisseur"
                width={500}
                height={400}
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>

          <div className="bg-blue-50 rounded-2xl p-8">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Avantages Fournisseurs
              </h3>
              <p className="text-gray-600">
                Ce que vous obtenez en vous associant à Hygindut
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="bg-blue-600 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Truck className="h-6 w-6 text-white" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">
                  Distribution Mondiale
                </h4>
                <p className="text-gray-600 text-sm">
                  Accès à notre vaste réseau de distribution
                </p>
              </div>
              <div className="text-center">
                <div className="bg-green-600 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="h-6 w-6 text-white" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">
                  Contrats à Long Terme
                </h4>
                <p className="text-gray-600 text-sm">
                  Accords de partenariat stables et à long terme
                </p>
              </div>
              <div className="text-center">
                <div className="bg-purple-600 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-6 w-6 text-white" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">
                  Soutien de Marque
                </h4>
                <p className="text-gray-600 text-sm">
                  Soutien marketing et promotionnel
                </p>
              </div>
            </div>
            <div className="text-center mt-8">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                Postuler en tant que fournisseur
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Nous Contacter
            </h2>
            <p className="text-xl text-gray-600">
              Contactez notre équipe pour des devis, du support ou des
              opportunités de partenariat
            </p>
          </div>
          {/* frrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr */}
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Envoyez-nous un Message
              </h3>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="firstName"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Prénom *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Jean"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="lastName"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Nom de famille *
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Dupont"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Adresse e-mail *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="jean@entreprise.com"
                  />
                </div>

                <div>
                  <label
                    htmlFor="company"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Nom de l'entreprise
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Votre entreprise"
                  />
                </div>

                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Numéro de téléphone
                  </label>
                  <input
                    type="tel"
                    id="phoneNumber"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="+1 (555) 123-4567"
                  />
                </div>

                <div>
                  <label
                    htmlFor="subject"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Sujet *
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Sélectionnez un sujet</option>
                    <option value="product-inquiry">Demande de produit</option>
                    <option value="bulk-order">Devis pour commande en gros</option>
                    <option value="supplier-application">
                      Demande de fournisseur
                    </option>
                    <option value="technical-support">Support technique</option>
                    <option value="partnership">Opportunité de partenariat</option>
                    <option value="other">Autre</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                    placeholder="Décrivez-nous vos besoins..."
                  ></textarea>
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full bg-blue-600 hover:bg-blue-700"
                >
                  Envoyer le message
                </Button>
              </form>
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">
                  Nous Contacter
                </h3>
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="bg-blue-100 p-3 rounded-lg">
                      <Phone className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Téléphone</h4>
                      <p className="text-gray-600">+213 (0) 7 70 10 51 21</p>
                      <p className="text-gray-600">+213 (0) 7 70 10 51 21</p>
                      <p className="text-sm text-gray-500">
                        Lun-Ven 8h-16h HNE
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="bg-green-100 p-3 rounded-lg">
                      <Mail className="h-6 w-6 text-green-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Email</h4>
                      <p className="text-gray-600">comercial1@hygindut.com</p>
                      <p className="text-gray-600">comercial2@hygindut.com</p>
                      <p className="text-gray-600">contact@hygindut.com</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="bg-purple-100 p-3 rounded-lg">
                      <MapPin className="h-6 w-6 text-purple-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Adresse</h4>
                      <p className="text-gray-600">Village Benramdan</p>
                      <p className="text-gray-600">Ilot 102 n°2 Chbli</p>
                      <p className="text-gray-600">Wilaya Blida</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-blue-600 rounded-2xl shadow-lg p-8 text-white">
                <h3 className="text-2xl font-bold mb-4">
                  Besoin d'aide immédiate ?
                </h3>
                <p className="mb-6">
                  Notre équipe commerciale est prête à vous aider à trouver les
                  bonnes solutions d'hygiène pour votre entreprise.
                </p>
                <div className="space-y-3">
                  <Button
                    variant="secondary"
                    size="lg"
                    className="w-full bg-white text-blue-600 hover:bg-gray-100"
                  >
                    Planifier un appel
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    className="w-full border-white text-white hover:bg-white hover:text-blue-600"
                  >
                    Demander un devis
                  </Button>
                </div>
              </div>
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
                Votre partenaire de confiance pour les produits et équipements
                d'hygiène de première qualité.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Produits</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Désinfectants pour les mains
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Équipement de nettoyage
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Équipement de protection
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Désinfectants
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Entreprise</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    À propos de nous
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Carrières
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Actualités
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
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
            <p>&copy; 2024 Hygindust. Tous droits réservés.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}