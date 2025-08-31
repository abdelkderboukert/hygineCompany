"use client";

import Image from "next/image";
import { useParams } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Header } from "@/components/Header";
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
import {
  getEquipmentSubtype,
  getEquipmentType,
  getEquipment,
} from "@/lib/firebase-admin"; // Ensure this path is correct
import { useEffect, useState } from "react"; // Import useEffect and useState
import type {
  ProductType,
  ProductSubtype,
  Product,
} from "@/lib/firebase-admin";

interface EquipmentDetailPageProps {
  Product: Product;
}

export default function EquipmentDetailPage() {
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState(0);
  const params = useParams();
  const EquipmentTypeParam = params.type as string;
  const EquipmentSubtypeParam = params.subtype as string;
  const EquipmentParam = params.product as string;

  const [fetchedEquipmentType, setFetchedEquipmentType] =
    useState<ProductType | null>(null);
  const [fetchedEquipmentSubType, setFetchedEquipmentSubType] =
    useState<ProductSubtype | null>(null);
  const [Equipment, setFetchedEquipments] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  // Decode the parameters to handle special characters
  const firestoreId = EquipmentTypeParam
    ? decodeURIComponent(EquipmentTypeParam)
    : null;

  const firestoreSubTypeId = EquipmentSubtypeParam
    ? decodeURIComponent(EquipmentSubtypeParam)
    : null;

  const firestoreEquipmentId = EquipmentParam
    ? decodeURIComponent(EquipmentParam)
    : null;


  useEffect(() => {
    async function fetchEquipmentTypeData() {
      if (!firestoreId) {
        setLoading(false);
        setError("Equipment type ID is missing.");
        return;
      }
      if (!firestoreSubTypeId) {
        setLoading(false);
        setError("Equipment subtype ID is missing.");
        return;
      }
      if (!firestoreEquipmentId) {
        setLoading(false);
        setError("Equipment ID is missing.");
        return;
      }

      setLoading(true);
      setError(null);
      try {
        // Call the getEquipmentType function with the decoded ID
        const data = await getEquipmentType(firestoreId);
        const SubTypeData: ProductSubtype | null = await getEquipmentSubtype(
          firestoreId,
          firestoreSubTypeId
        );
        const Equipments: Product | null = await getEquipment(
          firestoreId,
          firestoreSubTypeId,
          firestoreEquipmentId
        );
        if (data || SubTypeData || Equipments) {
          setFetchedEquipmentType(data);
          setFetchedEquipmentSubType(SubTypeData);
          setFetchedEquipments(Equipments);
        } else {
          setFetchedEquipmentType(null); // No Equipment type found
          setError(`Equipment type with ID "${firestoreId}" not found.`);
        }
      } catch (err) {
        console.error("Error fetching Equipment type:", err);
        setError("Failed to load Equipment type data.");
      } finally {
        setLoading(false);
      }
    }

    fetchEquipmentTypeData();
  }, [firestoreId, firestoreSubTypeId]);

  // Display loading, error, or not found states
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <p>Loading Equipment type details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  // If fetchedEquipmentType is null, it means no data was found
  if (!fetchedEquipmentType) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <p>No Equipment type found for "{firestoreId}".</p>
      </div>
    );
  }

  const allImages = [
    Equipment?.image,
    ...(Equipment?.additionalImages || []),
  ].filter(Boolean) as string[];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <Header />
      {/* Breadcrumbs */}
      <div className="container mx-auto px-4 py-4">
        <nav className="text-sm text-gray-600">
          <span>Home</span> <span className="mx-2">/</span>
          <span>Equipments</span> <span className="mx-2">/</span>
          <span className="text-gray-900">{Equipment?.name}</span>
        </nav>
      </div>

      <div className="container mx-auto px-4 pb-12">
        {/* Header Section */}
        <div className="mb-8">
          <div
            className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${Equipment?.theme.bgColor} ${Equipment?.theme.iconColor} mb-4`}
          >
            {Equipment?.brand}
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {Equipment?.name}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl">
            {Equipment?.shortDescription}
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
                alt={Equipment?.name || "Equipment Image"}
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
                        ? `${Equipment?.theme.borderColor} ring-2 ring-offset-2 ring-blue-500`
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <Image
                      src={image || "/placeholder.svg"}
                      alt={`${Equipment?.name} view ${index + 1}`}
                      width={150}
                      height={150}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Equipment Info */}
          <div className="space-y-8">
            {/* Features */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle
                    className={`w-5 h-5 ${Equipment?.theme.iconColor}`}
                  />
                  Key Features
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3">
                  {Equipment?.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div
                        className={`w-2 h-2 rounded-full bg-gradient-to-r ${Equipment?.theme.gradient}`}
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
                  <Package
                    className={`w-5 h-5 ${Equipment?.theme.iconColor}`}
                  />
                  Available Sizes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-3">
                  {Equipment?.sizes.map((size, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedSize(index)}
                      className={`p-4 rounded-lg border-2 text-left transition-all ${
                        selectedSize === index
                          ? `${Equipment.theme.borderColor} ${Equipment.theme.bgColor}`
                          : `border-gray-200 ${Equipment.theme.hoverColor}`
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
                className={`flex-1 bg-gradient-to-r ${Equipment?.theme.gradient} hover:opacity-90 transition-opacity`}
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
                  {Equipment?.description}
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="specifications" className="mt-8">
            <Card>
              <CardContent className="pt-6">
                <div className="grid gap-4">
                  {Equipment &&
                    Object.entries(Equipment.specifications).map(
                      ([key, value]) => (
                        <div
                          key={key}
                          className="flex justify-between items-center py-3 border-b border-gray-100 last:border-b-0"
                        >
                          <span className="font-medium text-gray-900">
                            {key}
                          </span>
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
                  <p className="text-gray-700">
                    {Equipment?.usage.application}
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Frequency & Dilution</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700">{Equipment?.usage.frequency}</p>
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
                      {Equipment?.usage.precautions.map((precaution, index) => (
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
                      {Equipment &&
                        Equipment.usage.suitableFor.map((item, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <div className="w-2 h-2 rounded-full bg-green-500 mt-2 flex-shrink-0" />
                            <span className="text-sm text-gray-700">
                              {item}
                            </span>
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
              {Equipment?.certifications.map((cert, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Shield
                        className={`w-5 h-5 ${Equipment.theme.iconColor}`}
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
                  <FileText
                    className={`w-5 h-5 ${Equipment?.theme.iconColor}`}
                  />
                  Available Documents
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {Equipment &&
                    Object.entries(Equipment.documents).map(([key, value]) => (
                      <Button
                        key={key}
                        variant={value ? "outline" : "ghost"}
                        disabled={!value}
                        className={`justify-start h-auto p-4 ${
                          value ? Equipment?.theme.hoverColor : ""
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <Download
                            className={`w-5 h-5 ${
                              value
                                ? Equipment?.theme.iconColor
                                : "text-gray-400"
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
                      Equipment ID
                    </span>
                    <span className="text-gray-600">{Equipment?.id}</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-gray-100">
                    <span className="font-medium text-gray-900">Created</span>
                    {/* <span className="text-gray-600">
                      {Equipment && Equipment.createdAt.toLocaleDateString()}
                    </span> */}
                    {Equipment && (
                      <span className="text-gray-600">
                        {Equipment.createdAt instanceof Date // Check if it's already a Date object
                          ? Equipment.createdAt.toLocaleDateString()
                          : new Date(
                              Equipment.createdAt
                            ).toLocaleDateString()}{" "}
                        {/* Convert if not */}
                      </span>
                    )}
                  </div>
                  <div className="flex justify-between items-center py-3">
                    <span className="font-medium text-gray-900">
                      Last Updated
                    </span>
                    {/* <span className="text-gray-600">
                      {Equipment?.updatedAt.toLocaleDateString()}
                    </span> */}
                    {Equipment && (
                      <span className="text-gray-600">
                        {Equipment.updatedAt instanceof Date // Check if it's already a Date object
                          ? Equipment.updatedAt.toLocaleDateString()
                          : new Date(
                              Equipment.createdAt
                            ).toLocaleDateString()}{" "}
                        {/* Convert if not */}
                      </span>
                    )}
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
          className={`w-full bg-gradient-to-r ${Equipment?.theme.gradient} hover:opacity-90 transition-opacity`}
        >
          <ShoppingCart className="w-5 h-5 mr-2" />
          Add to Cart
        </Button>
      </div>
    </div>
  );
}
