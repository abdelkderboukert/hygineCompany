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

// const suppliers = [
//   {
//     id: 1,
//     name: "CleanTech Industries",
//     location: "Germany",
//     specialty: "Cleaning Equipment",
//     since: "2018",
//     badge: "Premium Partner",
//     badgeColor: "bg-blue-100 text-blue-800",
//     description:
//       "Leading manufacturer of industrial cleaning equipment and sanitization systems",
//     products: [
//       "Industrial Cleaners",
//       "Sanitization Systems",
//       "Floor Care Equipment",
//     ],
//     certifications: ["ISO 9001", "CE Marking", "German Quality Standard"],
//   },
//   {
//     id: 2,
//     name: "SafeGuard Solutions",
//     location: "USA",
//     specialty: "PPE & Sanitizers",
//     since: "2020",
//     badge: "Certified Partner",
//     badgeColor: "bg-green-100 text-green-800",
//     description:
//       "Specialized in protective equipment and personal hygiene products",
//     products: ["Face Masks", "Hand Sanitizers", "Protective Gloves"],
//     certifications: ["FDA Approved", "NIOSH Certified", "ISO 13485"],
//   },
//   {
//     id: 3,
//     name: "EcoClean Manufacturing",
//     location: "Canada",
//     specialty: "Eco Products",
//     since: "2019",
//     badge: "Eco Partner",
//     badgeColor: "bg-purple-100 text-purple-800",
//     description:
//       "Sustainable and eco-friendly hygiene products and biodegradable solutions",
//     products: [
//       "Biodegradable Cleaners",
//       "Eco Paper Products",
//       "Green Sanitizers",
//     ],
//     certifications: ["Green Seal", "EcoLogo", "USDA BioPreferred"],
//   },
//   {
//     id: 4,
//     name: "MedHygiene Corp",
//     location: "Switzerland",
//     specialty: "Medical Hygiene",
//     since: "2017",
//     badge: "Medical Grade",
//     badgeColor: "bg-red-100 text-red-800",
//     description: "Medical-grade disinfectants and hospital hygiene solutions",
//     products: [
//       "Hospital Disinfectants",
//       "Surgical Sanitizers",
//       "Medical Equipment Cleaners",
//     ],
//     certifications: ["FDA Approved", "WHO Standards", "Swiss Medic"],
//   },
//   {
//     id: 5,
//     name: "PaperPlus Industries",
//     location: "Finland",
//     specialty: "Paper Products",
//     since: "2016",
//     badge: "Volume Partner",
//     badgeColor: "bg-yellow-100 text-yellow-800",
//     description:
//       "High-quality paper products and dispensing systems for commercial use",
//     products: ["Toilet Paper", "Paper Towels", "Dispensing Systems"],
//     certifications: ["FSC Certified", "PEFC", "EU Ecolabel"],
//   },
//   {
//     id: 6,
//     name: "WasteTech Solutions",
//     location: "Netherlands",
//     specialty: "Waste Management",
//     since: "2021",
//     badge: "Innovation Partner",
//     badgeColor: "bg-gray-100 text-gray-800",
//     description: "Advanced waste management systems and recycling solutions",
//     products: ["Smart Bins", "Recycling Systems", "Waste Compactors"],
//     certifications: ["ISO 14001", "WEEE Compliant", "Dutch Quality Mark"],
//   },
//   {
//     id: 7,
//     name: "AquaPure Systems",
//     location: "Japan",
//     specialty: "Water Treatment",
//     since: "2015",
//     badge: "Technology Partner",
//     badgeColor: "bg-cyan-100 text-cyan-800",
//     description:
//       "Advanced water purification and treatment systems for hygiene applications",
//     products: ["Water Purifiers", "UV Sterilizers", "Filtration Systems"],
//     certifications: ["JIS Standards", "NSF Certified", "ISO 9001"],
//   },
//   {
//     id: 8,
//     name: "ChemSafe Industries",
//     location: "United Kingdom",
//     specialty: "Chemical Solutions",
//     since: "2014",
//     badge: "Premium Partner",
//     badgeColor: "bg-blue-100 text-blue-800",
//     description:
//       "Professional-grade chemical solutions and industrial disinfectants",
//     products: [
//       "Industrial Disinfectants",
//       "Chemical Cleaners",
//       "Specialty Chemicals",
//     ],
//     certifications: ["REACH Compliant", "CLP Regulation", "British Standards"],
//   },
//   {
//     id: 9,
//     name: "TextileCare Pro",
//     location: "Italy",
//     specialty: "Textile Hygiene",
//     since: "2019",
//     badge: "Specialized Partner",
//     badgeColor: "bg-indigo-100 text-indigo-800",
//     description:
//       "Specialized in textile hygiene products and laundry solutions",
//     products: ["Laundry Detergents", "Fabric Sanitizers", "Stain Removers"],
//     certifications: [
//       "OEKO-TEX",
//       "EU Ecolabel",
//       "Italian Quality Certification",
//     ],
//   },
//   {
//     id: 10,
//     name: "AirFresh Technologies",
//     location: "South Korea",
//     specialty: "Air Purification",
//     since: "2020",
//     badge: "Innovation Partner",
//     badgeColor: "bg-gray-100 text-gray-800",
//     description: "Cutting-edge air purification and odor control systems",
//     products: ["Air Purifiers", "HEPA Filters", "Odor Control Systems"],
//     certifications: ["HEPA Certified", "Energy Star", "Korean Standards"],
//   },
//   {
//     id: 11,
//     name: "FloorCare Specialists",
//     location: "Australia",
//     specialty: "Floor Care",
//     since: "2016",
//     badge: "Certified Partner",
//     badgeColor: "bg-green-100 text-green-800",
//     description: "Professional floor care products and maintenance equipment",
//     products: ["Floor Cleaners", "Polishing Systems", "Maintenance Equipment"],
//     certifications: [
//       "Australian Standards",
//       "Green Building Council",
//       "ISO 9001",
//     ],
//   },
//   {
//     id: 12,
//     name: "BioSafe Solutions",
//     location: "France",
//     specialty: "Biological Safety",
//     since: "2018",
//     badge: "Medical Grade",
//     badgeColor: "bg-red-100 text-red-800",
//     description: "Biological safety products and laboratory hygiene solutions",
//     products: ["Biocides", "Lab Disinfectants", "Safety Equipment"],
//     certifications: ["ANSM Approved", "EU BPR", "French Standards"],
//   },
//   {
//     id: 13,
//     name: "SmartDispense Tech",
//     location: "Sweden",
//     specialty: "Dispensing Systems",
//     since: "2017",
//     badge: "Technology Partner",
//     badgeColor: "bg-cyan-100 text-cyan-800",
//     description: "Smart dispensing systems and IoT-enabled hygiene solutions",
//     products: ["Smart Dispensers", "IoT Sensors", "Automated Systems"],
//     certifications: ["CE Marking", "Nordic Swan", "Swedish Standards"],
//   },
//   {
//     id: 14,
//     name: "GreenClean Innovations",
//     location: "Denmark",
//     specialty: "Green Technology",
//     since: "2021",
//     badge: "Eco Partner",
//     badgeColor: "bg-purple-100 text-purple-800",
//     description:
//       "Innovative green cleaning technologies and sustainable solutions",
//     products: ["Green Cleaners", "Sustainable Packaging", "Bio-based Products"],
//     certifications: ["Nordic Ecolabel", "Cradle to Cradle", "Danish Standards"],
//   },
//   {
//     id: 15,
//     name: "IndustrialHygiene Corp",
//     location: "Brazil",
//     specialty: "Industrial Solutions",
//     since: "2015",
//     badge: "Volume Partner",
//     badgeColor: "bg-yellow-100 text-yellow-800",
//     description:
//       "Large-scale industrial hygiene solutions for manufacturing facilities",
//     products: ["Industrial Cleaners", "Safety Equipment", "Bulk Solutions"],
//     certifications: ["ANVISA Approved", "Brazilian Standards", "ISO 45001"],
//   },
// ];

export default function SuppliersPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 sticky top-0 z-50">
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
                Home
              </Link>
              <Link
                href="/#products"
                className="text-gray-700 hover:text-blue-600 transition-colors"
              >
                Products
              </Link>
              <Link
                href="/#about"
                className="text-gray-700 hover:text-blue-600 transition-colors"
              >
                About
              </Link>
              <Link
                href="/#contact"
                className="text-gray-700 hover:text-blue-600 transition-colors"
              >
                Contact
              </Link>
            </nav>
            <Button className="bg-blue-600 hover:bg-blue-700">Get Quote</Button>
          </div>
        </div>
      </header>

      {/* Page Header */}
      <section className="bg-gradient-to-br from-blue-50 to-green-50 py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center mb-6">
            <Link
              href="/"
              className="flex items-center text-blue-600 hover:text-blue-700 transition-colors"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back to Home
            </Link>
          </div>
          <div className="text-center">
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Our Global Suppliers
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Meet our trusted network of suppliers from around the world,
              providing the highest quality hygiene products and equipment
            </p>

            {/* Stats */}
            <div className="grid md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              <div className="bg-white rounded-lg p-6 shadow-md">
                <div className="text-3xl font-bold text-blue-600 mb-2">15+</div>
                <div className="text-gray-600">Suppliers Shown</div>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-md">
                <div className="text-3xl font-bold text-green-600 mb-2">12</div>
                <div className="text-gray-600">Countries</div>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-md">
                <div className="text-3xl font-bold text-purple-600 mb-2">8</div>
                <div className="text-gray-600">Specialties</div>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-md">
                <div className="text-3xl font-bold text-orange-600 mb-2">
                  99.8%
                </div>
                <div className="text-gray-600">Quality Rating</div>
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
                placeholder="Search suppliers..."
                className="pl-10 pr-4 py-2 w-full"
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                All Suppliers
              </Button>
              <Button variant="outline" size="sm">
                Premium Partners
              </Button>
              <Button variant="outline" size="sm">
                Eco Partners
              </Button>
              <Button variant="outline" size="sm">
                Medical Grade
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
                      <span>Partner since {supplier.since}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Award className="h-4 w-4 mr-2 text-gray-400" />
                      <span>{supplier.specialty}</span>
                    </div>
                  </div>

                  <div className="mb-4">
                    <h4 className="font-semibold text-sm text-gray-900 mb-2">Key Products:</h4>
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
                          +{supplier.certifications.length - 2} more
                        </Badge>
                      )}
                    </div>
                  </div>

                  <Button
                    variant="outline"
                    className="w-full group-hover:bg-blue-600 group-hover:text-white transition-colors"
                  >
                    View Details
                  </Button>
                </CardContent>
              </Card>
            ))} */}
            <Card className="group hover:shadow-xl transition-all duration-300">
              <CardHeader className="text-center">
                <div className="w-24 h-24 mx-auto mb-4 bg-white rounded-lg shadow-md flex items-center justify-center">
                  <Image
                    src="/heute-removebg-preview.png"
                    alt="Supplier 1 Logo"
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
                  Leading manufacturer of industrial cleaning equipment and
                  sanitization systems
                </CardDescription>
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex justify-between">
                    <span>Location:</span>
                    <span>Germany</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Speciality:</span>
                    <span>Cleaning Equipment</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Since:</span>
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
                    alt="Supplier 2 Logo"
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
                  Manufacturing of precision spray nozzles
                </CardDescription>
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex justify-between">
                    <span>Location:</span>
                    <span>Germany</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Speciality:</span>
                    <span>spray technology</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Since:</span>
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
                    alt="Supplier 3 Logo"
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
                  Production, marketing, and distribution of professional
                  cleaning and hygiene systems and equipment
                </CardDescription>
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex justify-between">
                    <span>Location:</span>
                    <span>France</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Speciality:</span>
                    <span>hygiene systems and equipment</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Since:</span>
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
                    alt="Supplier 4 Logo"
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
                  They are known for durable, ergonomic, safe, and hygienic
                  products designed for intensive use
                </CardDescription>
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex justify-between">
                    <span>Location:</span>
                    <span>France</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Speciality:</span>
                    <span>sanitary equipment</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Since:</span>
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
                    alt="Supplier 5 Logo"
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
                  Manufacturing of professional cleaning equipment and
                  accessories
                </CardDescription>
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex justify-between">
                    <span>Location:</span>
                    <span>Italy</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Speciality:</span>
                    <span>
                      Manufacturing of professional cleaning equipment and
                      accessories
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Since:</span>
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
                    alt="Supplier 6 Logo"
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
                  Advanced waste management systems and recycling solutions
                </CardDescription>
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex justify-between">
                    <span>Location:</span>
                    <span>Sweden</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Speciality:</span>
                    <span>Professional hygiene solutions and products</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Since:</span>
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
                    alt="Supplier 1 Logo"
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
                  Leading manufacturer of industrial cleaning equipment and
                  sanitization systems
                </CardDescription>
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex justify-between">
                    <span>Location:</span>
                    <span>Germany</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Speciality:</span>
                    <span>Cleaning Equipment</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Since:</span>
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
                    alt="Supplier 2 Logo"
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
                  Manufacturing of precision spray nozzles
                </CardDescription>
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex justify-between">
                    <span>Location:</span>
                    <span>Germany</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Speciality:</span>
                    <span>spray technology</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Since:</span>
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
                    alt="Supplier 3 Logo"
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
                  Production, marketing, and distribution of professional
                  cleaning and hygiene systems and equipment
                </CardDescription>
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex justify-between">
                    <span>Location:</span>
                    <span>France</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Speciality:</span>
                    <span>hygiene systems and equipment</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Since:</span>
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
                    alt="Supplier 4 Logo"
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
                  They are known for durable, ergonomic, safe, and hygienic
                  products designed for intensive use
                </CardDescription>
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex justify-between">
                    <span>Location:</span>
                    <span>France</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Speciality:</span>
                    <span>sanitary equipment</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Since:</span>
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
                    alt="Supplier 5 Logo"
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
                  Manufacturing of professional cleaning equipment and
                  accessories
                </CardDescription>
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex justify-between">
                    <span>Location:</span>
                    <span>Italy</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Speciality:</span>
                    <span>
                      Manufacturing of professional cleaning equipment and
                      accessories
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Since:</span>
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
                    alt="Supplier 6 Logo"
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
                  Advanced waste management systems and recycling solutions
                </CardDescription>
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex justify-between">
                    <span>Location:</span>
                    <span>Sweden</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Speciality:</span>
                    <span>Professional hygiene solutions and products</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Since:</span>
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
            Interested in Becoming a Supplier?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join our global network of trusted suppliers and help us deliver
            quality hygiene solutions worldwide
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              variant="secondary"
              className="bg-white text-blue-600 hover:bg-gray-100"
            >
              Apply as Supplier
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-blue-600"
            >
              Download Requirements
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
                Your trusted partner for premium hygiene products and equipment.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Products</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Hand Sanitizers
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Cleaning Equipment
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Protective Gear
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Disinfectants
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/" className="hover:text-white transition-colors">
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    href="/suppliers"
                    className="hover:text-white transition-colors"
                  >
                    Suppliers
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    News
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Product Guides
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Warranty
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Returns
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 HygieneMax. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
