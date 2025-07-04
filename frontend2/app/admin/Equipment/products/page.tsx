"use client";

import { useState, useEffect } from "react";
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
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Shield, Plus, Search, Edit, Trash2, ArrowLeft } from "lucide-react";
import {
  getEquipmentTypes,
  deleteEquipmentType, // Not used in this snippet, but kept for context
  deleteEquipment,
  deleteFile, // This is the key function you need
  getEquipmentSubtypes,
  getEquipments,
} from "@/lib/firebase-admin";
import type {
  ProductType,
  ProductSubtype,
  Product,
} from "@/lib/firebase-admin";
import { toast } from "sonner";

export default function EquipmentTypesPage() {
  const [types, setTypes] = useState<ProductType[]>([]); // This state seems unused now that Equipments are filtered.
  const [filteredTypes, setFilteredTypes] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [type, setType] = useState<string>("");
  const [Equipments, setEquipments] = useState<Product[]>([]);
  const [subtype, setSubtype] = useState<string>("");
  const [fetchedEquipmentTypes, setFetchedEquipmentTypes] = useState<
    ProductType[]
  >([]);
  const [fetchedEquipmentSubtypes, setFetchedEquipmentSubtypes] = useState<
    ProductSubtype[]
  >([]);
  const [loadingEquipmentTypes, setLoadingEquipmentTypes] = useState(true);
  const [loadingEquipmentSubtypes, setLoadingEquipmentSubtypes] =
    useState(false);
  const [error, setError] = useState<string | null>(null);

  // Initial fetch of Equipments based on selected type and subtype
  useEffect(() => {
    fetchEquipment(type, subtype);
  }, [type, subtype]);

  // Filter Equipments based on search term
  useEffect(() => {
    const filtered = Equipments.filter(
      (Equipment) =>
        Equipment.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        Equipment.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredTypes(filtered);
  }, [Equipments, searchTerm]);

  // --- Data Fetching Effects ---

  // Effect to fetch Equipment types
  useEffect(() => {
    async function fetchTypes() {
      setLoadingEquipmentTypes(true);
      setError(null);
      try {
        const data = await getEquipmentTypes();
        if (data) {
          setFetchedEquipmentTypes(data);
        } else {
          setFetchedEquipmentTypes([]);
          setError("No Equipment types found.");
        }
      } catch (err) {
        console.error("Error fetching Equipment types:", err);
        setError("Failed to load Equipment types.");
      } finally {
        setLoadingEquipmentTypes(false);
      }
    }
    fetchTypes();
  }, []);

  // Effect to fetch Equipment subtypes when EquipmentType changes
  useEffect(() => {
    if (type) {
      setLoadingEquipmentSubtypes(true);
      setError(null);
      setFetchedEquipmentSubtypes([]); // Clear previous subtypes
      setSubtype(""); // Reset selected subtype

      async function fetchSubtypes() {
        try {
          const data = await getEquipmentSubtypes(type);
          if (data) {
            setFetchedEquipmentSubtypes(data);
          } else {
            setFetchedEquipmentSubtypes([]);
            setError(`No subtypes found for type "${type}".`);
          }
        } catch (err) {
          console.error("Error fetching Equipment subtypes:", err);
          setError("Failed to load Equipment subtypes.");
        } finally {
          setLoadingEquipmentSubtypes(false);
        }
      }
      fetchSubtypes();
    } else {
      setFetchedEquipmentSubtypes([]); // Clear subtypes if no Equipment type is selected
      setLoadingEquipmentSubtypes(false);
    }
  }, [type]);

  const fetchEquipment = async (type: string, subtype: string) => {
    setLoading(true);
    try {
      const data = await getEquipments(type, subtype);
      setEquipments(data);
    } catch (error) {
      console.error("Error fetching Equipments:", error);
      toast.error("Failed to fetch Equipments");
    } finally {
      setLoading(false);
    }
  };

  // --- Modified handleDelete function ---
  const handleDelete = async (EquipmentToDelete: Product) => {
    const { id, name, image, additionalImages, documents } = EquipmentToDelete;

    if (!id || !type || !subtype) {
      toast.error("Equipment ID, Type, or Subtype is missing.");
      return;
    }

    if (
      !window.confirm(
        `Are you sure you want to delete "${name}"? This action cannot be undone.`
      )
    ) {
      return; // User cancelled deletion
    }

    try {
      // 1. Delete main Equipment image if it exists
      if (image) {
        await deleteFile(image);
        console.log(`Deleted main image: ${image}`);
      }

      // 2. Delete additional images
      if (additionalImages && additionalImages.length > 0) {
        await Promise.all(
          additionalImages.map(async (url) => {
            if (url) {
              await deleteFile(url);
              console.log(`Deleted additional image: ${url}`);
            }
          })
        );
      }

      // 3. Delete associated documents
      if (documents) {
        const documentFiles = [
          documents.productDatasheet,
          documents.technicalData,
          documents.safetyDataSheet,
          documents.usageInstructions,
          documents.certificationDocuments,
          documents.qualityReport,
          documents.complianceDocuments,
        ];

        await Promise.all(
          documentFiles.map(async (url) => {
            if (url) {
              await deleteFile(url);
              console.log(`Deleted document: ${url}`);
            }
          })
        );
      }

      // 4. Delete the Equipment document from Firestore
      await deleteEquipment(type, subtype, id);
      setEquipments(Equipments.filter((Equipment) => Equipment.id !== id));
      toast.success("Equipment and associated files deleted successfully");
    } catch (error) {
      console.error("Error deleting Equipment or files:", error);
      toast.error("Failed to delete Equipment or some associated files.");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <Link href="/admin">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Dashboard
                </Button>
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Equipment Types
                </h1>
                <p className="text-sm text-gray-500">
                  Manage Equipment categories
                </p>
              </div>
            </div>
            <Link href="/admin/types/new">
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Plus className="h-4 w-4 mr-2" />
                New Type
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid md:grid-cols-2 gap-6 mb-4">
          <div className="space-y-2">
            <Label htmlFor="EquipmentType">
              Equipment Type <span className="text-red-500">*</span>
            </Label>
            <Select
              value={type}
              onValueChange={(value) => setType(value)}
              disabled={loadingEquipmentTypes}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a Equipment type" />
              </SelectTrigger>
              <SelectContent>
                {loadingEquipmentTypes ? (
                  <SelectItem value="loading" disabled>
                    Loading types...
                  </SelectItem>
                ) : fetchedEquipmentTypes.length > 0 ? (
                  fetchedEquipmentTypes.map((type) => (
                    <SelectItem key={type.id} value={type.id}>
                      {type.name}
                    </SelectItem>
                  ))
                ) : (
                  <SelectItem value="no-types" disabled>
                    No Equipment types available
                  </SelectItem>
                )}
              </SelectContent>
            </Select>
            {error && <p className="text-red-500 text-sm">{error}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="EquipmentSubtype">
              Equipment SubType <span className="text-red-500">*</span>
            </Label>
            <Select
              value={subtype}
              onValueChange={(value) => setSubtype(value)}
              disabled={!type || loadingEquipmentSubtypes}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a Equipment subtype" />
              </SelectTrigger>
              <SelectContent>
                {loadingEquipmentSubtypes ? (
                  <SelectItem value="loading" disabled>
                    Loading subtypes...
                  </SelectItem>
                ) : fetchedEquipmentSubtypes?.length > 0 ? (
                  fetchedEquipmentSubtypes.map((subtype) => (
                    <SelectItem key={subtype.id} value={subtype.id || ""}>
                      {subtype.name}
                    </SelectItem>
                  ))
                ) : (
                  <SelectItem value="no-subtypes" disabled>
                    {subtype
                      ? "No subtypes available for selected type"
                      : "Select a Equipment type first"}
                  </SelectItem>
                )}
              </SelectContent>
            </Select>
          </div>
        </div>
        {/* Search */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search Equipment types..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardContent>
        </Card>

        {/* Types Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTypes.map((p) => (
            <Card key={p.id} className={`border-2 ${p.theme.borderColor}`}>
              <CardHeader className={p.theme.bgColor}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div
                      className={`w-10 h-10 rounded-full ${p.theme.bgColor} border-2 ${p.theme.borderColor} flex items-center justify-center`}
                    >
                      <Shield className={`h-5 w-5 ${p.theme.iconColor}`} />
                    </div>
                    <CardTitle className="text-lg">{p.name}</CardTitle>
                  </div>
                  <div className="flex space-x-2">
                    <Link
                      href={`/admin/Equipments/${p.id}?typeid=${type}&subtypeid=${subtype}`}
                    >
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </Link>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() =>
                        // Pass the entire Equipment object
                        handleDelete(p)
                      }
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-4">
                <CardDescription className="mb-4">
                  {p.description}
                </CardDescription>
                <div className="flex flex-wrap gap-2">
                  <Badge
                    variant="outline"
                    className={`${p.theme.iconColor} border-current`}
                  >
                    {p.theme.gradient
                      .replace("from-", "")
                      .replace("-500", "")
                      .replace(" to-", " → ")
                      .replace("-700", "")}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredTypes.length === 0 && (
          <Card>
            <CardContent className="text-center py-12">
              <Shield className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No Equipments found
              </h3>
              <p className="text-gray-500 mb-4">
                {searchTerm
                  ? "Try adjusting your search terms."
                  : "Get started by creating your first Equipment."}
              </p>
              {!searchTerm && (
                <Link href="/admin/Equipments/new">
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    <Plus className="h-4 w-4 mr-2" />
                    Create Equipment
                  </Button>
                </Link>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
