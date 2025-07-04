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
  getEquipmentSubtype,
  getEquipmentType,
  getEquipments,
} from "@/lib/firebase-admin"; // Ensure this path is correct
import { useEffect, useState } from "react"; // Import useEffect and useState
import type {
  ProductType,
  ProductSubtype,
  Product,
} from "@/lib/firebase-admin"; // Adjust the import path as needed
import { set } from "date-fns";

export default function EquipmentCatalogPage() {
  const params = useParams();
  const EquipmentTypeParam = params.type as string;
  const EquipmentSubtypeParam = params.subtype as string;

  const [fetchedEquipmentType, setFetchedEquipmentType] =
    useState<ProductType | null>(null);
  const [fetchedEquipmentSubType, setFetchedEquipmentSubType] =
    useState<ProductSubtype | null>(null);
  const [fetchedEquipments, setFetchedEquipments] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Derive the ID to use for Firestore
  // If your Firestore document IDs are kebab-case (e.g., "sterilization-chemicals"),
  // then directly use EquipmentTypeParam after decoding.
  // If they contain spaces (e.g., "Sterilization Chemicals"), then convert EquipmentTypeParam to that format.
  // Based on your EquipmentSectors array, your IDs are kebab-case, but your decoding logic converts to spaces.
  // Let's assume Firestore IDs are exactly what's in the URL (kebab-case) for simplicity.
  const firestoreId = EquipmentTypeParam
    ? decodeURIComponent(EquipmentTypeParam)
    : null;

  const firestoreSubTypeId = EquipmentSubtypeParam
    ? decodeURIComponent(EquipmentSubtypeParam)
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

      setLoading(true);
      setError(null);
      try {
        // Call the getEquipmentType function with the decoded ID
        const data = await getEquipmentType(firestoreId);
        const SubTypeData: ProductSubtype | null = await getEquipmentSubtype(
          firestoreId,
          firestoreSubTypeId
        );
        const Equipments: Product[] = await getEquipments(
          firestoreId,
          firestoreSubTypeId
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

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-green-50 py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-1">
              {/* Display the name fetched from Firestore */}
              {fetchedEquipmentSubType?.name}
            </h1>
            <p className="text-lg text-gray-400 mb-8">
              {/* Display the Equipment type name */}
              {fetchedEquipmentType?.name}
            </p>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {/* Display the description fetched from Firestore */}
              {fetchedEquipmentSubType?.description}
            </p>
          </div>
        </div>
      </section>

      {/* Equipment Sectors Grid - You might want to remove this if you only display details for one Equipment type */}
      {/* Or, if you want to display related Equipment sectors, you could filter them */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {fetchedEquipments?.map((sector) => (
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
                    href={`/Equipments/${fetchedEquipmentType.id}/${fetchedEquipmentSubType?.id}/${sector.id}`}
                  >
                    <Button
                      className={`w-full ${sector.theme.hoverColor} group-hover:text-white transition-all duration-300 bg-white text-gray-700 border-2 ${sector.theme.borderColor} hover:border-transparent`}
                    >
                      Browse Equipments
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Equipment Finder */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Need Help Finding the Right Equipment?
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Our Equipment specialists can help you find the perfect
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
                <span className="text-xl font-bold">HygieneMax</span>
              </div>
              <p className="text-gray-400">
                Your trusted partner for premium sterilization chemicals and
                equipment.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Equipments</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link
                    href="/Equipments/sterilization-chemicals"
                    className="hover:text-white transition-colors"
                  >
                    Sterilization Chemicals
                  </Link>
                </li>
                <li>
                  <Link
                    href="/Equipments/cleaning-chemicals"
                    className="hover:text-white transition-colors"
                  >
                    Cleaning Chemicals
                  </Link>
                </li>
                <li>
                  <Link
                    href="/Equipments/sterilization-equipment"
                    className="hover:text-white transition-colors"
                  >
                    Sterilization Equipment
                  </Link>
                </li>
                <li>
                  <Link
                    href="/Equipments"
                    className="hover:text-white transition-colors"
                  >
                    View All Equipments
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
                    Equipment Guides
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
