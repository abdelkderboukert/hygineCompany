"use client";

import type React from "react";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { getProductTypes, type ProductType } from "@/lib/firebase-admin";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowLeft, Save } from "lucide-react";
import { createProductSubtype, uploadFile } from "@/lib/firebase-admin"; // Ensure createProductSubtype is imported
import { toast } from "sonner";

const themeOptions = [
  {
    name: "Blue",
    value: {
      gradient: "from-blue-500 to-blue-700",
      bgColor: "bg-blue-50",
      iconColor: "text-blue-600",
      borderColor: "border-blue-200",
      hoverColor: "hover:bg-blue-600",
      overlayGradient: "from-blue-900/70",
    },
  },
  {
    name: "Green",
    value: {
      gradient: "from-green-500 to-green-700",
      bgColor: "bg-green-50",
      iconColor: "text-green-600",
      borderColor: "border-green-200",
      hoverColor: "hover:bg-green-600",
      overlayGradient: "from-green-900/70",
    },
  },
  {
    name: "Purple",
    value: {
      gradient: "from-purple-500 to-purple-700",
      bgColor: "bg-purple-50",
      iconColor: "text-purple-600",
      borderColor: "border-purple-200",
      hoverColor: "hover:bg-purple-600",
      overlayGradient: "from-purple-900/70",
    },
  },
  {
    name: "Orange",
    value: {
      gradient: "from-orange-500 to-orange-700",
      bgColor: "bg-orange-50",
      iconColor: "text-orange-600",
      borderColor: "border-orange-200",
      hoverColor: "hover:bg-orange-600",
      overlayGradient: "from-orange-900/70",
    },
  },
  {
    name: "Red",
    value: {
      gradient: "from-red-500 to-red-700",
      bgColor: "bg-red-50",
      iconColor: "text-red-600",
      borderColor: "border-red-200",
      hoverColor: "hover:bg-red-600",
      overlayGradient: "from-red-900/70",
    },
  },
  {
    name: "Cyan",
    value: {
      gradient: "from-cyan-500 to-cyan-700",
      bgColor: "bg-cyan-50",
      iconColor: "text-cyan-600",
      borderColor: "border-cyan-200",
      hoverColor: "hover:bg-cyan-600",
      overlayGradient: "from-cyan-900/70",
    },
  },
];

export default function NewProductTypePage() {
  const router = useRouter();
  const [productTypes, setProductTypes] = useState<ProductType[]>([]);
  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    typeId: "", // Initialize typeId for the Select input
    productCount: 0, // This might not be strictly needed for a new subtype but keep it if your interface requires it.
    theme: themeOptions[0].value,
  });

  // Fetch product types on component mount
  useEffect(() => {
    const fetchProductTypesData = async () => {
      try {
        const types = await getProductTypes();
        setProductTypes(types);
        // Optionally pre-select the first type if available and no typeId is set
        if (types.length > 0 && !formData.typeId) {
          setFormData((prev) => ({ ...prev, typeId: types[0].id || "" }));
        }
      } catch (error) {
        console.error("Error fetching product types:", error);
        toast.error("Failed to load product types");
      }
    };
    fetchProductTypesData();
  }, []); // Empty dependency array means this runs once on mount

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (!formData.typeId) {
      toast.error("Please select a parent product type.");
      setLoading(false);
      return;
    }

    try {
      let imageUrl = "";

      if (imageFile) {
        const imagePath = `product-subtypes/${Date.now()}-${imageFile.name}`; // Adjusted path for subtypes
        imageUrl = await uploadFile(imageFile, imagePath);
      }

      // Destructure formData to exclude typeId from the data object,
      // as it's passed as a separate argument to createProductSubtype
      const { typeId, ...restOfData } = formData;

      await createProductSubtype(typeId, {
        ...restOfData,
        image: imageUrl,
      });

      toast.success("Product subtype created successfully!");
      // Redirect to the subtypes listing, perhaps for the selected parent type
      router.push(`/admin/types/${typeId}/subtypes`); // Redirect to the subtypes list of the selected parent type
    } catch (error) {
      console.error("Error creating product subtype:", error);
      toast.error("Failed to create product subtype");
    } finally {
      setLoading(false);
    }
  };

  const handleThemeChange = (themeName: string) => {
    const theme = themeOptions.find((t) => t.name === themeName);
    if (theme) {
      setFormData({ ...formData, theme: theme.value });
    }
  };

  const handleTypeIdChange = (typeId: string) => {
    setFormData({ ...formData, typeId });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              {/* Back button might go to the list of all Product Types,
                  or if coming from a specific type's detail page, it could go back there.
                  For simplicity, let's keep it to /admin/types for now. */}
              <Link href="/admin/types">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Product Types
                </Button>
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Create Product Subtype
                </h1>
                <p className="text-sm text-gray-500">
                  Add a new subcategory within a parent product type
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Form */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Subtype Information</CardTitle>
                  <CardDescription>
                    Enter the details for the new product subtype
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Select for Parent Product Type */}
                  <div>
                    <Label htmlFor="typeId">Parent Product Type *</Label>
                    <Select
                      onValueChange={handleTypeIdChange}
                      value={formData.typeId}
                      required
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select a parent product type" />
                      </SelectTrigger>
                      <SelectContent>
                        {productTypes
                          .filter((type) => type.id) // Filter out types without an id
                          .map((type) => (
                            <SelectItem key={type.id!} value={type.id!}>
                              {type.name}
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Subtype Name */}
                  <div>
                    <Label htmlFor="name">Subtype Name *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      placeholder="e.g., Sterilization Chemicals"
                      required
                    />
                  </div>

                  {/* Subtype Description */}
                  <div>
                    <Label htmlFor="description">Description *</Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          description: e.target.value,
                        })
                      }
                      placeholder="Describe this product subtype..."
                      rows={3}
                      required
                    />
                  </div>

                  {/* Theme Color */}
                  <div>
                    <Label htmlFor="theme">Theme Color</Label>
                    <Select
                      onValueChange={handleThemeChange}
                      value={
                        themeOptions.find((opt) => opt.value === formData.theme)
                          ?.name || themeOptions[0].name
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select a theme color" />
                      </SelectTrigger>
                      <SelectContent>
                        {themeOptions.map((theme) => (
                          <SelectItem key={theme.name} value={theme.name}>
                            <div className="flex items-center space-x-2">
                              <div
                                className={`w-4 h-4 rounded-full bg-gradient-to-r ${theme.value.gradient}`}
                              ></div>
                              <span>{theme.name}</span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Category Image (Subtype Image) */}
                  <div>
                    <Label htmlFor="image">Subtype Image</Label>
                    <div className="mt-2">
                      <input
                        id="image"
                        type="file"
                        accept="image/*"
                        onChange={(e) =>
                          setImageFile(e.target.files?.[0] || null)
                        }
                        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Preview */}
            <div>
              <Card className={`border-2 ${formData.theme.borderColor}`}>
                <CardHeader>
                  <CardTitle>Preview</CardTitle>
                  <CardDescription>
                    How this subtype will appear on the website
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div
                    className={`p-4 rounded-lg ${formData.theme.bgColor} border ${formData.theme.borderColor}`}
                  >
                    <div className="flex items-center space-x-3 mb-3">
                      <div
                        className={`w-8 h-8 rounded-full ${formData.theme.bgColor} border ${formData.theme.borderColor} flex items-center justify-center`}
                      >
                        <div
                          className={`w-4 h-4 rounded-full bg-gradient-to-r ${formData.theme.gradient}`}
                        ></div>
                      </div>
                      <h3 className="font-medium">
                        {formData.name || "Product Subtype Name"}
                      </h3>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">
                      {formData.description ||
                        "Product subtype description will appear here..."}
                    </p>
                    <div
                      className={`inline-block px-2 py-1 rounded text-xs ${formData.theme.iconColor} border ${formData.theme.borderColor}`}
                    >
                      Theme Preview
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="mt-6 space-y-3">
                <Button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700"
                  disabled={loading}
                >
                  <Save className="h-4 w-4 mr-2" />
                  {loading ? "Creating..." : "Create Product Subtype"}
                </Button>
                <Link href="/admin/types">
                  <Button type="button" variant="outline" className="w-full">
                    Cancel
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
