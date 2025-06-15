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
    tagline: "Premium Hygiene Solutions",
    description:
      "Leading provider of professional hygiene products and equipment for healthcare, commercial, and industrial sectors.",
    specialties: [
      "Sterilization Chemicals",
      "Cleaning Equipment",
      "Protective Gear",
      "Surface Disinfectants",
    ],
    established: "2008",
    employees: "150+",
    markets: ["Healthcare", "Food Service", "Manufacturing", "Education"],
    logo: "/placeholder.svg?height=80&width=120",
    image: "/placeholder.svg?height=300&width=400",
    color: "blue",
    website: "www.hygiendust.com",
  },
  {
    id: "cleantech-solutions",
    name: "CleanTech Solutions",
    tagline: "Industrial Cleaning Innovation",
    description:
      "Specialized in heavy-duty industrial cleaning systems and automated cleaning technologies for manufacturing facilities.",
    specialties: [
      "Industrial Cleaners",
      "Automated Systems",
      "Pressure Washers",
      "Floor Care Equipment",
    ],
    established: "2012",
    employees: "85+",
    markets: ["Manufacturing", "Automotive", "Aerospace", "Heavy Industry"],
    logo: "/placeholder.svg?height=80&width=120",
    image: "/placeholder.svg?height=300&width=400",
    color: "green",
    website: "www.cleantech-solutions.com",
  },
  {
    id: "biocare-labs",
    name: "BioCare Laboratories",
    tagline: "Scientific Excellence in Hygiene",
    description:
      "Research and development laboratory specializing in advanced antimicrobial solutions and testing services.",
    specialties: [
      "R&D Services",
      "Product Testing",
      "Custom Formulations",
      "Quality Assurance",
    ],
    established: "2015",
    employees: "45+",
    markets: [
      "Pharmaceutical",
      "Biotechnology",
      "Research Institutions",
      "Government",
    ],
    logo: "/placeholder.svg?height=80&width=120",
    image: "/placeholder.svg?height=300&width=400",
    color: "purple",
    website: "www.biocare-labs.com",
  },
  {
    id: "ecogreen-hygiene",
    name: "EcoGreen Hygiene",
    tagline: "Sustainable Cleaning Solutions",
    description:
      "Eco-friendly hygiene products manufacturer focused on biodegradable and sustainable cleaning solutions.",
    specialties: [
      "Eco-Friendly Products",
      "Biodegradable Cleaners",
      "Green Certifications",
      "Sustainable Packaging",
    ],
    established: "2018",
    employees: "60+",
    markets: ["Hospitality", "Retail", "Office Buildings", "Residential"],
    logo: "/placeholder.svg?height=80&width=120",
    image: "/placeholder.svg?height=300&width=400",
    color: "emerald",
    website: "www.ecogreen-hygiene.com",
  },
  {
    id: "medsteril-pro",
    name: "MedSteril Pro",
    tagline: "Medical Grade Sterilization",
    description:
      "Specialized in medical-grade sterilization equipment and validation services for healthcare facilities.",
    specialties: [
      "Autoclaves",
      "Sterilization Validation",
      "Medical Equipment",
      "Compliance Services",
    ],
    established: "2010",
    employees: "70+",
    markets: ["Hospitals", "Clinics", "Dental Practices", "Veterinary"],
    logo: "/placeholder.svg?height=80&width=120",
    image: "/placeholder.svg?height=300&width=400",
    color: "red",
    website: "www.medsteril-pro.com",
  },
  {
    id: "aquapure-systems",
    name: "AquaPure Systems",
    tagline: "Water Treatment Excellence",
    description:
      "Advanced water treatment and purification systems for industrial and commercial applications.",
    specialties: [
      "Water Purification",
      "Treatment Systems",
      "Filtration Technology",
      "Water Testing",
    ],
    established: "2014",
    employees: "55+",
    markets: [
      "Water Treatment",
      "Food & Beverage",
      "Pharmaceuticals",
      "Municipal",
    ],
    logo: "/placeholder.svg?height=80&width=120",
    image: "/placeholder.svg?height=300&width=400",
    color: "cyan",
    website: "www.aquapure-systems.com",
  },
];

const milestones = [
  {
    year: "2008",
    title: "Foundation",
    description:
      "HygienDust Group established with HygienDust as the flagship company",
    icon: Building,
  },
  {
    year: "2010",
    title: "Medical Expansion",
    description:
      "Launched MedSteril Pro to serve healthcare sector with specialized sterilization solutions",
    icon: Shield,
  },
  {
    year: "2012",
    title: "Industrial Growth",
    description:
      "Founded CleanTech Solutions to address heavy-duty industrial cleaning needs",
    icon: Factory,
  },
  {
    year: "2014",
    title: "Water Treatment",
    description:
      "Established AquaPure Systems to expand into water treatment and purification",
    icon: Beaker,
  },
  {
    year: "2015",
    title: "Research & Development",
    description:
      "Opened BioCare Laboratories for advanced research and product development",
    icon: Beaker,
  },
  {
    year: "2018",
    title: "Sustainability Focus",
    description:
      "Launched EcoGreen Hygiene to lead in sustainable and eco-friendly solutions",
    icon: Globe,
  },
  {
    year: "2024",
    title: "Global Presence",
    description:
      "Expanded to serve customers in over 25 countries with 465+ employees",
    icon: Globe,
  },
];

const values = [
  {
    icon: Target,
    title: "Excellence",
    description:
      "We strive for the highest standards in everything we do, from product quality to customer service.",
  },
  {
    icon: Shield,
    title: "Safety",
    description:
      "Safety is our top priority - for our customers, employees, and the communities we serve.",
  },
  {
    icon: Globe,
    title: "Sustainability",
    description:
      "We're committed to protecting the environment through sustainable practices and eco-friendly solutions.",
  },
  {
    icon: Users,
    title: "Innovation",
    description:
      "We continuously invest in research and development to bring cutting-edge solutions to market.",
  },
  {
    icon: Heart,
    title: "Integrity",
    description:
      "We conduct business with honesty, transparency, and respect for all stakeholders.",
  },
  {
    icon: Award,
    title: "Partnership",
    description:
      "We build long-term relationships based on trust, reliability, and mutual success.",
  },
];

const leadership = [
  {
    name: "Dr. Sarah Mitchell",
    position: "Chief Executive Officer",
    bio: "With over 20 years in the hygiene industry, Dr. Mitchell leads HygienDust Group's strategic vision and global expansion.",
    image: "/placeholder.svg?height=200&width=200",
    linkedin: "#",
  },
  {
    name: "Michael Chen",
    position: "Chief Technology Officer",
    bio: "Michael oversees R&D across all group companies, driving innovation in hygiene and sterilization technologies.",
    image: "/placeholder.svg?height=200&width=200",
    linkedin: "#",
  },
  {
    name: "Dr. Elena Rodriguez",
    position: "Chief Scientific Officer",
    bio: "Dr. Rodriguez leads our scientific initiatives and ensures all products meet the highest safety and efficacy standards.",
    image: "/placeholder.svg?height=200&width=200",
    linkedin: "#",
  },
  {
    name: "James Thompson",
    position: "Chief Operations Officer",
    bio: "James manages global operations, ensuring efficient manufacturing and distribution across all group companies.",
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
              <span className="text-2xl font-bold text-gray-900">HygienDust</span>
            </div>
            <nav className="hidden md:flex space-x-8">
              <Link href="/" className="text-gray-700 hover:text-blue-600 transition-colors">
                Home
              </Link>
              <Link href="/products" className="text-gray-700 hover:text-blue-600 transition-colors">
                Products
              </Link>
              <Link href="/about" className="text-blue-600 font-medium">
                About
              </Link>
              <Link href="/suppliers" className="text-gray-700 hover:text-blue-600 transition-colors">
                Suppliers
              </Link>
              <Link href="/#contact" className="text-gray-700 hover:text-blue-600 transition-colors">
                Contact
              </Link>
            </nav>
            {/* <Button className="bg-blue-600 hover:bg-blue-700">Get Quote</Button> */}
          </div>
        </div>
      </header>
      {/* <Header /> */}

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-green-50 py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <Badge className="mb-4 bg-blue-100 text-blue-800 hover:bg-blue-100">
              About HygienDust Group
            </Badge>
            <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
              Leading the Future of
              <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                {" "}
                Hygiene Innovation
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              For over 15 years, HygienDust Group has been at the forefront of
              hygiene technology, providing comprehensive solutions through our
              family of specialized companies.
            </p>
            <div className="grid md:grid-cols-3 gap-6 max-w-3xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">6</div>
                <div className="text-gray-600">Companies</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">
                  465+
                </div>
                <div className="text-gray-600">Employees</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600 mb-2">
                  5+
                </div>
                <div className="text-gray-600">Countries</div>
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
                    Our Mission
                  </h2>
                </div>
                <p className="text-lg text-gray-600">
                  To protect public health and safety by providing innovative,
                  reliable, and sustainable hygiene solutions that exceed
                  industry standards and customer expectations.
                </p>
              </div>
              <div>
                <div className="flex items-center mb-4">
                  <Eye className="h-8 w-8 text-green-600 mr-3" />
                  <h2 className="text-3xl font-bold text-gray-900">
                    Our Vision
                  </h2>
                </div>
                <p className="text-lg text-gray-600">
                  To be the global leader in hygiene innovation, creating a
                  cleaner, safer, and more sustainable world for future
                  generations through cutting-edge technology and responsible
                  business practices.
                </p>
              </div>
            </div>
            <div className="relative">
              <Image
                src="/placeholder.svg?height=500&width=600"
                alt="HygienDust Group Mission and Vision"
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
              Our Core Values
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              These values guide every decision we make and every solution we
              deliver
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
              Our Group Companies
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Six specialized companies working together to provide
              comprehensive hygiene solutions
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
                        Est. {company.established}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="p-6">
                    <p className="text-gray-600 mb-4">{company.description}</p>

                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <div className="flex items-center text-sm text-gray-500 mb-1">
                          <Users className="h-4 w-4 mr-1" />
                          Employees
                        </div>
                        <div className="font-medium">{company.employees}</div>
                      </div>
                      <div>
                        <div className="flex items-center text-sm text-gray-500 mb-1">
                          <Globe className="h-4 w-4 mr-1" />
                          Website
                        </div>
                        <div className="font-medium text-sm">
                          {company.website}
                        </div>
                      </div>
                    </div>

                    <div className="mb-4">
                      <h4 className="font-medium text-gray-900 mb-2">
                        Specialties:
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
                        Key Markets:
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
                      Learn More
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
              Our Journey
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Key milestones in the growth and evolution of HygienDust Group
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
              Leadership Team
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Meet the experienced leaders driving innovation and growth across
              HygienDust Group
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
                    LinkedIn Profile
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
              Global Presence
            </h2>
            <p className="text-xl text-blue-100 mb-12 max-w-3xl mx-auto">
              Serving customers worldwide with local expertise and global
              standards
            </p>
            <div className="grid md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-4xl font-bold mb-2">25+</div>
                <div className="text-blue-100">Countries Served</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold mb-2">1000+</div>
                <div className="text-blue-100">Active Customers</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold mb-2">50+</div>
                <div className="text-blue-100">Distribution Partners</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold mb-2">99.8%</div>
                <div className="text-blue-100">Customer Satisfaction</div>
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
                Ready to Partner with Us?
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Join thousands of satisfied customers who trust HygienDust Group
                for their hygiene and sterilization needs
              </p>
            </div>
            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                <Phone className="h-5 w-5 mr-2" />
                Contact Sales Team
              </Button>
              <Button size="lg" variant="outline">
                <Mail className="h-5 w-5 mr-2" />
                Request Information
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
                Leading the future of hygiene innovation through our family of
                specialized companies.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Group Companies</h3>
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
              <h3 className="font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/" className="hover:text-white transition-colors">
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    href="/products"
                    className="hover:text-white transition-colors"
                  >
                    Products
                  </Link>
                </li>
                <li>
                  <Link
                    href="/about"
                    className="hover:text-white transition-colors"
                  >
                    About Us
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
                  Global Headquarters
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 HygienDust Group. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
