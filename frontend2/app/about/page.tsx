import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Shield,
  Users,
  Globe,
  Award,
  Building,
  Factory,
  Beaker,
  Phone,
  Mail,
  MapPin,
  ArrowRight,
  Target,
  Eye,
  Heart,
} from "lucide-react";
import { Header } from "@/components/Header";

const groupCompanies = [
  {
    id: "hygiendust",
    name: "Hygiendust",
    tagline: "Solutions d'hygiène de première qualité",
    description:
      "Fournisseur leader de produits et équipements d'hygiène professionnels pour les secteurs de la santé, commercial et industriel.",
    specialties: [
      "Produits chimiques de stérilisation",
      "Équipement de nettoyage",
      "Équipement de protection",
      "Désinfectants de surface",
    ],
    established: "2008",
    employees: "150+",
    markets: ["Santé", "Restauration", "Fabrication", "Éducation"],
    logo: "/placeholder.svg?height=80&width=120",
    image: "/placeholder.svg?height=300&width=400",
    color: "blue",
    website: "www.hygiendust.com",
  },
  {
    id: "cleantech-solutions",
    name: "CleanTech Solutions",
    tagline: "Innovation en nettoyage industriel",
    description:
      "Spécialisé dans les systèmes de nettoyage industriel intensif et les technologies de nettoyage automatisé pour les installations de fabrication.",
    specialties: [
      "Nettoyants industriels",
      "Systèmes automatisés",
      "Nettoyeurs haute pression",
      "Équipement d'entretien des sols",
    ],
    established: "2012",
    employees: "85+",
    markets: ["Fabrication", "Automobile", "Aérospatiale", "Industrie lourde"],
    logo: "/placeholder.svg?height=80&width=120",
    image: "/placeholder.svg?height=300&width=400",
    color: "green",
    website: "www.hygiendust.com",
  },
  {
    id: "biocare-labs",
    name: "BioCare Laboratories",
    tagline: "Excellence scientifique en hygiène",
    description:
      "Laboratoire de recherche et développement spécialisé dans les solutions antimicrobiennes avancées et les services de test.",
    specialties: [
      "Services R&D",
      "Tests de produits",
      "Formulations personnalisées",
      "Assurance qualité",
    ],
    established: "2015",
    employees: "45+",
    markets: [
      "Pharmaceutique",
      "Biotechnologie",
      "Instituts de recherche",
      "Gouvernement",
    ],
    logo: "/placeholder.svg?height=80&width=120",
    image: "/placeholder.svg?height=300&width=400",
    color: "purple",
    website: "www.hygiendust.com",
  },
  {
    id: "ecogreen-hygiene",
    name: "EcoGreen Hygiene",
    tagline: "Solutions de nettoyage durables",
    description:
      "Fabricant de produits d'hygiène respectueux de l'environnement, axé sur les solutions de nettoyage biodégradables et durables.",
    specialties: [
      "Produits écologiques",
      "Nettoyants biodégradables",
      "Certifications vertes",
      "Emballage durable",
    ],
    established: "2018",
    employees: "60+",
    markets: ["Hôtellerie", "Commerce de détail", "Bureaux", "Résidentiel"],
    logo: "/placeholder.svg?height=80&width=120",
    image: "/placeholder.svg?height=300&width=400",
    color: "emerald",
    website: "www.hygiendust.com",
  },
  {
    id: "medsteril-pro",
    name: "MedSteril Pro",
    tagline: "Stérilisation de qualité médicale",
    description:
      "Spécialisé dans les équipements de stérilisation de qualité médicale et les services de validation pour les établissements de santé.",
    specialties: [
      "Autoclaves",
      "Validation de la stérilisation",
      "Équipement médical",
      "Services de conformité",
    ],
    established: "2010",
    employees: "70+",
    markets: ["Hôpitaux", "Cliniques", "Cabinets dentaires", "Vétérinaire"],
    logo: "/placeholder.svg?height=80&width=120",
    image: "/placeholder.svg?height=300&width=400",
    color: "red",
    website: "www.hygiendust.com",
  },
  {
    id: "aquapure-systems",
    name: "AquaPure Systems",
    tagline: "Excellence en traitement de l'eau",
    description:
      "Systèmes avancés de traitement et de purification de l'eau pour les applications industrielles et commerciales.",
    specialties: [
      "Purification de l'eau",
      "Systèmes de traitement",
      "Technologie de filtration",
      "Tests de l'eau",
    ],
    established: "2014",
    employees: "55+",
    markets: [
      "Traitement de l'eau",
      "Alimentation et boissons",
      "Produits pharmaceutiques",
      "Municipal",
    ],
    logo: "/placeholder.svg?height=80&width=120",
    image: "/placeholder.svg?height=300&width=400",
    color: "cyan",
    website: "www.hygiendust.com",
  },
];

const milestones = [
  {
    year: "2008",
    title: "Fondation",
    description:
      "Le groupe HygienDust est créé avec HygienDust comme société phare",
    icon: Building,
  },
  {
    year: "2010",
    title: "Expansion médicale",
    description:
      "Lancement de MedSteril Pro pour servir le secteur de la santé avec des solutions de stérilisation spécialisées",
    icon: Shield,
  },
  {
    year: "2012",
    title: "Croissance industrielle",
    description:
      "Fondation de CleanTech Solutions pour répondre aux besoins de nettoyage industriel intensif",
    icon: Factory,
  },
  {
    year: "2014",
    title: "Traitement de l'eau",
    description:
      "Création d'AquaPure Systems pour se développer dans le traitement et la purification de l'eau",
    icon: Beaker,
  },
  {
    year: "2015",
    title: "Recherche et développement",
    description:
      "Ouverture de BioCare Laboratories pour la recherche avancée et le développement de produits",
    icon: Beaker,
  },
  {
    year: "2018",
    title: "Objectif durabilité",
    description:
      "Lancement d'EcoGreen Hygiene pour être leader en solutions durables et écologiques",
    icon: Globe,
  },
  {
    year: "2024",
    title: "Présence mondiale",
    description:
      "Expansion pour servir des clients dans plus de 25 pays avec plus de 465 employés",
    icon: Globe,
  },
];

const values = [
  {
    icon: Target,
    title: "Excellence",
    description:
      "Nous visons les normes les plus élevées dans tout ce que nous faisons, de la qualité des produits au service client.",
  },
  {
    icon: Shield,
    title: "Sécurité",
    description:
      "La sécurité est notre priorité absolue - pour nos clients, nos employés et les communautés que nous servons.",
  },
  {
    icon: Globe,
    title: "Durabilité",
    description:
      "Nous nous engageons à protéger l'environnement grâce à des pratiques durables et des solutions respectueuses de l'environnement.",
  },
  {
    icon: Users,
    title: "Innovation",
    description:
      "Nous investissons continuellement dans la recherche et le développement pour commercialiser des solutions de pointe.",
  },
  {
    icon: Heart,
    title: "Intégrité",
    description:
      "Nous menons nos activités avec honnêteté, transparence et respect de toutes les parties prenantes.",
  },
  {
    icon: Award,
    title: "Partenariat",
    description:
      "Nous construisons des relations à long terme basées sur la confiance, la fiabilité et le succès mutuel.",
  },
];

const leadership = [
  {
    name: "Dr. Sarah Mitchell",
    position: "Directrice Générale",
    bio: "Avec plus de 20 ans dans l'industrie de l'hygiène, le Dr Mitchell dirige la vision stratégique et l'expansion mondiale du groupe HygienDust.",
    image: "/placeholder.svg?height=200&width=200",
    linkedin: "#",
  },
  {
    name: "Michael Chen",
    position: "Directeur de la Technologie",
    bio: "Michael supervise la R&D dans toutes les entreprises du groupe, stimulant l'innovation dans les technologies d'hygiène et de stérilisation.",
    image: "/placeholder.svg?height=200&width=200",
    linkedin: "#",
  },
  {
    name: "Dr. Elena Rodriguez",
    position: "Directrice Scientifique",
    bio: "Le Dr Rodriguez dirige nos initiatives scientifiques et s'assure que tous les produits respectent les normes les plus élevées de sécurité et d'efficacité.",
    image: "/placeholder.svg?height=200&width=200",
    linkedin: "#",
  },
  {
    name: "James Thompson",
    position: "Directeur des Opérations",
    bio: "James gère les opérations mondiales, assurant une fabrication et une distribution efficaces dans toutes les entreprises du groupe.",
    image: "/placeholder.svg?height=200&width=200",
    linkedin: "#",
  },
];

const getColorClasses = (color: string) => {
  const colorMap = {
    blue: {
      bg: "bg-blue-50",
      border: "border-blue-200",
      text: "text-blue-600",
      gradient: "from-blue-500 to-blue-700",
    },
    green: {
      bg: "bg-green-50",
      border: "border-green-200",
      text: "text-green-600",
      gradient: "from-green-500 to-green-700",
    },
    purple: {
      bg: "bg-purple-50",
      border: "border-purple-200",
      text: "text-purple-600",
      gradient: "from-purple-500 to-purple-700",
    },
    emerald: {
      bg: "bg-emerald-50",
      border: "border-emerald-200",
      text: "text-emerald-600",
      gradient: "from-emerald-500 to-emerald-700",
    },
    red: {
      bg: "bg-red-50",
      border: "border-red-200",
      text: "text-red-600",
      gradient: "from-red-500 to-red-700",
    },
    cyan: {
      bg: "bg-cyan-50",
      border: "border-cyan-200",
      text: "text-cyan-600",
      gradient: "from-cyan-500 to-cyan-700",
    },
  };
  return colorMap[color as keyof typeof colorMap] || colorMap.blue;
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-2">
              <Shield className="h-8 w-8 text-blue-600" />
              <span className="text-2xl font-bold text-gray-900">
                HygienDust
              </span>
            </div>
            <nav className="hidden md:flex space-x-8">
              <Link
                href="/"
                className="text-gray-700 hover:text-blue-600 transition-colors"
              >
                Accueil
              </Link>
              <Link
                href="/products"
                className="text-gray-700 hover:text-blue-600 transition-colors"
              >
                Produits
              </Link>
              <Link href="/about" className="text-blue-600 font-medium">
                À propos
              </Link>
              <Link
                href="/suppliers"
                className="text-gray-700 hover:text-blue-600 transition-colors"
              >
                Fournisseurs
              </Link>
              <Link
                href="/#contact"
                className="text-gray-700 hover:text-blue-600 transition-colors"
              >
                Contact
              </Link>
            </nav>
            {/* <Button className="bg-blue-600 hover:bg-blue-700">Obtenir un devis</Button> */}
          </div>
        </div>
      </header>
      {/* <Header /> */}

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-green-50 py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <Badge className="mb-4 bg-blue-100 text-blue-800 hover:bg-blue-100">
              À propos du groupe HygienDust
            </Badge>
            <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
              Mener l'avenir de
              <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                {" "}
                l'innovation en matière d'hygiène
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Depuis plus de 15 ans, le groupe HygienDust est à l'avant-garde de
              la technologie d'hygiène, offrant des solutions complètes grâce à
              sa famille d'entreprises spécialisées.
            </p>
            <div className="grid md:grid-cols-3 gap-6 max-w-3xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">6</div>
                <div className="text-gray-600">Entreprises</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">
                  465+
                </div>
                <div className="text-gray-600">Employés</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600 mb-2">
                  5+
                </div>
                <div className="text-gray-600">Pays</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="mb-8">
                <div className="flex items-center mb-4">
                  <Target className="h-8 w-8 text-blue-600 mr-3" />
                  <h2 className="text-3xl font-bold text-gray-900">
                    Notre Mission
                  </h2>
                </div>
                <p className="text-lg text-gray-600">
                  Protéger la santé et la sécurité publiques en fournissant des
                  solutions d'hygiène innovantes, fiables et durables qui
                  dépassent les normes de l'industrie et les attentes des
                  clients.
                </p>
              </div>
              <div>
                <div className="flex items-center mb-4">
                  <Eye className="h-8 w-8 text-green-600 mr-3" />
                  <h2 className="text-3xl font-bold text-gray-900">
                    Notre Vision
                  </h2>
                </div>
                <p className="text-lg text-gray-600">
                  Être le leader mondial de l'innovation en matière d'hygiène,
                  créant un monde plus propre, plus sûr et plus durable pour les
                  générations futures grâce à une technologie de pointe et des
                  pratiques commerciales responsables.
                </p>
              </div>
            </div>
            <div className="relative">
              <Image
                src="/placeholder.svg?height=500&width=600"
                alt="Mission et Vision du Groupe HygienDust"
                width={600}
                height={500}
                className="rounded-lg shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Nos Valeurs Fondamentales
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Ces valeurs guident chaque décision que nous prenons et chaque
              solution que nous livrons
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <Card
                key={index}
                className="text-center border-0 shadow-lg hover:shadow-xl transition-shadow"
              >
                <CardHeader>
                  <value.icon className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                  <CardTitle className="text-xl">{value.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Group Companies */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Nos Entreprises du Groupe
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Six entreprises spécialisées travaillant ensemble pour fournir des
              solutions d'hygiène complètes
            </p>
          </div>
          <div className="grid lg:grid-cols-2 gap-8">
            {groupCompanies.map((company) => {
              const colors = getColorClasses(company.color);
              return (
                <Card
                  key={company.id}
                  className={`overflow-hidden border-2 ${colors.border} hover:shadow-xl transition-all duration-300`}
                >
                  <div className="relative h-48">
                    <Image
                      src={company.image || "/placeholder.svg"}
                      alt={company.name}
                      fill
                      className="object-cover"
                    />
                    <div
                      className={`absolute inset-0 bg-gradient-to-r ${colors.gradient} opacity-20`}
                    ></div>
                  </div>
                  <CardHeader className={colors.bg}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div
                          className={`w-12 h-12 bg-white rounded-lg shadow-md flex items-center justify-center`}
                        >
                          <Image
                            src={company.logo || "/placeholder.svg"}
                            alt={`${company.name} Logo`}
                            width={40}
                            height={40}
                            className="object-contain"
                          />
                        </div>
                        <div>
                          <CardTitle className="text-xl text-gray-900">
                            {company.name}
                          </CardTitle>
                          <p className={`text-sm ${colors.text} font-medium`}>
                            {company.tagline}
                          </p>
                        </div>
                      </div>
                      <Badge
                        variant="outline"
                        className={`${colors.text} border-current`}
                      >
                        Créée en {company.established}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="p-6">
                    <p className="text-gray-600 mb-4">{company.description}</p>

                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <div className="flex items-center text-sm text-gray-500 mb-1">
                          <Users className="h-4 w-4 mr-1" />
                          Employés
                        </div>
                        <div className="font-medium">{company.employees}</div>
                      </div>
                      <div>
                        <div className="flex items-center text-sm text-gray-500 mb-1">
                          <Globe className="h-4 w-4 mr-1" />
                          Site web
                        </div>
                        <div className="font-medium text-sm">
                          {company.website}
                        </div>
                      </div>
                    </div>

                    <div className="mb-4">
                      <h4 className="font-medium text-gray-900 mb-2">
                        Spécialités:
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {company.specialties.map((specialty, index) => (
                          <Badge
                            key={index}
                            variant="secondary"
                            className="text-xs"
                          >
                            {specialty}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="mb-4">
                      <h4 className="font-medium text-gray-900 mb-2">
                        Marchés clés:
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {company.markets.map((market, index) => (
                          <Badge
                            key={index}
                            variant="outline"
                            className={`text-xs ${colors.text} border-current`}
                          >
                            {market}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <Button
                      variant="outline"
                      className={`w-full ${colors.text} border-current hover:bg-current hover:text-white`}
                    >
                      En savoir plus
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Notre Parcours
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Étapes clés de la croissance et de l'évolution du groupe
              HygienDust
            </p>
          </div>
          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-blue-200"></div>
            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <div
                  key={index}
                  className={`flex items-center ${
                    index % 2 === 0 ? "flex-row" : "flex-row-reverse"
                  }`}
                >
                  <div
                    className={`w-1/2 ${
                      index % 2 === 0 ? "pr-8 text-right" : "pl-8 text-left"
                    }`}
                  >
                    <Card className="border-0 shadow-lg">
                      <CardHeader>
                        <div
                          className={`flex items-center ${
                            index % 2 === 0 ? "justify-end" : "justify-start"
                          } space-x-3`}
                        >
                          <milestone.icon className="h-6 w-6 text-blue-600" />
                          <CardTitle className="text-lg">
                            {milestone.title}
                          </CardTitle>
                        </div>
                        <Badge
                          variant="outline"
                          className={`w-fit ${
                            index % 2 === 0 ? "ml-auto" : "mr-auto"
                          }`}
                        >
                          {milestone.year}
                        </Badge>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-600">{milestone.description}</p>
                      </CardContent>
                    </Card>
                  </div>
                  <div className="relative z-10">
                    <div className="w-4 h-4 bg-blue-600 rounded-full border-4 border-white shadow-lg"></div>
                  </div>
                  <div className="w-1/2"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Leadership Team */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Équipe de Direction
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Découvrez les leaders expérimentés qui stimulent l'innovation et
              la croissance au sein du groupe HygienDust
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {leadership.map((leader, index) => (
              <Card
                key={index}
                className="text-center border-0 shadow-lg hover:shadow-xl transition-shadow"
              >
                <CardContent className="pt-6">
                  <div className="relative w-32 h-32 mx-auto mb-4">
                    <Image
                      src={leader.image || "/placeholder.svg"}
                      alt={leader.name}
                      fill
                      className="object-cover rounded-full"
                    />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-1">
                    {leader.name}
                  </h3>
                  <p className="text-blue-600 font-medium mb-3">
                    {leader.position}
                  </p>
                  <p className="text-sm text-gray-600 mb-4">{leader.bio}</p>
                  <Button variant="outline" size="sm">
                    Profil LinkedIn
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Global Presence */}
      <section className="py-20 bg-blue-600">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-white">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Présence Mondiale
            </h2>
            <p className="text-xl text-blue-100 mb-12 max-w-3xl mx-auto">
              Au service de clients du monde entier avec une expertise locale et
              des normes mondiales
            </p>
            <div className="grid md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-4xl font-bold mb-2">25+</div>
                <div className="text-blue-100">Pays desservis</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold mb-2">1000+</div>
                <div className="text-blue-100">Clients actifs</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold mb-2">50+</div>
                <div className="text-blue-100">Partenaires de distribution</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold mb-2">99.8%</div>
                <div className="text-blue-100">Satisfaction client</div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Call to Action */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Prêt à Partenarier avec Nous ?
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Rejoignez des milliers de clients satisfaits qui font confiance
                au groupe HygienDust pour leurs besoins en hygiène et
                stérilisation
              </p>
            </div>
            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                <Phone className="h-5 w-5 mr-2" />
                Contacter l'équipe commerciale
              </Button>
              <Button size="lg" variant="outline">
                <Mail className="h-5 w-5 mr-2" />
                Demander des informations
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
                <span className="text-xl font-bold">HygienDust Group</span>
              </div>
              <p className="text-gray-400">
                Leader de l'avenir de l'innovation en matière d'hygiène grâce à
                notre famille d'entreprises spécialisées.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Entreprises du groupe</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    HygienDust
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    CleanTech Solutions
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    BioCare Laboratories
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    EcoGreen Hygiene
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Liens rapides</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/" className="hover:text-white transition-colors">
                    Accueil
                  </Link>
                </li>
                <li>
                  <Link
                    href="/products"
                    className="hover:text-white transition-colors"
                  >
                    Produits
                  </Link>
                </li>
                <li>
                  <Link
                    href="/about"
                    className="hover:text-white transition-colors"
                  >
                    À propos de nous
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
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Contact</h3>
              <ul className="space-y-2 text-gray-400">
                <li className="flex items-center">
                  <Phone className="h-4 w-4 mr-2" />
                  +1 (555) 123-4567
                </li>
                <li className="flex items-center">
                  <Mail className="h-4 w-4 mr-2" />
                  info@hygiendust.com
                </li>
                <li className="flex items-center">
                  <MapPin className="h-4 w-4 mr-2" />
                  Siège social mondial
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 HygienDust Group. Tous droits réservés.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
