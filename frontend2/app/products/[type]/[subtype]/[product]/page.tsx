"use client";

import { useState } from "react";
import Image from "next/image";
import type { Product } from "@/lib/firebase-admin";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {Header} from "@/components/Header";
import {
  ShoppingCart,
  Download,
  Shield,
  CheckCircle,
  AlertTriangle,
  Package,
  FileText,
  Calendar,
  Ruler,
  Weight,
  BarChart3,
} from "lucide-react";

interface ProductDetailPageProps {
  product: Product;
}

const sampleProduct: Product = {
  id: "prod-001",
  name: "Professional Grade Industrial Cleaner",
  brand: "CleanTech Pro",
  description:
    "Our Professional Grade Industrial Cleaner is a powerful, multi-surface cleaning solution designed for heavy-duty industrial applications. Formulated with advanced biodegradable compounds, it effectively removes grease, oil, dirt, and grime while being environmentally responsible. This concentrated formula provides exceptional cleaning power while maintaining safety standards for professional use.",
  shortDescription:
    "Heavy-duty industrial cleaner with biodegradable formula for professional applications",
  image: "/placeholder.svg?height=600&width=600",
  additionalImages: [
    "/placeholder.svg?height=400&width=400",
    "/placeholder.svg?height=400&width=400",
    "/placeholder.svg?height=400&width=400",
    "/placeholder.svg?height=400&width=400",
  ],
  features: [
    "Biodegradable formula",
    "Heavy-duty cleaning power",
    "Multi-surface compatibility",
    "Concentrated solution",
    "Professional grade",
    "Environmentally safe",
    "Quick-acting formula",
    "Non-toxic when used as directed",
  ],
  sizes: [
    {
      size: "500ml",
      sku: "CTP-500",
      caseQty: 12,
      dimensions: "8.5 x 8.5 x 25 cm",
      weight: "0.6 kg",
      barcode: "1234567890123",
    },
    {
      size: "1L",
      sku: "CTP-1000",
      caseQty: 6,
      dimensions: "10 x 10 x 30 cm",
      weight: "1.1 kg",
      barcode: "1234567890124",
    },
    {
      size: "5L",
      sku: "CTP-5000",
      caseQty: 2,
      dimensions: "20 x 15 x 35 cm",
      weight: "5.2 kg",
      barcode: "1234567890125",
    },
  ],
  certifications: [
    {
      name: "ISO 14001",
      description: "Environmental Management System Certification",
      issueDate: "2023-01-15",
      expiryDate: "2026-01-15",
    },
    {
      name: "EPA Safer Choice",
      description: "EPA recognition for safer chemical ingredients",
      issueDate: "2023-03-20",
      expiryDate: "2025-03-20",
    },
  ],
  specifications: {
    "pH Level": "7.5 - 8.5",
    Density: "1.02 g/cm³",
    Viscosity: "Low",
    Color: "Clear Blue",
    Odor: "Mild Fresh Scent",
    Solubility: "Completely water soluble",
    "Storage Temperature": "5°C to 40°C",
    "Shelf Life": "24 months",
  },
  usage: {
    application:
      "Suitable for industrial equipment, machinery, floors, walls, and general surface cleaning in manufacturing facilities, warehouses, and commercial spaces.",
    frequency:
      "Use as needed for regular maintenance cleaning or intensive deep cleaning sessions. For routine cleaning, dilute 1:10 with water. For heavy-duty cleaning, use 1:5 dilution.",
    precautions: [
      "Wear protective gloves when handling concentrated solution",
      "Ensure adequate ventilation during use",
      "Do not mix with other cleaning products",
      "Keep out of reach of children",
      "Avoid contact with eyes and skin",
      "Store in original container only",
    ],
    suitableFor: [
      "Manufacturing facilities",
      "Warehouses",
      "Commercial kitchens",
      "Automotive workshops",
      "Industrial equipment",
      "Concrete floors",
      "Metal surfaces",
      "Painted surfaces",
    ],
  },
  documents: {
    productDatasheet: "available",
    technicalData: "available",
    safetyDataSheet: "available",
    usageInstructions: "available",
    certificationDocuments: "available",
    qualityReport: "available",
    complianceDocuments: undefined,
  },
  theme: {
    gradient: "from-blue-600 to-cyan-600",
    bgColor: "bg-blue-50",
    iconColor: "text-blue-600",
    borderColor: "border-blue-200",
    hoverColor: "hover:bg-blue-100",
    overlayGradient: "from-blue-900/20 to-cyan-900/20",
  },
  createdAt: new Date("2023-01-01"),
  updatedAt: new Date("2023-12-01"),
};

export default function ProductDetailPage() {
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState(0);

  const product: Product = {
    id: "prod-001",
    name: "Professional Grade Industrial Cleaner",
    brand: "CleanTech Pro",
    description:
      "Our Professional Grade Industrial Cleaner is a powerful, multi-surface cleaning solution designed for heavy-duty industrial applications. Formulated with advanced biodegradable compounds, it effectively removes grease, oil, dirt, and grime while being environmentally responsible. This concentrated formula provides exceptional cleaning power while maintaining safety standards for professional use.",
    shortDescription:
      "Heavy-duty industrial cleaner with biodegradable formula for professional applications",
    image: "/placeholder.svg?height=600&width=600",
    additionalImages: [
      "/placeholder.svg?height=400&width=400",
      "/placeholder.svg?height=400&width=400",
      "/placeholder.svg?height=400&width=400",
      "/placeholder.svg?height=400&width=400",
    ],
    features: [
      "Biodegradable formula",
      "Heavy-duty cleaning power",
      "Multi-surface compatibility",
      "Concentrated solution",
      "Professional grade",
      "Environmentally safe",
      "Quick-acting formula",
      "Non-toxic when used as directed",
    ],
    sizes: [
      {
        size: "500ml",
        sku: "CTP-500",
        caseQty: 12,
        dimensions: "8.5 x 8.5 x 25 cm",
        weight: "0.6 kg",
        barcode: "1234567890123",
      },
      {
        size: "1L",
        sku: "CTP-1000",
        caseQty: 6,
        dimensions: "10 x 10 x 30 cm",
        weight: "1.1 kg",
        barcode: "1234567890124",
      },
      {
        size: "5L",
        sku: "CTP-5000",
        caseQty: 2,
        dimensions: "20 x 15 x 35 cm",
        weight: "5.2 kg",
        barcode: "1234567890125",
      },
    ],
    certifications: [
      {
        name: "ISO 14001",
        description: "Environmental Management System Certification",
        issueDate: "2023-01-15",
        expiryDate: "2026-01-15",
      },
      {
        name: "EPA Safer Choice",
        description: "EPA recognition for safer chemical ingredients",
        issueDate: "2023-03-20",
        expiryDate: "2025-03-20",
      },
    ],
    specifications: {
      "pH Level": "7.5 - 8.5",
      Density: "1.02 g/cm³",
      Viscosity: "Low",
      Color: "Clear Blue",
      Odor: "Mild Fresh Scent",
      Solubility: "Completely water soluble",
      "Storage Temperature": "5°C to 40°C",
      "Shelf Life": "24 months",
    },
    usage: {
      application:
        "Suitable for industrial equipment, machinery, floors, walls, and general surface cleaning in manufacturing facilities, warehouses, and commercial spaces.",
      frequency:
        "Use as needed for regular maintenance cleaning or intensive deep cleaning sessions. For routine cleaning, dilute 1:10 with water. For heavy-duty cleaning, use 1:5 dilution.",
      precautions: [
        "Wear protective gloves when handling concentrated solution",
        "Ensure adequate ventilation during use",
        "Do not mix with other cleaning products",
        "Keep out of reach of children",
        "Avoid contact with eyes and skin",
        "Store in original container only",
      ],
      suitableFor: [
        "Manufacturing facilities",
        "Warehouses",
        "Commercial kitchens",
        "Automotive workshops",
        "Industrial equipment",
        "Concrete floors",
        "Metal surfaces",
        "Painted surfaces",
      ],
    },
    documents: {
      productDatasheet: "available",
      technicalData: "available",
      safetyDataSheet: "available",
      usageInstructions: "available",
      certificationDocuments: "available",
      qualityReport: "available",
      complianceDocuments: undefined,
    },
    theme: {
      gradient: "from-blue-600 to-cyan-600",
      bgColor: "bg-blue-50",
      iconColor: "text-blue-600",
      borderColor: "border-blue-200",
      hoverColor: "hover:bg-blue-100",
      overlayGradient: "from-blue-900/20 to-cyan-900/20",
    },
    createdAt: new Date("2023-01-01"),
    updatedAt: new Date("2023-12-01"),
  };

  const allImages = [product.image, ...product.additionalImages].filter(
    Boolean
  ) as string[];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <Header />
      {/* Breadcrumbs */}
      <div className="container mx-auto px-4 py-4">
        <nav className="text-sm text-gray-600">
          <span>Home</span> <span className="mx-2">/</span>
          <span>Products</span> <span className="mx-2">/</span>
          <span className="text-gray-900">{product.name}</span>
        </nav>
      </div>

      <div className="container mx-auto px-4 pb-12">
        {/* Header Section */}
        <div className="mb-8">
          <div
            className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${product.theme.bgColor} ${product.theme.iconColor} mb-4`}
          >
            {product.brand}
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {product.name}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl">
            {product.shortDescription}
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 mb-12">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="aspect-square rounded-2xl overflow-hidden bg-white shadow-lg">
              <Image
                src={
                  allImages[selectedImage] ||
                  "/placeholder.svg?height=600&width=600"
                }
                alt={product.name}
                width={600}
                height={600}
                className="w-full h-full object-cover"
              />
            </div>

            {allImages.length > 1 && (
              <div className="grid grid-cols-4 gap-3">
                {allImages.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                      selectedImage === index
                        ? `${product.theme.borderColor} ring-2 ring-offset-2 ring-blue-500`
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <Image
                      src={image || "/placeholder.svg"}
                      alt={`${product.name} view ${index + 1}`}
                      width={150}
                      height={150}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-8">
            {/* Features */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle
                    className={`w-5 h-5 ${product.theme.iconColor}`}
                  />
                  Key Features
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3">
                  {product.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div
                        className={`w-2 h-2 rounded-full bg-gradient-to-r ${product.theme.gradient}`}
                      />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Size Selection */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package className={`w-5 h-5 ${product.theme.iconColor}`} />
                  Available Sizes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-3">
                  {product.sizes.map((size, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedSize(index)}
                      className={`p-4 rounded-lg border-2 text-left transition-all ${
                        selectedSize === index
                          ? `${product.theme.borderColor} ${product.theme.bgColor}`
                          : `border-gray-200 ${product.theme.hoverColor}`
                      }`}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <span className="font-semibold text-lg">
                          {size.size}
                        </span>
                        <Badge variant="outline">SKU: {size.sku}</Badge>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <Package className="w-4 h-4" />
                          Case Qty: {size.caseQty}
                        </div>
                        <div className="flex items-center gap-1">
                          <Ruler className="w-4 h-4" />
                          {size.dimensions}
                        </div>
                        <div className="flex items-center gap-1">
                          <Weight className="w-4 h-4" />
                          {size.weight}
                        </div>
                        <div className="flex items-center gap-1">
                          <BarChart3 className="w-4 h-4" />
                          {size.barcode}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className={`flex-1 bg-gradient-to-r ${product.theme.gradient} hover:opacity-90 transition-opacity`}
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                Add to Cart
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="flex-1 bg-transparent"
              >
                Request Quote
              </Button>
            </div>
          </div>
        </div>

        {/* Detailed Information Tabs */}
        <Tabs defaultValue="description" className="w-full">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-6">
            <TabsTrigger value="description">Description</TabsTrigger>
            <TabsTrigger value="specifications">Specifications</TabsTrigger>
            <TabsTrigger value="usage">Usage</TabsTrigger>
            <TabsTrigger value="certifications">Certifications</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
            <TabsTrigger value="details">Details</TabsTrigger>
          </TabsList>

          <TabsContent value="description" className="mt-8">
            <Card>
              <CardContent className="pt-6">
                <p className="text-gray-700 leading-relaxed text-lg">
                  {product.description}
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="specifications" className="mt-8">
            <Card>
              <CardContent className="pt-6">
                <div className="grid gap-4">
                  {Object.entries(product.specifications).map(
                    ([key, value]) => (
                      <div
                        key={key}
                        className="flex justify-between items-center py-3 border-b border-gray-100 last:border-b-0"
                      >
                        <span className="font-medium text-gray-900">{key}</span>
                        <span className="text-gray-600">{value}</span>
                      </div>
                    )
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="usage" className="mt-8">
            <div className="grid gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Application</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700">{product.usage.application}</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Frequency & Dilution</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700">{product.usage.frequency}</p>
                </CardContent>
              </Card>

              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <AlertTriangle className="w-5 h-5 text-amber-500" />
                      Precautions
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {product.usage.precautions.map((precaution, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <div className="w-2 h-2 rounded-full bg-amber-500 mt-2 flex-shrink-0" />
                          <span className="text-sm text-gray-700">
                            {precaution}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      Suitable For
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {product.usage.suitableFor.map((item, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <div className="w-2 h-2 rounded-full bg-green-500 mt-2 flex-shrink-0" />
                          <span className="text-sm text-gray-700">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="certifications" className="mt-8">
            <div className="grid gap-6">
              {product.certifications.map((cert, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Shield
                        className={`w-5 h-5 ${product.theme.iconColor}`}
                      />
                      {cert.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 mb-4">{cert.description}</p>
                    <div className="flex items-center gap-6 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        Issued: {new Date(cert.issueDate).toLocaleDateString()}
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        Expires:{" "}
                        {new Date(cert.expiryDate).toLocaleDateString()}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="documents" className="mt-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className={`w-5 h-5 ${product.theme.iconColor}`} />
                  Available Documents
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {Object.entries(product.documents).map(([key, value]) => (
                    <Button
                      key={key}
                      variant={value ? "outline" : "ghost"}
                      disabled={!value}
                      className={`justify-start h-auto p-4 ${
                        value ? product.theme.hoverColor : ""
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Download
                          className={`w-5 h-5 ${
                            value ? product.theme.iconColor : "text-gray-400"
                          }`}
                        />
                        <div className="text-left">
                          <div className="font-medium">
                            {key
                              .replace(/([A-Z])/g, " $1")
                              .replace(/^./, (str) => str.toUpperCase())}
                          </div>
                          <div className="text-xs text-gray-500">
                            {value ? "Available" : "Not Available"}
                          </div>
                        </div>
                      </div>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="details" className="mt-8">
            <Card>
              <CardContent className="pt-6">
                <div className="grid gap-4">
                  <div className="flex justify-between items-center py-3 border-b border-gray-100">
                    <span className="font-medium text-gray-900">
                      Product ID
                    </span>
                    <span className="text-gray-600">{product.id}</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-gray-100">
                    <span className="font-medium text-gray-900">Created</span>
                    <span className="text-gray-600">
                      {product.createdAt.toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-3">
                    <span className="font-medium text-gray-900">
                      Last Updated
                    </span>
                    <span className="text-gray-600">
                      {product.updatedAt.toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Sticky CTA for Mobile */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-200 lg:hidden">
        <Button
          size="lg"
          className={`w-full bg-gradient-to-r ${product.theme.gradient} hover:opacity-90 transition-opacity`}
        >
          <ShoppingCart className="w-5 h-5 mr-2" />
          Add to Cart
        </Button>
      </div>
    </div>
  );
}
