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
  getProductTypes,
  deleteProductType, // Not used in this snippet, but kept for context
  deleteProduct,
  deleteFile, // This is the key function you need
  getProductSubtypes,
  getProducts,
} from "@/lib/firebase-admin";
import type {
  ProductType,
  ProductSubtype,
  Product,
} from "@/lib/firebase-admin";
import { toast } from "sonner";

export default function ProductTypesPage() {
  const [types, setTypes] = useState<ProductType[]>([]); // This state seems unused now that products are filtered.
  const [filteredTypes, setFilteredTypes] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [type, setType] = useState<string>("");
  const [products, setProducts] = useState<Product[]>([]);
  const [subtype, setSubtype] = useState<string>("");
  const [fetchedProductTypes, setFetchedProductTypes] = useState<ProductType[]>(
    []
  );
  const [fetchedProductSubtypes, setFetchedProductSubtypes] = useState<
    ProductSubtype[]
  >([]);
  const [loadingProductTypes, setLoadingProductTypes] = useState(true);
  const [loadingProductSubtypes, setLoadingProductSubtypes] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Initial fetch of products based on selected type and subtype
  useEffect(() => {
    fetchProduct(type, subtype);
  }, [type, subtype]);

  // Filter products based on search term
  useEffect(() => {
    const filtered = products.filter(
      (product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredTypes(filtered);
  }, [products, searchTerm]);

  // --- Data Fetching Effects ---

  // Effect to fetch product types
  useEffect(() => {
    async function fetchTypes() {
      setLoadingProductTypes(true);
      setError(null);
      try {
        const data = await getProductTypes();
        if (data) {
          setFetchedProductTypes(data);
        } else {
          setFetchedProductTypes([]);
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

  // Effect to fetch product subtypes when productType changes
  useEffect(() => {
    if (type) {
      setLoadingProductSubtypes(true);
      setError(null);
      setFetchedProductSubtypes([]); // Clear previous subtypes
      setSubtype(""); // Reset selected subtype

      async function fetchSubtypes() {
        try {
          const data = await getProductSubtypes(type);
          if (data) {
            setFetchedProductSubtypes(data);
          } else {
            setFetchedProductSubtypes([]);
            setError(`No subtypes found for type "${type}".`);
          }
        } catch (err) {
          console.error("Error fetching product subtypes:", err);
          setError("Failed to load product subtypes.");
        } finally {
          setLoadingProductSubtypes(false);
        }
      }
      fetchSubtypes();
    } else {
      setFetchedProductSubtypes([]); // Clear subtypes if no product type is selected
      setLoadingProductSubtypes(false);
    }
  }, [type]);

  const fetchProduct = async (type: string, subtype: string) => {
    setLoading(true);
    try {
      const data = await getProducts(type, subtype);
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
      toast.error("Failed to fetch products");
    } finally {
      setLoading(false);
    }
  };

  // --- Modified handleDelete function ---
  const handleDelete = async (productToDelete: Product) => {
    const { id, name, image, additionalImages, documents } = productToDelete;

    if (!id || !type || !subtype) {
      toast.error("Product ID, Type, or Subtype is missing.");
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
      // 1. Delete main product image if it exists
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

      // 4. Delete the product document from Firestore
      await deleteProduct(type, subtype, id);
      setProducts(products.filter((product) => product.id !== id));
      toast.success("Product and associated files deleted successfully");
    } catch (error) {
      console.error("Error deleting product or files:", error);
      toast.error("Failed to delete product or some associated files.");
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
                  Product Types
                </h1>
                <p className="text-sm text-gray-500">
                  Manage product categories
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
                ) : fetchedProductTypes.length > 0 ? (
                  fetchedProductTypes.map((type) => (
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
          <div className="space-y-2">
            <Label htmlFor="productSubtype">
              Product SubType <span className="text-red-500">*</span>
            </Label>
            <Select
              value={subtype}
              onValueChange={(value) => setSubtype(value)}
              disabled={!type || loadingProductSubtypes}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a product subtype" />
              </SelectTrigger>
              <SelectContent>
                {loadingProductSubtypes ? (
                  <SelectItem value="loading" disabled>
                    Loading subtypes...
                  </SelectItem>
                ) : fetchedProductSubtypes?.length > 0 ? (
                  fetchedProductSubtypes.map((subtype) => (
                    <SelectItem key={subtype.id} value={subtype.id || ""}>
                      {subtype.name}
                    </SelectItem>
                  ))
                ) : (
                  <SelectItem value="no-subtypes" disabled>
                    {subtype
                      ? "No subtypes available for selected type"
                      : "Select a product type first"}
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
                placeholder="Search product types..."
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
                    <Link href={`/admin/products/${p.id}?typeid=${type}&subtypeid=${subtype}`}>
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </Link>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() =>
                        // Pass the entire product object
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
                No products found
              </h3>
              <p className="text-gray-500 mb-4">
                {searchTerm
                  ? "Try adjusting your search terms."
                  : "Get started by creating your first product."}
              </p>
              {!searchTerm && (
                <Link href="/admin/products/new">
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    <Plus className="h-4 w-4 mr-2" />
                    Create Product
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