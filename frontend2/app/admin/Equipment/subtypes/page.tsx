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
  getEquipmentSubtypes,
  getEquipmentTypes,
  deleteEquipmentSubtype,
} from "@/lib/firebase-admin";
import type {
  ProductSubtype as EquipmentSubtype,
  ProductType as EquipmentType,
} from "@/lib/firebase-admin";
import { toast } from "sonner";

export default function EquipmentTypesPage() {
  const [types, setTypes] = useState<EquipmentType[]>([]);
  const [type, setType] = useState<string>("");
  const [filteredSubTypes, setFilteredSubTypes] = useState<EquipmentSubtype[]>(
    []
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [fetchedProductSubtypes, setFetchedProductSubtypes] = useState<
    EquipmentSubtype[]
  >([]);
  const [loadingProductTypes, setLoadingProductTypes] = useState(true);
  const [loadingProducttypes, setLoadingProductSubtypes] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const filtered = filteredSubTypes.filter(
      (type) =>
        type.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        type.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredSubTypes(filtered);
  }, [filteredSubTypes, searchTerm]);

  useEffect(() => {
    async function fetchTypes() {
      setLoadingProductTypes(true);
      setError(null);
      try {
        const data = await getEquipmentTypes();
        if (data) {
          setTypes(data);
        } else {
          setTypes([]);
          setError("No product types found.");
        }
      } catch (err) {
        console.error("Error fetching product types:", err);
        setError("Failed to load product types.");
      } finally {
        setLoadingProductTypes(false);
      }
    }
    fetchTypes();
  }, []);

  useEffect(() => {
    async function fetchSubTypes(type: string) {
      setLoadingProductTypes(true);
      setError(null);
      try {
        const data = await getEquipmentSubtypes(type);
        if (data) {
          setFilteredSubTypes(data);
        } else {
          setFilteredSubTypes([]);
          setError("No product types found.");
        }
      } catch (err) {
        console.error("Error fetching product types:", err);
        setError("Failed to load product types.");
      } finally {
        setLoadingProductTypes(false);
      }
    }
    fetchSubTypes(type);
  }, [type]);

  const handleDelete = async (
    TypeId: string,
    TypeSubId: string,
    name: string
  ) => {
    if (
      window.confirm(
        `Are you sure you want to delete "${name}"? This action cannot be undone.`
      )
    ) {
      try {
        await deleteEquipmentSubtype(TypeId, TypeSubId);
        setTypes(types.filter((type) => type.id !== TypeId));
        toast.success("Equipment type deleted successfully");
      } catch (error) {
        console.error("Error deleting type:", error);
        toast.error("Failed to delete Equipment type");
      }
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
            <Label htmlFor="productType">
              Product Type <span className="text-red-500">*</span>
            </Label>
            <Select
              value={type}
              onValueChange={(value) => setType(value)}
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
                  types.map((type) => (
                    <SelectItem key={type.id} value={type.id}>
                      {type.name}
                    </SelectItem>
                  ))
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
                placeholder="Search Equipment Subtypes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardContent>
        </Card>

        {/* Types Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSubTypes.map((Subtype) => (
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
                    <CardTitle className="text-lg">{Subtype.name}</CardTitle>
                  </div>
                  <div className="flex space-x-2">
                    <Link href={`/admin/types/${Subtype.id}/edit`}>
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </Link>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() =>
                        handleDelete(Subtype.id!, type, Subtype.name)
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

        {filteredSubTypes.length === 0 && (
          <Card>
            <CardContent className="text-center py-12">
              <Shield className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No Equipment types found
              </h3>
              <p className="text-gray-500 mb-4">
                {searchTerm
                  ? "Try adjusting your search terms."
                  : "Get started by creating your first Equipment type."}
              </p>
              {!searchTerm && (
                <Link href="/admin/types/new">
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    <Plus className="h-4 w-4 mr-2" />
                    Create Equipment Type
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
