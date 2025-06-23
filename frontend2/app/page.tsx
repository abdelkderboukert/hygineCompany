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
                Home
              </Link>
              <Link href="#products" className="text-gray-700 hover:text-blue-600 transition-colors">
                Products
              </Link>
              <Link href="#about" className="text-gray-700 hover:text-blue-600 transition-colors">
                About
              </Link>
              <Link href="#contact" className="text-gray-700 hover:text-blue-600 transition-colors">
                Contact
              </Link>
            </nav>
            <Button className="bg-blue-600 hover:bg-blue-700">Get Quote</Button>
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
                Professional Hygiene Solutions
              </Badge>
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
                Premium Hygiene Products & Equipment
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Providing businesses and institutions with top-quality hygiene
                products and equipment. From sanitizers to industrial cleaning
                equipment, we ensure the highest standards of cleanliness.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                  <Link href="#products">View Products</Link>
                </Button>
                <Button size="lg" variant="outline">
                  Contact Sales
                </Button>
              </div>
            </div>
            <div className="relative">
              <Image
                src="/main2.jpg"
                alt="Hygiene products and equipment"
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
              Why Choose Hygindust?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We provide comprehensive hygiene solutions with unmatched quality
              and service
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center border-0 shadow-lg">
              <CardHeader>
                <Shield className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <CardTitle>Certified Quality</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  All our products meet international hygiene and safety
                  standards with proper certifications
                </CardDescription>
              </CardContent>
            </Card>
            <Card className="text-center border-0 shadow-lg">
              <CardHeader>
                <Truck className="h-12 w-12 text-green-600 mx-auto mb-4" />
                <CardTitle>Fast Delivery</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Quick and reliable delivery service to ensure your hygiene
                  supplies never run out
                </CardDescription>
              </CardContent>
            </Card>
            <Card className="text-center border-0 shadow-lg">
              <CardHeader>
                <Award className="h-12 w-12 text-purple-600 mx-auto mb-4" />
                <CardTitle>Expert Support</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Professional consultation and ongoing support for all your
                  hygiene equipment needs
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
              Our Product Categories
            </h2>
            <p className="text-xl text-gray-600">
              Comprehensive range of hygiene products and equipment for every
              need
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
            <Card className="group hover:shadow-xl transition-shadow">
              <CardHeader>
                <Image
                  src="/bidon.png?height=200&width=300"
                  alt="Hand sanitizers"
                  width={300}
                  height={200}
                  className="rounded-lg mb-4 mx-auto w-full"
                />
                <CardTitle>Cleaning Products</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="mb-4">
                  Premium quality hand sanitizers, antibacterial soaps, and
                  dispensers for all environments
                </CardDescription>
                <Button
                  variant="outline"
                  className="w-full group-hover:bg-blue-600 group-hover:text-white transition-colors"
                >
                  <Link href="/products/">View Products</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-xl transition-shadow">
              <CardHeader>
                <Image
                  src="/equp.png?height=200&width=300"
                  alt="Cleaning equipment"
                  width={300}
                  height={200}
                  className="rounded-lg mb-4 mx-auto w-full"
                />
                <CardTitle>Cleaning Equipment</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="mb-4">
                  Industrial-grade cleaning machines, vacuum cleaners, and
                  maintenance equipment
                </CardDescription>
                <Button
                  variant="outline"
                  className="w-full group-hover:bg-blue-600 group-hover:text-white transition-colors"
                >
                  <Link href="/Equipment/">View Products</Link>
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
                About Hygindut
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                With over 15 years of experience in the hygiene industry,
                Hygindut has been the trusted partner for businesses, healthcare
                facilities, schools, and institutions across the region.
              </p>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-6 w-6 text-green-600 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      Quality Assurance
                    </h3>
                    <p className="text-gray-600">
                      All products undergo rigorous quality testing
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-6 w-6 text-green-600 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      Competitive Pricing
                    </h3>
                    <p className="text-gray-600">
                      Best prices without compromising on quality
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-6 w-6 text-green-600 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      Custom Solutions
                    </h3>
                    <p className="text-gray-600">
                      Tailored hygiene programs for your specific needs
                    </p>
                  </div>
                </div>
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                  <Link href="/about">About Us</Link>
                </Button>
              </div>
            </div>
            <div>
              <Image
                src="/IMG_4530.jpg"
                alt="About Hygindut"
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
              Our Trusted Suppliers
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We partner with leading manufacturers worldwide to bring you the
              highest quality hygiene products
            </p>
          </div>

          {/* Featured Suppliers */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
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

          {/* Supplier Stats */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Our Global Network
              </h3>
              <p className="text-gray-600">
                Building partnerships worldwide to serve you better
              </p>
            </div>
            <div className="grid md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-3xl font-bold text-blue-600 mb-2">10+</div>
                <div className="text-gray-600">Trusted Suppliers</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-green-600 mb-2">15</div>
                <div className="text-gray-600">Countries</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-purple-600 mb-2">
                  500+
                </div>
                <div className="text-gray-600">Products Available</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-orange-600 mb-2">
                  99.8%
                </div>
                <div className="text-gray-600">Quality Rating</div>
              </div>
            </div>
          </div>

          {/* View All Suppliers Button */}
          <div className="text-center mt-12">
            <Link href="/suppliers">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 px-8">
                View All Suppliers
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
              Become Our Supplier
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Join our network of trusted suppliers and help us deliver quality
              hygiene solutions worldwide
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Supplier Requirements
              </h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-6 w-6 text-green-600 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-gray-900">
                      Quality Certifications
                    </h4>
                    <p className="text-gray-600">
                      ISO 9001, FDA, CE, or equivalent quality certifications
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-6 w-6 text-green-600 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-gray-900">
                      Production Capacity
                    </h4>
                    <p className="text-gray-600">
                      Ability to meet large-scale orders and maintain consistent
                      supply
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-6 w-6 text-green-600 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-gray-900">
                      Compliance Standards
                    </h4>
                    <p className="text-gray-600">
                      Adherence to international hygiene and safety regulations
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-6 w-6 text-green-600 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-gray-900">
                      Competitive Pricing
                    </h4>
                    <p className="text-gray-600">
                      Competitive wholesale pricing with volume discounts
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <Image
                src="/IMG_4560.png?height=400&width=500"
                alt="Supplier partnership"
                width={500}
                height={400}
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>

          <div className="bg-blue-50 rounded-2xl p-8">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Supplier Benefits
              </h3>
              <p className="text-gray-600">
                What you get when you partner with Hygindut
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="bg-blue-600 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Truck className="h-6 w-6 text-white" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">
                  Global Distribution
                </h4>
                <p className="text-gray-600 text-sm">
                  Access to our extensive distribution network
                </p>
              </div>
              <div className="text-center">
                <div className="bg-green-600 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="h-6 w-6 text-white" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">
                  Long-term Contracts
                </h4>
                <p className="text-gray-600 text-sm">
                  Stable, long-term partnership agreements
                </p>
              </div>
              <div className="text-center">
                <div className="bg-purple-600 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-6 w-6 text-white" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">
                  Brand Support
                </h4>
                <p className="text-gray-600 text-sm">
                  Marketing and promotional support
                </p>
              </div>
            </div>
            <div className="text-center mt-8">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                Apply as Supplier
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
              Contact Us
            </h2>
            <p className="text-xl text-gray-600">
              Get in touch with our team for quotes, support, or partnership
              opportunities
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Send us a Message
              </h3>
              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="firstName"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      First Name *
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="John"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="lastName"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Last Name *
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Doe"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="john@company.com"
                  />
                </div>

                <div>
                  <label
                    htmlFor="company"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Company Name
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Your Company"
                  />
                </div>

                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="+1 (555) 123-4567"
                  />
                </div>

                <div>
                  <label
                    htmlFor="subject"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Subject *
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select a subject</option>
                    <option value="product-inquiry">Product Inquiry</option>
                    <option value="bulk-order">Bulk Order Quote</option>
                    <option value="supplier-application">
                      Supplier Application
                    </option>
                    <option value="technical-support">Technical Support</option>
                    <option value="partnership">Partnership Opportunity</option>
                    <option value="other">Other</option>
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
                    rows={5}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                    placeholder="Tell us about your requirements..."
                  ></textarea>
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full bg-blue-600 hover:bg-blue-700"
                >
                  Send Message
                </Button>
              </form>
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">
                  Get in Touch
                </h3>
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="bg-blue-100 p-3 rounded-lg">
                      <Phone className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Phone</h4>
                      <p className="text-gray-600">+213 (0) 7 70 10 51 21</p>
                      <p className="text-gray-600">+213 (0) 7 70 10 51 21</p>
                      <p className="text-sm text-gray-500">
                        Mon-Fri 8AM-4PM EST
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
                      <h4 className="font-semibold text-gray-900">Address</h4>
                      <p className="text-gray-600">Village benramdan</p>
                      <p className="text-gray-600">Ilot 102 n°2 chbli</p>
                      <p className="text-gray-600">Wilaya Blida</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-blue-600 rounded-2xl shadow-lg p-8 text-white">
                <h3 className="text-2xl font-bold mb-4">
                  Need Immediate Assistance?
                </h3>
                <p className="mb-6">
                  Our sales team is ready to help you find the right hygiene
                  solutions for your business.
                </p>
                <div className="space-y-3">
                  <Button
                    variant="secondary"
                    size="lg"
                    className="w-full bg-white text-blue-600 hover:bg-gray-100"
                  >
                    Schedule a Call
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    className="w-full border-white text-white hover:bg-white hover:text-blue-600"
                  >
                    Request Quote
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
                  <Link href="#" className="hover:text-white transition-colors">
                    About Us
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
            <p>&copy; 2024 Hygindust. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
