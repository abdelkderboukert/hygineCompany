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
import { Input } from "@/components/ui/input";
import {
  Shield,
  Search,
  MapPin,
  Calendar,
  Award,
  ArrowLeft,
  Filter,
} from "lucide-react";
import { Header } from "@/components/Header";

// const suppliers = [
//   {
//     id: 1,
//     name: "CleanTech Industries",
//     location: "Allemagne",
//     specialty: "Équipement de nettoyage",
//     since: "2018",
//     badge: "Partenaire Premium",
//     badgeColor: "bg-blue-100 text-blue-800",
//     description:
//       "Fabricant leader d'équipements de nettoyage industriel et de systèmes de désinfection",
//     products: [
//       "Nettoyants industriels",
//       "Systèmes de désinfection",
//       "Équipement d'entretien des sols",
//     ],
//     certifications: ["ISO 9001", "Marquage CE", "Norme de qualité allemande"],
//   },
//   {
//     id: 2,
//     name: "SafeGuard Solutions",
//     location: "États-Unis",
//     specialty: "EPI et désinfectants",
//     since: "2020",
//     badge: "Partenaire Certifié",
//     badgeColor: "bg-green-100 text-green-800",
//     description:
//       "Spécialisé dans les équipements de protection individuelle et les produits d'hygiène personnelle",
//     products: ["Masques faciaux", "Désinfectants pour les mains", "Gants de protection"],
//     certifications: ["Approuvé par la FDA", "Certifié NIOSH", "ISO 13485"],
//   },
//   {
//     id: 3,
//     name: "EcoClean Manufacturing",
//     location: "Canada",
//     specialty: "Produits écologiques",
//     since: "2019",
//     badge: "Partenaire Écologique",
//     badgeColor: "bg-purple-100 text-purple-800",
//     description:
//       "Produits d'hygiène durables et respectueux de l'environnement et solutions biodégradables",
//     products: [
//       "Nettoyants biodégradables",
//       "Produits en papier écologiques",
//       "Désinfectants verts",
//     ],
//     certifications: ["Green Seal", "EcoLogo", "USDA BioPreferred"],
//   },
//   {
//     id: 4,
//     name: "MedHygiene Corp",
//     location: "Suisse",
//     specialty: "Hygiène médicale",
//     since: "2017",
//     badge: "Qualité Médicale",
//     badgeColor: "bg-red-100 text-red-800",
//     description: "Désinfectants de qualité médicale et solutions d'hygiène hospitalière",
//     products: [
//       "Désinfectants hospitaliers",
//       "Désinfectants chirurgicaux",
//       "Nettoyants pour équipements médicaux",
//     ],
//     certifications: ["Approuvé par la FDA", "Normes OMS", "Swiss Medic"],
//   },
//   {
//     id: 5,
//     name: "PaperPlus Industries",
//     location: "Finlande",
//     specialty: "Produits en papier",
//     since: "2016",
//     badge: "Partenaire Volume",
//     badgeColor: "bg-yellow-100 text-yellow-800",
//     description:
//       "Produits en papier de haute qualité et systèmes de distribution pour usage commercial",
//     products: ["Papier toilette", "Essuie-tout", "Systèmes de distribution"],
//     certifications: ["Certifié FSC", "PEFC", "Écolabel européen"],
//   },
//   {
//     id: 6,
//     name: "WasteTech Solutions",
//     location: "Pays-Bas",
//     specialty: "Gestion des déchets",
//     since: "2021",
//     badge: "Partenaire Innovation",
//     badgeColor: "bg-gray-100 text-gray-800",
//     description: "Systèmes avancés de gestion des déchets et solutions de recyclage",
//     products: ["Poubelles intelligentes", "Systèmes de recyclage", "Compacteurs de déchets"],
//     certifications: ["ISO 14001", "Conforme DEEE", "Marque de qualité néerlandaise"],
//   },
//   {
//     id: 7,
//     name: "AquaPure Systems",
//     location: "Japon",
//     specialty: "Traitement de l'eau",
//     since: "2015",
//     badge: "Partenaire Technologique",
//     badgeColor: "bg-cyan-100 text-cyan-800",
//     description:
//       "Systèmes avancés de purification et de traitement de l'eau pour les applications d'hygiène",
//     products: ["Purificateurs d'eau", "Stérilisateurs UV", "Systèmes de filtration"],
//     certifications: ["Normes JIS", "Certifié NSF", "ISO 9001"],
//   },
//   {
//     id: 8,
//     name: "ChemSafe Industries",
//     location: "Royaume-Uni",
//     specialty: "Solutions chimiques",
//     since: "2014",
//     badge: "Partenaire Premium",
//     badgeColor: "bg-blue-100 text-blue-800",
//     description:
//       "Solutions chimiques de qualité professionnelle et désinfectants industriels",
//     products: [
//       "Désinfectants industriels",
//       "Nettoyants chimiques",
//       "Produits chimiques spécialisés",
//     ],
//     certifications: ["Conforme REACH", "Règlement CLP", "Normes britanniques"],
//   },
//   {
//     id: 9,
//     name: "TextileCare Pro",
//     location: "Italie",
//     specialty: "Hygiène textile",
//     since: "2019",
//     badge: "Partenaire Spécialisé",
//     badgeColor: "bg-indigo-100 text-indigo-800",
//     description:
//       "Spécialisé dans les produits d'hygiène textile et les solutions de blanchisserie",
//     products: ["Détergents pour le linge", "Désinfectants pour tissus", "Détachants"],
//     certifications: [
//       "OEKO-TEX",
//       "Écolabel européen",
//       "Certification de qualité italienne",
//     ],
//   },
//   {
//     id: 10,
//     name: "AirFresh Technologies",
//     location: "Corée du Sud",
//     specialty: "Purification de l'air",
//     since: "2020",
//     badge: "Partenaire Innovation",
//     badgeColor: "bg-gray-100 text-gray-800",
//     description: "Systèmes de purification de l'air et de contrôle des odeurs de pointe",
//     products: ["Purificateurs d'air", "Filtres HEPA", "Systèmes de contrôle des odeurs"],
//     certifications: ["Certifié HEPA", "Energy Star", "Normes coréennes"],
//   },
//   {
//     id: 11,
//     name: "FloorCare Specialists",
//     location: "Australie",
//     specialty: "Entretien des sols",
//     since: "2016",
//     badge: "Partenaire Certifié",
//     badgeColor: "bg-green-100 text-green-800",
//     description: "Produits professionnels d'entretien des sols et équipements de maintenance",
//     products: ["Nettoyants pour sols", "Systèmes de polissage", "Équipement de maintenance"],
//     certifications: [
//       "Normes australiennes",
//       "Green Building Council",
//       "ISO 9001",
//     ],
//   },
//   {
//     id: 12,
//     name: "BioSafe Solutions",
//     location: "France",
//     specialty: "Sécurité biologique",
//     since: "2018",
//     badge: "Qualité Médicale",
//     badgeColor: "bg-red-100 text-red-800",
//     description: "Produits de sécurité biologique et solutions d'hygiène de laboratoire",
//     products: ["Biocides", "Désinfectants de laboratoire", "Équipement de sécurité"],
//     certifications: ["Approuvé par l'ANSM", "Règlement UE BPR", "Normes françaises"],
//   },
//   {
//     id: 13,
//     name: "SmartDispense Tech",
//     location: "Suède",
//     specialty: "Systèmes de distribution",
//     since: "2017",
//     badge: "Partenaire Technologique",
//     badgeColor: "bg-cyan-100 text-cyan-800",
//     description: "Systèmes de distribution intelligents et solutions d'hygiène compatibles IoT",
//     products: ["Distributeurs intelligents", "Capteurs IoT", "Systèmes automatisés"],
//     certifications: ["Marquage CE", "Cygne nordique", "Normes suédoises"],
//   },
//   {
//     id: 14,
//     name: "GreenClean Innovations",
//     location: "Danemark",
//     specialty: "Technologie verte",
//     since: "2021",
//     badge: "Partenaire Écologique",
//     badgeColor: "bg-purple-100 text-purple-800",
//     description:
//       "Technologies de nettoyage vertes innovantes et solutions durables",
//     products: ["Nettoyants verts", "Emballages durables", "Produits biosourcés"],
//     certifications: ["Écolabel nordique", "Cradle to Cradle", "Normes danoises"],
//   },
//   {
//     id: 15,
//     name: "IndustrialHygiene Corp",
//     location: "Brésil",
//     specialty: "Solutions industrielles",
//     since: "2015",
//     badge: "Partenaire Volume",
//     badgeColor: "bg-yellow-100 text-yellow-800",
//     description:
//       "Solutions d'hygiène industrielle à grande échelle pour les installations de fabrication",
//     products: ["Nettoyants industriels", "Équipement de sécurité", "Solutions en vrac"],
//     certifications: ["Approuvé par l'ANVISA", "Normes brésiliennes", "ISO 45001"],
//   },
// ];

export default function SuppliersPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      {/* <header className="border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-2">
              <Shield className="h-8 w-8 text-blue-600" />
              <span className="text-2xl font-bold text-gray-900">
                HygieneMax
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
                href="/#products"
                className="text-gray-700 hover:text-blue-600 transition-colors"
              >
                Produits
              </Link>
              <Link
                href="/#about"
                className="text-gray-700 hover:text-blue-600 transition-colors"
              >
                À propos
              </Link>
              <Link
                href="/#contact"
                className="text-gray-700 hover:text-blue-600 transition-colors"
              >
                Contact
              </Link>
            </nav>
            <Button className="bg-blue-600 hover:bg-blue-700">Obtenir un devis</Button>
          </div>
        </div>
      </header> */}
      <Header />

      {/* Page Header */}
      <section className="bg-gradient-to-br from-blue-50 to-green-50 py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center mb-6">
            <Link
              href="/"
              className="flex items-center text-blue-600 hover:text-blue-700 transition-colors"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Retour à l'accueil
            </Link>
          </div>
          <div className="text-center">
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Nos fournisseurs mondiaux
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Découvrez notre réseau de fournisseurs de confiance du monde
              entier, fournissant des produits et équipements d'hygiène de la
              plus haute qualité
            </p>

            {/* Stats */}
            <div className="grid md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              <div className="bg-white rounded-lg p-6 shadow-md">
                <div className="text-3xl font-bold text-blue-600 mb-2">15+</div>
                <div className="text-gray-600">Fournisseurs affichés</div>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-md">
                <div className="text-3xl font-bold text-green-600 mb-2">12</div>
                <div className="text-gray-600">Pays</div>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-md">
                <div className="text-3xl font-bold text-purple-600 mb-2">8</div>
                <div className="text-gray-600">Spécialités</div>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-md">
                <div className="text-3xl font-bold text-orange-600 mb-2">
                  99.8%
                </div>
                <div className="text-gray-600">Note de qualité</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Search and Filter */}
      <section className="py-8 bg-white border-b">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                type="text"
                placeholder="Rechercher des fournisseurs..."
                className="pl-10 pr-4 py-2 w-full"
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Tous les fournisseurs
              </Button>
              <Button variant="outline" size="sm">
                Partenaires Premium
              </Button>
              <Button variant="outline" size="sm">
                Partenaires Écologiques
              </Button>
              <Button variant="outline" size="sm">
                Qualité Médicale
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Suppliers Grid */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* {suppliers.map((supplier) => (
              <Card key={supplier.id} className="group hover:shadow-xl transition-all duration-300">
                <CardHeader className="text-center">
                  <div className="w-24 h-24 mx-auto mb-4 bg-white rounded-lg shadow-md flex items-center justify-center">
                    <Image
                      src="/placeholder.svg?height=80&width=120"
                      alt={`${supplier.name} Logo`}
                      width={120}
                      height={80}
                      className="max-w-full max-h-full object-contain"
                    />
                  </div>
                  <CardTitle className="text-xl">{supplier.name}</CardTitle>
                  <Badge className={supplier.badgeColor}>{supplier.badge}</Badge>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center mb-4">{supplier.description}</CardDescription>

                  <div className="space-y-3 mb-4">
                    <div className="flex items-center text-sm text-gray-600">
                      <MapPin className="h-4 w-4 mr-2 text-gray-400" />
                      <span>{supplier.location}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                      <span>Partenaire depuis {supplier.since}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Award className="h-4 w-4 mr-2 text-gray-400" />
                      <span>{supplier.specialty}</span>
                    </div>
                  </div>

                  <div className="mb-4">
                    <h4 className="font-semibold text-sm text-gray-900 mb-2">Produits clés:</h4>
                    <div className="flex flex-wrap gap-1">
                      {supplier.products.slice(0, 3).map((product, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {product}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="mb-4">
                    <h4 className="font-semibold text-sm text-gray-900 mb-2">Certifications:</h4>
                    <div className="flex flex-wrap gap-1">
                      {supplier.certifications.slice(0, 2).map((cert, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {cert}
                        </Badge>
                      ))}
                      {supplier.certifications.length > 2 && (
                        <Badge variant="outline" className="text-xs">
                          +{supplier.certifications.length - 2} de plus
                        </Badge>
                      )}
                    </div>
                  </div>

                  <Button
                    variant="outline"
                    className="w-full group-hover:bg-blue-600 group-hover:text-white transition-colors"
                  >
                    Voir les détails
                  </Button>
                </CardContent>
              </Card>
            ))} */}
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
                  {/* Premium Partner */}
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
                  {/* Certified Partner */}
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
                  {/* Eco Partner */}
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
                    <span>systèmes et équipements d'hygiène</span>
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
                  {/* Medical Grade*/}
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
                    <span>équipements sanitaires</span>
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
                  {/* Volume Partner */}
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
                  {/* Innovation Partner */}
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
                  {/* Premium Partner */}
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
                  {/* Certified Partner */}
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
                    <span>technologie de pulvérisation</span>
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
                  {/* Eco Partner */}
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
                    <span>systèmes et équipements d'hygiène</span>
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
                  {/* Medical Grade*/}
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
                    <span>équipements sanitaires</span>
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
                  {/* Volume Partner */}
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
                  {/* Innovation Partner */}
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
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-blue-600">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Intéressé à devenir fournisseur ?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Rejoignez notre réseau mondial de fournisseurs de confiance et
            aidez-nous à fournir des solutions d'hygiène de qualité dans le
            monde entier
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              variant="secondary"
              className="bg-white text-blue-600 hover:bg-gray-100"
            >
              Postuler en tant que fournisseur
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-blue-600"
            >
              Télécharger les exigences
            </Button>
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
                  <Link href="#" className="hover:text-white transition-colors">
                    Carrières
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Actualités
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
