"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { ArrowLeft, Plus, Trash2, Save, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import ImageUpload from "@/components/image-upload";
import MultipleImageUpload from "@/components/multiple-image-upload";
import {
  getEquipmentTypes,
  getEquipmentSubtypes,
  createEquipment, // We'll replace this with updateEquipment
  getEquipmentById, // New import to fetch existing Equipment
  updateEquipment,
  getEquipment, // New import for updating
} from "@/lib/firebase-admin";
import type {
  Product as Equipment,
  ProductSubtype as EquipmentSubtype,
  ProductType as EquipmentType,
} from "@/lib/firebase-admin";
import { useParams, useSearchParams } from "next/navigation";

const themeOptions = [
  {
    gradient: "from-blue-500 to-blue-700",
    bgColor: "bg-blue-50",
    iconColor: "text-blue-600",
    borderColor: "border-blue-200",
    hoverColor: "hover:bg-blue-600",
    overlayGradient: "from-blue-900/70",
  },
  {
    gradient: "from-green-500 to-green-700",
    bgColor: "bg-green-50",
    iconColor: "text-green-600",
    borderColor: "border-green-200",
    hoverColor: "hover:bg-green-600",
    overlayGradient: "from-green-900/70",
  },
  {
    gradient: "from-purple-500 to-purple-700",
    bgColor: "bg-purple-50",
    iconColor: "text-purple-600",
    borderColor: "border-purple-200",
    hoverColor: "hover:bg-purple-600",
    overlayGradient: "from-purple-900/70",
  },
  {
    gradient: "from-orange-500 to-orange-700",
    bgColor: "bg-orange-50",
    iconColor: "text-orange-600",
    borderColor: "border-orange-200",
    hoverColor: "hover:bg-orange-600",
    overlayGradient: "from-orange-900/70",
  },
  {
    gradient: "from-red-500 to-red-700",
    bgColor: "bg-red-50",
    iconColor: "text-red-600",
    borderColor: "border-red-200",
    hoverColor: "hover:bg-red-600",
    overlayGradient: "from-red-900/70",
  },
  {
    gradient: "from-cyan-500 to-cyan-700",
    bgColor: "bg-cyan-50",
    iconColor: "text-cyan-600",
    borderColor: "border-cyan-200",
    hoverColor: "hover:bg-cyan-600",
    overlayGradient: "from-cyan-900/70",
  },
];

interface Size {
  size: string;
  sku: string;
  caseQty: number;
  dimensions: string;
  weight: string;
  barcode: string;
}

interface UsageInput {
  application: string;
  frequency: string;
  precautions: string; // Stored as a single string for textarea input
  suitableFor: string; // Stored as a single string for textarea input
}

interface Theme {
  gradient: string;
  bgColor: string;
  iconColor: string;
  borderColor: string;
  hoverColor: string;
  overlayGradient: string;
}

interface Certification {
  name: string;
  description: string;
  issueDate: string;
  expiryDate: string;
}

interface Specification {
  key: string;
  value: string;
}

interface EquipmentFormData {
  name: string;
  brand: string;
  shortDescription: string;
  description: string;
  image?: string; // Made optional as per your Equipment interface
  additionalImages: string[];
  EquipmentType: string; // For selected Equipment type ID
  EquipmentSubtype: string; // For selected Equipment subtype ID
  features: string; // Stored as a single string for textarea input
  sizes: Size[];
  certifications: Certification[];
  specifications: Specification[];
  usage: UsageInput; // Use the UsageInput interface for form data
  documents: {
    EquipmentDatasheet: boolean;
    technicalData: boolean;
    safetyDataSheet: boolean;
    usageInstructions: boolean;
    certificationDocuments: boolean;
    qualityReport: boolean;
    complianceDocuments: boolean;
  };
  theme: Theme;
}

const initialFormData: EquipmentFormData = {
  name: "",
  brand: "",
  shortDescription: "",
  description: "",
  image: "",
  additionalImages: [],
  EquipmentType: "",
  EquipmentSubtype: "",
  features: "", // Initial value for textarea
  sizes: [
    {
      size: "",
      sku: "",
      caseQty: 0,
      dimensions: "",
      weight: "",
      barcode: "",
    },
  ],
  certifications: [],
  specifications: [],
  usage: {
    application: "",
    frequency: "",
    precautions: "",
    suitableFor: "",
  },
  documents: {
    EquipmentDatasheet: false,
    technicalData: false,
    safetyDataSheet: false,
    usageInstructions: false,
    certificationDocuments: false,
    qualityReport: false,
    complianceDocuments: false,
  },
  theme: {
    gradient: "from-cyan-500 to-cyan-700",
    bgColor: "bg-cyan-50",
    iconColor: "text-cyan-600",
    borderColor: "border-cyan-200",
    hoverColor: "hover:bg-cyan-600",
    overlayGradient: "from-cyan-900/70",
  },
};

export default function EditEquipmentPage() {
  const params = useParams();
  const EquipmentId = params.edit as string; // Assuming [edit] is your EquipmentId segment

  // Get query parameters (e.g., ?typeid=abc&subtypeid=xyz)
  const searchParams = useSearchParams();
  const typeId = searchParams.get("typeid"); // This will be 'abc' or null if not present
  const subTypeId = searchParams.get("subtypeid"); // This will be 'xyz' or null if not present

  const [formData, setFormData] = useState<EquipmentFormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoadingEquipment, setIsLoadingEquipment] = useState(true); // New state for loading Equipment data

  const [fetchedEquipmentTypes, setFetchedEquipmentTypes] = useState<EquipmentType[]>(
    []
  );
  const [fetchedEquipmentSubtypes, setFetchedEquipmentSubtypes] = useState<
    EquipmentSubtype[]
  >([]);
  const [loadingEquipmentTypes, setLoadingEquipmentTypes] = useState(true);
  const [loadingEquipmentSubtypes, setLoadingEquipmentSubtypes] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // --- Utility Functions ---
  const updateFormData = (field: keyof EquipmentFormData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const updateUsage = (field: keyof UsageInput, value: string) => {
    setFormData((prev) => ({
      ...prev,
      usage: { ...prev.usage, [field]: value },
    }));
  };

  const getCurrentTheme = () => {
    return (
      themeOptions.find((theme) => theme.bgColor === formData.theme.bgColor) ||
      themeOptions[0]
    );
  };

  const updateDocument = (
    field: keyof EquipmentFormData["documents"],
    value: boolean
  ) => {
    setFormData((prev) => ({
      ...prev,
      documents: { ...prev.documents, [field]: value },
    }));
  };

  // Size management functions
  const addSize = () => {
    setFormData((prev) => ({
      ...prev,
      sizes: [
        ...prev.sizes,
        {
          size: "",
          sku: "",
          caseQty: 0,
          dimensions: "",
          weight: "",
          barcode: "",
        },
      ],
    }));
  };

  const removeSize = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      sizes: prev.sizes.filter((_, i) => i !== index),
    }));
  };

  const updateSize = (
    index: number,
    field: keyof Size,
    value: string | number
  ) => {
    setFormData((prev) => ({
      ...prev,
      sizes: prev.sizes.map((size, i) =>
        i === index ? { ...size, [field]: value } : size
      ),
    }));
  };

  // Certification management functions
  const addCertification = () => {
    setFormData((prev) => ({
      ...prev,
      certifications: [
        ...prev.certifications,
        {
          name: "",
          description: "",
          issueDate: "",
          expiryDate: "",
        },
      ],
    }));
  };

  const removeCertification = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      certifications: prev.certifications.filter((_, i) => i !== index),
    }));
  };

  const updateCertification = (
    index: number,
    field: keyof Certification,
    value: string
  ) => {
    setFormData((prev) => ({
      ...prev,
      certifications: prev.certifications.map((cert, i) =>
        i === index ? { ...cert, [field]: value } : cert
      ),
    }));
  };

  // Specification management functions
  const addSpecification = () => {
    setFormData((prev) => ({
      ...prev,
      specifications: [...prev.specifications, { key: "", value: "" }],
    }));
  };

  const removeSpecification = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      specifications: prev.specifications.filter((_, i) => i !== index),
    }));
  };

  const updateSpecification = (
    index: number,
    field: keyof Specification,
    value: string
  ) => {
    setFormData((prev) => ({
      ...prev,
      specifications: prev.specifications.map((spec, i) =>
        i === index ? { ...spec, [field]: value } : spec
      ),
    }));
  };

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
    if (formData.EquipmentType) {
      setLoadingEquipmentSubtypes(true);
      setError(null);
      setFetchedEquipmentSubtypes([]);
      // Don't reset EquipmentSubtype here if we're loading an existing Equipment,
      // as it might be needed for the initial population.
      // setFormData((prev) => ({ ...prev, EquipmentSubtype: "" }));

      async function fetchSubtypes() {
        try {
          const data = await getEquipmentSubtypes(formData.EquipmentType);
          if (data) {
            setFetchedEquipmentSubtypes(data);
          } else {
            setFetchedEquipmentSubtypes([]);
            setError(`No subtypes found for type "${formData.EquipmentType}".`);
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
      setFetchedEquipmentSubtypes([]);
      setLoadingEquipmentSubtypes(false);
    }
  }, [formData.EquipmentType]);

  // Effect to fetch and populate existing Equipment data
  useEffect(() => {
    async function fetchEquipmentData() {
      if (!EquipmentId) return;
      if (!typeId) return;
      if (!subTypeId) return;

      setIsLoadingEquipment(true);
      setError(null);
      try {
        const Equipment = await getEquipment(typeId, subTypeId, EquipmentId);
        if (Equipment) {
          // Map fetched Equipment data to form data structure
          setFormData({
            name: Equipment.name,
            brand: Equipment.brand,
            shortDescription: Equipment.shortDescription,
            description: Equipment.description,
            image: Equipment.image,
            additionalImages: Equipment.additionalImages,
            // Convert arrays back to comma/newline separated strings for textarea
            features: Equipment.features ? Equipment.features.join("\n") : "",
            sizes: Equipment.sizes || [],
            certifications: Equipment.certifications || [],
            specifications: Object.entries(Equipment.specifications || {}).map(
              ([key, value]) => ({ key, value })
            ),
            usage: {
              application: Equipment.usage?.application || "",
              frequency: Equipment.usage?.frequency || "",
              precautions: Equipment.usage?.precautions
                ? Equipment.usage.precautions.join("\n")
                : "",
              suitableFor: Equipment.usage?.suitableFor
                ? Equipment.usage.suitableFor.join("\n")
                : "",
            },
            documents: {
              EquipmentDatasheet: !!Equipment.documents?.productDatasheet,
              technicalData: !!Equipment.documents?.technicalData,
              safetyDataSheet: !!Equipment.documents?.safetyDataSheet,
              usageInstructions: !!Equipment.documents?.usageInstructions,
              certificationDocuments:
                !!Equipment.documents?.certificationDocuments,
              qualityReport: !!Equipment.documents?.qualityReport,
              complianceDocuments: !!Equipment.documents?.complianceDocuments,
            },
            theme: Equipment.theme || initialFormData.theme,
            EquipmentType: typeId, // This will need to be dynamically set based on how you fetch/store this
            EquipmentSubtype: subTypeId, // Same here
          });

          // // With this assumption:
          // setFormData((prev) => ({
          //   ...prev,
          //   EquipmentType: (Equipment as Equipment & { typeId: string }).typeId, // Cast assuming typeId is present
          //   EquipmentSubtype: (Equipment as Equipment & { subtypeId: string })
          //     .subtypeId, // Cast assuming subtypeId is present
          // }));
        } else {
          setError("Equipment not found.");
        }
      } catch (err) {
        console.error("Error fetching Equipment:", err);
        setError("Failed to load Equipment data.");
      } finally {
        setIsLoadingEquipment(false);
      }
    }
    fetchEquipmentData();
  }, [EquipmentId, subTypeId, typeId]); // Re-run when EquipmentId changes

  // --- Form Submission and Cancel ---
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Prepare the data to match the Equipment interface for updateEquipment
      const EquipmentToUpdate: Partial<Equipment> = {
        name: formData.name,
        brand: formData.brand,
        description: formData.description,
        shortDescription: formData.shortDescription,
        image: formData.image,
        additionalImages: formData.additionalImages,
        features: formData.features
          .split(/[\n,]+/)
          .map((s) => s.trim())
          .filter(Boolean),
        sizes: formData.sizes,
        certifications: formData.certifications,
        specifications: formData.specifications.reduce((acc, spec) => {
          acc[spec.key] = spec.value;
          return acc;
        }, {} as Record<string, string>),
        usage: {
          application: formData.usage.application,
          frequency: formData.usage.frequency,
          precautions: formData.usage.precautions
            .split(/[\n,]+/)
            .map((s) => s.trim())
            .filter(Boolean),
          suitableFor: formData.usage.suitableFor
            .split(/[\n,]+/)
            .map((s) => s.trim())
            .filter(Boolean),
        },
        documents: Object.keys(formData.documents).reduce((acc, key) => {
          if (formData.documents[key as keyof EquipmentFormData["documents"]]) {
            acc[key as keyof Equipment["documents"]] = `path/to/${key}.pdf`; // Placeholder
          }
          return acc;
        }, {} as Partial<Equipment["documents"]>) as Equipment["documents"],
        theme: formData.theme,
        updatedAt: new Date(),
      };

      // Call updateEquipment instead of createEquipment
      // This requires typeId and subtypeId, which are assumed to be available in formData
      await updateEquipment(
        formData.EquipmentType, // Assumed to be populated from fetched Equipment or determined otherwise
        formData.EquipmentSubtype, // Assumed to be populated from fetched Equipment or determined otherwise
        EquipmentId,
        EquipmentToUpdate
      );

      console.log("Equipment updated:", EquipmentToUpdate);
      alert("Equipment updated successfully!");
      // No need to clear form, but can navigate back
      window.history.back();
    } catch (submitError) {
      console.error("Error updating Equipment:", submitError);
      setError("Failed to update Equipment. Please try again.");
      alert("Failed to update Equipment.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    if (confirm("Are you sure you want to discard all changes?")) {
      // For edit, simply navigate back without clearing if changes are discarded
      window.history.back();
    }
  };

  // --- Rendered Component ---
  if (isLoadingEquipment) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="flex items-center text-gray-700">
          <div className="w-6 h-6 mr-3 animate-spin rounded-full border-2 border-current border-t-transparent" />
          Loading Equipment data...
        </div>
      </div>
    );
  }

  if (error && !isLoadingEquipment && !EquipmentId) {
    // Only show error if no Equipment ID or failed fetch
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="text-red-600 text-lg">
          Error: {error}
          <Button onClick={() => window.history.back()} className="mt-4">
            Go Back
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <Button
            variant="ghost"
            className="mb-4 -ml-4"
            onClick={() => window.history.back()}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Equipments
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Edit Equipment
            </h1>
            <p className="text-gray-600 text-lg">
              Modify the details of an existing Equipment.
            </p>
          </div>
        </div>

        {/* Main Form */}
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Information Section */}
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
              <CardDescription>
                Enter the fundamental details about the Equipment
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">
                    Equipment Name <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="name"
                    placeholder="e.g., Professional Grade Industrial Cleaner"
                    value={formData.name}
                    onChange={(e) => updateFormData("name", e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="brand">
                    Brand <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="brand"
                    placeholder="e.g., CleanTech Pro"
                    value={formData.brand}
                    onChange={(e) => updateFormData("brand", e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="shortDescription">
                  Short Description <span className="text-red-500">*</span>
                </Label>
                <Textarea
                  id="shortDescription"
                  placeholder="A brief, compelling overview of the Equipment..."
                  rows={2}
                  value={formData.shortDescription}
                  onChange={(e) =>
                    updateFormData("shortDescription", e.target.value)
                  }
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">
                  Full Description <span className="text-red-500">*</span>
                </Label>
                <Textarea
                  id="description"
                  placeholder="Detailed Equipment description including features, benefits, and specifications..."
                  rows={4}
                  value={formData.description}
                  onChange={(e) =>
                    updateFormData("description", e.target.value)
                  }
                  required
                />
              </div>

              <div className="space-y-6">
                <ImageUpload
                  label="Main Equipment Image"
                  value={formData.image || ""}
                  onChange={(url) => updateFormData("image", url)}
                  required
                />

                <MultipleImageUpload
                  label="Additional Equipment Images"
                  value={formData.additionalImages}
                  onChange={(urls) => updateFormData("additionalImages", urls)}
                  maxImages={5}
                />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="EquipmentType">
                    Equipment Type <span className="text-red-500">*</span>
                  </Label>
                  <Select
                    value={formData.EquipmentType}
                    onValueChange={(value) =>
                      updateFormData("EquipmentType", value)
                    }
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
                    value={formData.EquipmentSubtype}
                    onValueChange={(value) =>
                      updateFormData("EquipmentSubtype", value)
                    }
                    disabled={!formData.EquipmentType || loadingEquipmentSubtypes}
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
                          {formData.EquipmentType
                            ? "No subtypes available for selected type"
                            : "Select a Equipment type first"}
                        </SelectItem>
                      )}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Key Features Section */}
          <Card>
            <CardHeader>
              <CardTitle>Key Features</CardTitle>
              <CardDescription>
                List the main features and benefits of the Equipment (one per
                line)
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Label htmlFor="features">Features</Label>
                <Textarea
                  id="features"
                  placeholder="Enter key features, one per line or separated by commas"
                  rows={4}
                  value={formData.features}
                  onChange={(e) => updateFormData("features", e.target.value)}
                />
              </div>
            </CardContent>
          </Card>

          {/* Sizes & SKUs Section */}
          <Card>
            <CardHeader>
              <CardTitle>Sizes & SKUs</CardTitle>
              <CardDescription>
                Define the available sizes and their specifications
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {formData.sizes.map((size, index) => (
                <div
                  key={index}
                  className="p-4 border rounded-lg bg-gray-50 space-y-4"
                >
                  <div className="flex justify-between items-center">
                    <h4 className="font-medium">Size {index + 1}</h4>
                    {formData.sizes.length > 1 && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeSize(index)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    )}
                  </div>

                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label>Size Label</Label>
                      <Input
                        placeholder="e.g., 500ml"
                        value={size.size}
                        onChange={(e) =>
                          updateSize(index, "size", e.target.value)
                        }
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>SKU</Label>
                      <Input
                        placeholder="e.g., CTP-500"
                        value={size.sku}
                        onChange={(e) =>
                          updateSize(index, "sku", e.target.value)
                        }
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Case Quantity</Label>
                      <Input
                        type="number"
                        placeholder="12"
                        value={size.caseQty}
                        onChange={(e) =>
                          updateSize(
                            index,
                            "caseQty",
                            Number.parseInt(e.target.value) || 0
                          )
                        }
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Dimensions</Label>
                      <Input
                        placeholder="8.5 x 8.5 x 25 cm"
                        value={size.dimensions}
                        onChange={(e) =>
                          updateSize(index, "dimensions", e.target.value)
                        }
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Weight</Label>
                      <Input
                        placeholder="0.6 kg"
                        value={size.weight}
                        onChange={(e) =>
                          updateSize(index, "weight", e.target.value)
                        }
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Barcode</Label>
                      <Input
                        placeholder="1234567890123"
                        value={size.barcode}
                        onChange={(e) =>
                          updateSize(index, "barcode", e.target.value)
                        }
                      />
                    </div>
                  </div>
                </div>
              ))}

              <Button
                type="button"
                variant="outline"
                onClick={addSize}
                className="w-full bg-transparent"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add New Size
              </Button>
            </CardContent>
          </Card>

          {/* Certifications Section */}
          <Card>
            <CardHeader>
              <CardTitle>Certifications</CardTitle>
              <CardDescription>
                Add relevant certifications and compliance information
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {formData.certifications.map((cert, index) => (
                <div
                  key={index}
                  className="p-4 border rounded-lg bg-gray-50 space-y-4"
                >
                  <div className="flex justify-between items-center">
                    <h4 className="font-medium">Certification {index + 1}</h4>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeCertification(index)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Certification Name</Label>
                      <Input
                        placeholder="e.g., ISO 14001"
                        value={cert.name}
                        onChange={(e) =>
                          updateCertification(index, "name", e.target.value)
                        }
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Description</Label>
                      <Input
                        placeholder="Brief description of the certification"
                        value={cert.description}
                        onChange={(e) =>
                          updateCertification(
                            index,
                            "description",
                            e.target.value
                          )
                        }
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Issue Date</Label>
                      <Input
                        type="date"
                        value={cert.issueDate}
                        onChange={(e) =>
                          updateCertification(
                            index,
                            "issueDate",
                            e.target.value
                          )
                        }
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Expiry Date</Label>
                      <Input
                        type="date"
                        value={cert.expiryDate}
                        onChange={(e) =>
                          updateCertification(
                            index,
                            "expiryDate",
                            e.target.value
                          )
                        }
                      />
                    </div>
                  </div>
                </div>
              ))}

              <Button
                type="button"
                variant="outline"
                onClick={addCertification}
                className="w-full bg-transparent"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add New Certification
              </Button>
            </CardContent>
          </Card>

          {/* Specifications Section */}
          <Card>
            <CardHeader>
              <CardTitle>Specifications</CardTitle>
              <CardDescription>
                Define technical specifications as key-value pairs
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {formData.specifications.map((spec, index) => (
                <div key={index} className="flex gap-4 items-end">
                  <div className="flex-1 space-y-2">
                    <Label>Specification Key</Label>
                    <Input
                      placeholder="e.g., pH Level"
                      value={spec.key}
                      onChange={(e) =>
                        updateSpecification(index, "key", e.target.value)
                      }
                    />
                  </div>

                  <div className="flex-1 space-y-2">
                    <Label>Value</Label>
                    <Input
                      placeholder="e.g., 7.5 - 8.5"
                      value={spec.value}
                      onChange={(e) =>
                        updateSpecification(index, "value", e.target.value)
                      }
                    />
                  </div>

                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => removeSpecification(index)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              ))}

              <Button
                type="button"
                variant="outline"
                onClick={addSpecification}
                className="w-full bg-transparent"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add New Specification
              </Button>
            </CardContent>
          </Card>

          {/* Usage Information Section */}
          <Card>
            <CardHeader>
              <CardTitle>Usage Information</CardTitle>
              <CardDescription>
                Provide detailed usage instructions and guidelines
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="application">Application</Label>
                <Textarea
                  id="application"
                  placeholder="Describe where and how this Equipment should be used..."
                  rows={3}
                  value={formData.usage.application}
                  onChange={(e) => updateUsage("application", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="frequency">Frequency & Dilution</Label>
                <Textarea
                  id="frequency"
                  placeholder="Describe usage frequency and dilution instructions..."
                  rows={3}
                  value={formData.usage.frequency}
                  onChange={(e) => updateUsage("frequency", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="precautions">Precautions</Label>
                <Textarea
                  id="precautions"
                  placeholder="List safety precautions, one per line"
                  rows={4}
                  value={formData.usage.precautions}
                  onChange={(e) => updateUsage("precautions", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="suitableFor">Suitable For</Label>
                <Textarea
                  id="suitableFor"
                  placeholder="List suitable applications, one per line"
                  rows={4}
                  value={formData.usage.suitableFor}
                  onChange={(e) => updateUsage("suitableFor", e.target.value)}
                />
              </div>
            </CardContent>
          </Card>

          {/* Documents Section */}
          <Card>
            <CardHeader>
              <CardTitle>Available Documents</CardTitle>
              <CardDescription>
                Select which documents are available for this Equipment
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                {Object.entries(formData.documents).map(([key, value]) => (
                  <div key={key} className="flex items-center space-x-2">
                    <Checkbox
                      id={key}
                      checked={value}
                      onCheckedChange={(checked) =>
                        updateDocument(
                          key as keyof EquipmentFormData["documents"],
                          !!checked
                        )
                      }
                    />
                    <Label htmlFor={key} className="text-sm font-normal">
                      {key
                        .replace(/([A-Z])/g, " $1")
                        .replace(/^./, (str) => str.toUpperCase())}
                    </Label>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Theme Selection Section */}
          <Card>
            <CardHeader>
              <CardTitle>Theme Selection</CardTitle>
              <CardDescription>
                Choose a visual theme for this Equipment
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {themeOptions.map((theme) => (
                  <button
                    key={theme.bgColor}
                    type="button"
                    onClick={() => updateFormData("theme", theme)}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      formData.theme.bgColor === theme.bgColor
                        ? `${theme.borderColor} ${theme.bgColor} ring-2 ring-offset-2 ring-blue-500`
                        : "border-gray-200 hover:border-gray-300 bg-white"
                    }`}
                  >
                    <div className="space-y-3">
                      {/* Theme Color Preview */}
                      <div
                        className={`w-full h-8 rounded-md bg-gradient-to-r ${theme.gradient}`}
                      />

                      {/* Theme Name */}
                      <div className="text-center">
                        <span
                          className={`font-medium ${
                            formData.theme.bgColor === theme.bgColor
                              ? theme.iconColor
                              : "text-gray-700"
                          }`}
                        >
                          {theme.bgColor.replace("bg-", "").replace("-50", "")}
                        </span>
                      </div>

                      {/* Theme Elements Preview */}
                      <div className={`p-2 rounded ${theme.bgColor} space-y-1`}>
                        <div
                          className={`w-full h-2 rounded ${theme.iconColor.replace(
                            "text-",
                            "bg-"
                          )}`}
                        />
                        <div
                          className={`w-3/4 h-2 rounded ${theme.iconColor.replace(
                            "text-",
                            "bg-"
                          )}/60`}
                        />
                      </div>
                    </div>
                  </button>
                ))}
              </div>

              {/* Selected Theme Preview */}
              <div
                className={`p-4 rounded-lg border ${
                  getCurrentTheme().borderColor
                } ${getCurrentTheme().bgColor}`}
              >
                <h4
                  className={`font-medium mb-2 ${getCurrentTheme().iconColor}`}
                >
                  Selected Theme:{" "}
                  {getCurrentTheme()
                    .bgColor.replace("bg-", "")
                    .replace("-50", "")}
                </h4>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <span className="text-gray-600">Gradient: </span>
                    <code className="text-xs bg-white px-1 rounded">
                      {getCurrentTheme().gradient}
                    </code>
                  </div>
                  <div>
                    <span className="text-gray-600">Background: </span>
                    <code className="text-xs bg-white px-1 rounded">
                      {getCurrentTheme().bgColor}
                    </code>
                  </div>
                  <div>
                    <span className="text-gray-600">Icon Color: </span>
                    <code className="text-xs bg-white px-1 rounded">
                      {getCurrentTheme().iconColor}
                    </code>
                  </div>
                  <div>
                    <span className="text-gray-600">Border: </span>
                    <code className="text-xs bg-white px-1 rounded">
                      {getCurrentTheme().borderColor}
                    </code>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Form Actions */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className={`flex-1 bg-gradient-to-r ${
                    getCurrentTheme().gradient
                  } hover:opacity-90 transition-opacity`}
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 mr-2 animate-spin rounded-full border-2 border-white border-t-transparent" />
                      Updating Equipment...
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4 mr-2" />
                      Update Equipment
                    </>
                  )}
                </Button>

                <Button
                  type="button"
                  variant="outline"
                  onClick={handleCancel}
                  disabled={isSubmitting}
                  className="flex-1 bg-transparent"
                >
                  <X className="w-4 h-4 mr-2" />
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        </form>
      </div>
    </div>
  );
}
