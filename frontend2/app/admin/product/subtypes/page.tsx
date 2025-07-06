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
  getProductSubtypes as getEquipmentSubtypes,
  getProductTypes as getEquipmentTypes,
  deleteProductSubtype as deleteEquipmentSubtype,
} from "@/lib/firebase-admin";
import type {
  ProductSubtype as EquipmentSubtype,
  ProductType as EquipmentType,
} from "@/lib/firebase-admin";
import { toast } from "sonner";

export default function EquipmentTypesPage() {
  const [types, setTypes] = useState<EquipmentType[]>([]);
  const [selectedTypeId, setSelectedTypeId] = useState<string>(""); // Renamed 'type' for clarity
  const [allSubtypesForSelectedType, setAllSubtypesForSelectedType] = useState<
    EquipmentSubtype[]
  >([]); // Stores all fetched subtypes for the *currently selected* main type
  const [filteredSubtypes, setFilteredSubtypes] = useState<EquipmentSubtype[]>(
    []
  ); // Stores the filtered list based on search term
  const [searchTerm, setSearchTerm] = useState("");
  const [loadingInitialData, setLoadingInitialData] = useState(true); // For initial page load
  const [loadingProductTypes, setLoadingProductTypes] = useState(false); // For just fetching main types
  const [loadingSubtypes, setLoadingSubtypes] = useState(false); // For just fetching subtypes
  const [error, setError] = useState<string | null>(null);

  // Effect to fetch initial product types on component mount
  useEffect(() => {
    async function fetchTypes() {
      setLoadingProductTypes(true);
      setError(null);
      try {
        const data = await getEquipmentTypes();
        if (data) {
          setTypes(data);
          if (data.length > 0) {
            // Automatically select the first type when types are loaded
            setSelectedTypeId(data[0].id);
          }
        } else {
          setTypes([]);
          setError("No product types found.");
        }
      } catch (err) {
        console.error("Error fetching product types:", err);
        setError("Failed to load product types.");
      } finally {
        setLoadingProductTypes(false);
        setLoadingInitialData(false); // Initial loading is done after types are fetched
      }
    }
    fetchTypes();
  }, []); // Empty dependency array means this runs once on mount

  // Effect to fetch subtypes whenever the selected type ID changes
  useEffect(() => {
    async function fetchSubtypesForSelectedType() {
      if (!selectedTypeId) {
        setAllSubtypesForSelectedType([]);
        setFilteredSubtypes([]);
        return;
      }

      setLoadingSubtypes(true);
      setError(null);
      try {
        const data = await getEquipmentSubtypes(selectedTypeId);
        if (data) {
          setAllSubtypesForSelectedType(data); // Store all fetched subtypes for the current type
          setFilteredSubtypes(data); // Initially, filtered list is the full list
        } else {
          setAllSubtypesForSelectedType([]);
          setFilteredSubtypes([]);
          setError("No equipment subtypes found for this type.");
        }
      } catch (err) {
        console.error("Error fetching product subtypes:", err);
        setError("Failed to load product subtypes.");
      } finally {
        setLoadingSubtypes(false);
      }
    }
    fetchSubtypesForSelectedType();
  }, [selectedTypeId]); // Re-run this effect when selectedTypeId changes

  // Effect to filter subtypes based on search term (depends on allSubtypesForSelectedType)
  useEffect(() => {
    const filtered = allSubtypesForSelectedType.filter(
      (subtype) =>
        subtype.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        subtype.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredSubtypes(filtered);
  }, [searchTerm, allSubtypesForSelectedType]); // Re-run when searchTerm or the full list changes

  const handleDelete = async (
    parentTypeId: string, // The ID of the main equipment type
    subtypeIdToDelete: string, // The ID of the specific subtype to delete
    name: string
  ) => {
    if (
      window.confirm(
        `Are you sure you want to delete "${name}"? This action cannot be undone.`
      )
    ) {
      try {
        await deleteEquipmentSubtype(parentTypeId, subtypeIdToDelete);
        toast.success("Equipment subtype deleted successfully");

        // Update the 'allSubtypesForSelectedType' state to reflect the deletion
        // The filtering useEffect will then automatically update 'filteredSubtypes'
        setAllSubtypesForSelectedType((prevSubtypes) =>
          prevSubtypes.filter((subtype) => subtype.id !== subtypeIdToDelete)
        );
      } catch (error) {
        console.error("Error deleting subtype:", error);
        toast.error("Failed to delete Equipment subtype");
      }
    }
  };

  if (loadingInitialData) {
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
              <Link href="/admin/product">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Dashboard
                </Button>
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Product Types
                </h1>
                <p className="text-sm text-gray-500">
                  Manage Product categories
                </p>
              </div>
            </div>
            <Link href="/admin/Product/subtypes/new">
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Plus className="h-4 w-4 mr-2" />
                New SubType
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid md:grid-cols-2 gap-6 mb-4">
          <div className="space-y-2">
            <Label htmlFor="productType">
              Product Type <span className="text-red-500">*</span>
            </Label>
            <Select
              value={selectedTypeId}
              onValueChange={(value) => setSelectedTypeId(value)}
              disabled={loadingProductTypes}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a product type" />
              </SelectTrigger>
              <SelectContent>
                {loadingProductTypes ? (
                  <SelectItem value="loading" disabled>
                    Loading types...
                  </SelectItem>
                ) : types.length > 0 ? (
                  types.map(
                    (
                      typeItem // Renamed 'type' to 'typeItem' to avoid conflict with 'type' state
                    ) => (
                      <SelectItem key={typeItem.id} value={typeItem.id}>
                        {typeItem.name}
                      </SelectItem>
                    )
                  )
                ) : (
                  <SelectItem value="no-types" disabled>
                    No product types available
                  </SelectItem>
                )}
              </SelectContent>
            </Select>
            {error && <p className="text-red-500 text-sm">{error}</p>}
          </div>
        </div>
        {/* Search */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search Product Subtypes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
                disabled={loadingSubtypes} // Disable search if subtypes are loading
              />
            </div>
          </CardContent>
        </Card>

        {/* Types Grid */}
        {loadingSubtypes ? (
          <div className="min-h-[200px] flex items-center justify-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600"></div>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredSubtypes.map((Subtype) => (
                <Card
                  key={Subtype.id}
                  className={`border-2 ${Subtype.theme.borderColor}`}
                >
                  <CardHeader className={Subtype.theme.bgColor}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div
                          className={`w-10 h-10 rounded-full ${Subtype.theme.bgColor} border-2 ${Subtype.theme.borderColor} flex items-center justify-center`}
                        >
                          <Shield
                            className={`h-5 w-5 ${Subtype.theme.iconColor}`}
                          />
                        </div>
                        <CardTitle className="text-lg">
                          {Subtype.name}
                        </CardTitle>
                      </div>
                      <div className="flex space-x-2">
                        {/* Corrected Link for editing subtype */}
                        <Link
                          href={`/admin/Products/${Subtype.id}?typeid=${selectedTypeId}`}
                        >
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </Link>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() =>
                            handleDelete(
                              selectedTypeId,
                              Subtype.id!,
                              Subtype.name
                            )
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
                      {Subtype.description}
                    </CardDescription>
                    <div className="flex flex-wrap gap-2">
                      <Badge
                        variant="outline"
                        className={`${Subtype.theme.iconColor} border-current`}
                      >
                        {Subtype.theme.gradient
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

            {filteredSubtypes.length === 0 && (
              <Card>
                <CardContent className="text-center py-12">
                  <Shield className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    No Product subtypes found
                  </h3>
                  <p className="text-gray-500 mb-4">
                    {searchTerm
                      ? "Try adjusting your search terms."
                      : "Get started by creating your first Product subtype for this type."}
                  </p>
                  {!searchTerm && (
                    // Corrected Link for creating new subtype
                    <Link href={`/admin/types/${selectedTypeId}/subtypes/new`}>
                      <Button className="bg-blue-600 hover:bg-blue-700">
                        <Plus className="h-4 w-4 mr-2" />
                        Create Product Subtype
                      </Button>
                    </Link>
                  )}
                </CardContent>
              </Card>
            )}
          </>
        )}
      </div>
    </div>
  );
}
