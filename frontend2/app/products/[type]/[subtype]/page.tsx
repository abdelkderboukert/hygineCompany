"use client";
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
import { useParams } from "next/navigation";
import {
  getProductSubtype,
  getProductType,
  getProducts,
} from "@/lib/firebase-admin"; // Ensure this path is correct
import { useEffect, useState } from "react"; // Import useEffect and useState
import type {
  ProductType,
  ProductSubtype,
  Product,
} from "@/lib/firebase-admin"; // Adjust the import path as needed
import { set } from "date-fns";

export default function ProductCatalogPage() {
  const params = useParams();
  const productTypeParam = params.type as string;
  const productSubtypeParam = params.subtype as string;

  const [fetchedProductType, setFetchedProductType] =
    useState<ProductType | null>(null);
  const [fetchedProductSubType, setFetchedProductSubType] =
    useState<ProductSubtype | null>(null);
  const [fetchedProducts, setFetchedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Derive the ID to use for Firestore
  // If your Firestore document IDs are kebab-case (e.g., "sterilization-chemicals"),
  // then directly use productTypeParam after decoding.
  // If they contain spaces (e.g., "Sterilization Chemicals"), then convert productTypeParam to that format.
  // Based on your productSectors array, your IDs are kebab-case, but your decoding logic converts to spaces.
  // Let's assume Firestore IDs are exactly what's in the URL (kebab-case) for simplicity.
  const firestoreId = productTypeParam
    ? decodeURIComponent(productTypeParam)
    : null;

  const firestoreSubTypeId = productSubtypeParam
    ? decodeURIComponent(productSubtypeParam)
    : null;

  useEffect(() => {
    async function fetchProductTypeData() {
      if (!firestoreId) {
        setLoading(false);
        setError("Product type ID is missing.");
        return;
      }
      if (!firestoreSubTypeId) {
        setLoading(false);
        setError("Product subtype ID is missing.");
        return;
      }

      setLoading(true);
      setError(null);
      try {
        // Call the getProductType function with the decoded ID
        const data = await getProductType(firestoreId);
        const SubTypeData: ProductSubtype | null = await getProductSubtype(
          firestoreId,
          firestoreSubTypeId
        );
        const Products: Product[] = await getProducts(
          firestoreId,
          firestoreSubTypeId
        );
        if (data || SubTypeData || Products) {
          setFetchedProductType(data);
          setFetchedProductSubType(SubTypeData);
          setFetchedProducts(Products);
        } else {
          setFetchedProductType(null); // No product type found
          setError(`Product type with ID "${firestoreId}" not found.`);
        }
      } catch (err) {
        console.error("Error fetching product type:", err);
        setError("Failed to load product type data.");
      } finally {
        setLoading(false);
      }
    }

    fetchProductTypeData();
  }, [firestoreId, firestoreSubTypeId]);

  // Display loading, error, or not found states
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <p>Loading product type details...</p>
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

  // If fetchedProductType is null, it means no data was found
  if (!fetchedProductType) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <p>No product type found for "{firestoreId}".</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-green-50 py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-1">
              {/* Display the name fetched from Firestore */}
              {fetchedProductSubType?.name}
            </h1>
            <p className="text-lg text-gray-400 mb-8">
              {/* Display the product type name */}
              {fetchedProductType?.name}
            </p>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {/* Display the description fetched from Firestore */}
              {fetchedProductSubType?.description}
            </p>
          </div>
        </div>
      </section>

      {/* Product Sectors Grid - You might want to remove this if you only display details for one product type */}
      {/* Or, if you want to display related product sectors, you could filter them */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {fetchedProducts?.map((sector) => (
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
                      {/* Activator Categories: */}
                    </p>
                  </div>
                  <Link
                    href={`/products/${fetchedProductType.id}/${fetchedProductSubType?.id}/${sector.id}`}
                  >
                    <Button
                      className={`w-full ${sector.theme.hoverColor} group-hover:text-white transition-all duration-300 bg-white text-gray-700 border-2 ${sector.theme.borderColor} hover:border-transparent`}
                    >
                      Browse Products
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
                Need Help Finding the Right Product?
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Our product specialists can help you find the perfect
                sterilization solution for your specific needs
              </p>
            </div>
            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                Contact a Specialist
              </Button>
              <Button size="lg" variant="outline">
                Download Full Catalog
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
                Your trusted partner for premium sterilization chemicals and
                equipment.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Products</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link
                    href="/products/sterilization-chemicals"
                    className="hover:text-white transition-colors"
                  >
                    Sterilization Chemicals
                  </Link>
                </li>
                <li>
                  <Link
                    href="/products/cleaning-chemicals"
                    className="hover:text-white transition-colors"
                  >
                    Cleaning Chemicals
                  </Link>
                </li>
                <li>
                  <Link
                    href="/products/sterilization-equipment"
                    className="hover:text-white transition-colors"
                  >
                    Sterilization Equipment
                  </Link>
                </li>
                <li>
                  <Link
                    href="/products"
                    className="hover:text-white transition-colors"
                  >
                    View All Products
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
                  <Link
                    href="/#about"
                    className="hover:text-white transition-colors"
                  >
                    About Us
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
