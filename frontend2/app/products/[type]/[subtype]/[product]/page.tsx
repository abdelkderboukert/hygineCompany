import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Shield,
  ArrowLeft,
  Download,
  Check,
  FileText,
  Info,
  Star,
  Package,
  Truck,
  Phone,
} from "lucide-react";
import { notFound } from "next/navigation";
import { Header } from "@/components/Header";
//@ts-nocheck
// Sample product data structure
const productData = {
  "hand-hygiene": {
    sanitizers: {
      id: "sanitizers",
      name: "Hand Sanitizers",
      products: {
        "hs-1001": {
          id: "hs-1001",
          name: "AlcoPure 70",
          brand: "HygieneMax",
          description:
            "AlcoPure 70 is a premium 70% alcohol-based hand sanitizer formulated with moisturizing agents for effective hand hygiene in all environments. This professional-grade sanitizer kills 99.9% of germs while keeping hands soft and moisturized, making it perfect for frequent use in healthcare, commercial, and industrial settings.",
          shortDescription:
            "70% alcohol-based hand sanitizer with moisturizing agents",
          image: "/placeholder.svg?height=500&width=500",
          additionalImages: [
            "/placeholder.svg?height=400&width=400",
            "/placeholder.svg?height=400&width=400",
            "/placeholder.svg?height=400&width=400",
            "/placeholder.svg?height=400&width=400",
          ],
          features: [
            "70% Alcohol content for effective germ killing",
            "Moisturizing formula with aloe vera and vitamin E",
            "Quick drying formula leaves no sticky residue",
            "Suitable for frequent use without drying skin",
            "Pleasant, mild fragrance",
            "Available in multiple sizes for different environments",
            "Dermatologically tested and approved",
            "Non-flammable gel formula",
          ],
          specifications: {
            "Active Ingredient": "70% Ethyl Alcohol",
            "Inactive Ingredients":
              "Water, Glycerin, Aloe Vera Extract, Vitamin E, Carbomer, Triethanolamine",
            Form: "Clear Gel",
            Color: "Transparent",
            Fragrance: "Mild, Fresh",
            "pH Level": "6.5-7.5",
            Density: "0.87 g/ml",
            Viscosity: "2000-4000 cP",
            "Flash Point": ">23°C",
            "Shelf Life": "36 months from manufacture date",
            Storage: "Store in cool, dry place below 30°C",
            "Package Material": "HDPE Bottle with PP Cap",
            "Minimum Order": "1 Case",
          },
          usage: {
            application:
              "Apply 1-2 ml to palm of dry hands and rub thoroughly until dry (approximately 20-30 seconds)",
            frequency:
              "Use as needed throughout the day, especially before eating, after using restroom, and after contact with potentially contaminated surfaces",
            precautions: [
              "For external use only",
              "Avoid contact with eyes",
              "Keep out of reach of children",
              "Do not use on broken or irritated skin",
              "Discontinue use if irritation occurs",
              "Flammable - keep away from heat and flame",
            ],
            suitableFor: [
              "Healthcare facilities",
              "Food service establishments",
              "Office buildings",
              "Schools and universities",
              "Manufacturing facilities",
              "Retail environments",
              "Public transportation",
              "Home use",
            ],
          },
          sizes: [
            {
              size: "250ml",
              sku: "HS1001-250",
              caseQty: 24,
              dimensions: "15cm x 6cm x 6cm",
              weight: "0.3kg",
              barcode: "1234567890123",
            },
            {
              size: "500ml",
              sku: "HS1001-500",
              caseQty: 12,
              dimensions: "20cm x 7cm x 7cm",
              weight: "0.6kg",
              barcode: "1234567890124",
            },
            {
              size: "1L",
              sku: "HS1001-1000",
              caseQty: 6,
              dimensions: "25cm x 9cm x 9cm",
              weight: "1.2kg",
              barcode: "1234567890125",
            },
            {
              size: "5L",
              sku: "HS1001-5000",
              caseQty: 2,
              dimensions: "30cm x 20cm x 15cm",
              weight: "5.5kg",
              barcode: "1234567890126",
            },
          ],
          certifications: [
            {
              name: "FDA Approved",
              description: "Approved by the U.S. Food and Drug Administration",
              issueDate: "2023-01-15",
              expiryDate: "2026-01-15",
            },
            {
              name: "EN 1500 Compliant",
              description: "European standard for hygienic handrub",
              issueDate: "2023-02-10",
              expiryDate: "2026-02-10",
            },
            {
              name: "WHO Recommended Formulation",
              description: "Follows World Health Organization guidelines",
              issueDate: "2023-01-01",
              expiryDate: "2026-01-01",
            },
            {
              name: "Dermatologically Tested",
              description: "Tested for skin compatibility and safety",
              issueDate: "2023-03-05",
              expiryDate: "2026-03-05",
            },
          ],
          qualityControl: {
            testing: [
              "Microbiological efficacy testing",
              "Skin irritation testing",
              "Stability testing",
              "pH testing",
              "Viscosity testing",
              "Alcohol content verification",
            ],
            standards: [
              "ISO 9001:2015 Quality Management",
              "ISO 14001:2015 Environmental Management",
              "OHSAS 18001 Occupational Health & Safety",
              "GMP (Good Manufacturing Practice)",
            ],
          },
          sustainability: {
            packaging: "Recyclable HDPE bottles",
            carbonFootprint: "Carbon neutral shipping available",
            certifications: ["Eco-friendly packaging", "Sustainable sourcing"],
            recycling:
              "Bottles are 100% recyclable - please dispose responsibly",
          },
          documents: {
            productDatasheet: "/sample.pdf",
            technicalData: "/sample.pdf",
            safetyDataSheet: "/sample.pdf",
            usageInstructions: "/sample.pdf",
            certificationDocuments: "/sample.pdf",
            qualityReport: "/sample.pdf",
            complianceDocuments: "/sample.pdf",
          },
          relatedProducts: [
            {
              id: "hs-1002",
              name: "GelGuard Plus",
              image: "/placeholder.svg?height=200&width=200",
            },
            {
              id: "hs-1003",
              name: "FoamSan Pro",
              image: "/placeholder.svg?height=200&width=200",
            },
            {
              id: "hd-3001",
              name: "AutoSense Touchless Dispenser",
              image: "/placeholder.svg?height=200&width=200",
            },
          ],
        },
      },
    },
  },
  "surface-disinfection": {
    sprays: {
      id: "sprays",
      name: "Disinfectant Sprays",
      products: {
        test: {
          id: "test",
          name: "QuickClean Surface Spray",
          brand: "HygieneMax",
          description:
            "QuickClean Surface Spray is a powerful, ready-to-use disinfectant spray that kills 99.9% of germs, bacteria, and viruses on hard surfaces. Ideal for healthcare facilities, offices, schools, and homes, this fast-acting formula requires no rinsing and leaves surfaces sanitized with a fresh scent.",
          shortDescription:
            "Fast-acting surface disinfectant spray for all hard surfaces",
          image: "/placeholder.svg?height=500&width=500",
          additionalImages: [
            "/placeholder.svg?height=400&width=400",
            "/placeholder.svg?height=400&width=400",
            "/placeholder.svg?height=400&width=400",
            "/placeholder.svg?height=400&width=400",
          ],
          features: [
            "Kills 99.9% of germs, bacteria, and viruses",
            "Ready-to-use formula, no dilution required",
            "Fast-acting - disinfects in 30 seconds",
            "No rinsing required on food-contact surfaces",
            "Fresh citrus scent",
            "Non-staining formula",
            "Safe for most hard surfaces",
            "Hospital-grade disinfectant",
          ],
          specifications: {
            "Active Ingredients": "Quaternary ammonium compounds",
            "Inactive Ingredients":
              "Water, Fragrance, Surfactants, pH Adjusters",
            Form: "Liquid Spray",
            Color: "Clear",
            Fragrance: "Citrus",
            "pH Level": "7.0-8.0",
            "Kill Time": "30 seconds for bacteria, 60 seconds for viruses",
            "Shelf Life": "24 months from manufacture date",
            Storage: "Store in cool, dry place below 30°C",
            "Package Material": "HDPE Bottle with Trigger Spray",
            Coverage: "Approximately 10-15 sq. ft. per oz",
          },
          usage: {
            application:
              "Spray 6-8 inches from surface until thoroughly wet. Allow to remain wet for 30-60 seconds. Wipe or allow to air dry.",
            frequency:
              "Use daily on high-touch surfaces or as needed for visible soiling or contamination",
            precautions: [
              "Avoid contact with eyes",
              "Keep out of reach of children",
              "Do not mix with bleach or other cleaning products",
              "Use in well-ventilated areas",
              "Wash hands after handling",
              "Not for personal hygiene use",
            ],
            suitableFor: [
              "Healthcare facilities",
              "Schools and daycare centers",
              "Offices and workplaces",
              "Food service areas",
              "Gyms and fitness centers",
              "Public transportation",
              "Retail environments",
              "Home use",
            ],
          },
          sizes: [
            {
              size: "500ml",
              sku: "SD2001-500",
              caseQty: 12,
              dimensions: "22cm x 8cm x 8cm",
              weight: "0.55kg",
              barcode: "1234567890127",
            },
            {
              size: "750ml",
              sku: "SD2001-750",
              caseQty: 12,
              dimensions: "25cm x 9cm x 9cm",
              weight: "0.8kg",
              barcode: "1234567890128",
            },
            {
              size: "1L",
              sku: "SD2001-1000",
              caseQty: 6,
              dimensions: "28cm x 10cm x 10cm",
              weight: "1.1kg",
              barcode: "1234567890129",
            },
            {
              size: "5L",
              sku: "SD2001-5000",
              caseQty: 2,
              dimensions: "30cm x 20cm x 15cm",
              weight: "5.3kg",
              barcode: "1234567890130",
            },
          ],
          certifications: [
            {
              name: "EPA Registered",
              description:
                "Registered with the Environmental Protection Agency",
              issueDate: "2023-03-15",
              expiryDate: "2026-03-15",
            },
            {
              name: "Hospital Grade",
              description:
                "Meets requirements for use in healthcare facilities",
              issueDate: "2023-02-20",
              expiryDate: "2026-02-20",
            },
            {
              name: "Food Contact Safe",
              description:
                "Safe for use on food contact surfaces with no rinse required",
              issueDate: "2023-01-10",
              expiryDate: "2026-01-10",
            },
            {
              name: "NSF Certified",
              description: "Certified by the National Sanitation Foundation",
              issueDate: "2023-04-05",
              expiryDate: "2026-04-05",
            },
          ],
          qualityControl: {
            testing: [
              "Antimicrobial efficacy testing",
              "Surface compatibility testing",
              "Stability testing",
              "pH testing",
              "Fragrance stability testing",
              "Active ingredient verification",
            ],
            standards: [
              "ISO 9001:2015 Quality Management",
              "ISO 14001:2015 Environmental Management",
              "GMP (Good Manufacturing Practice)",
              "AOAC Testing Methods",
            ],
          },
          sustainability: {
            packaging: "Recyclable HDPE bottles with trigger sprayers",
            carbonFootprint: "Carbon offset program for manufacturing",
            certifications: [
              "Eco-friendly packaging",
              "Reduced water usage in manufacturing",
            ],
            recycling:
              "Bottles and sprayers are 100% recyclable - please dispose responsibly",
          },
          documents: {
            productDatasheet: "/sample.pdf",
            technicalData: "/sample.pdf",
            safetyDataSheet: "/sample.pdf",
            usageInstructions: "/sample.pdf",
            certificationDocuments: "/sample.pdf",
            qualityReport: "/sample.pdf",
            complianceDocuments: "/sample.pdf",
          },
          relatedProducts: [
            {
              id: "sd-2002",
              name: "MultiSurface Wipes",
              image: "/placeholder.svg?height=200&width=200",
            },
            {
              id: "sd-2003",
              name: "FoamClean Disinfectant",
              image: "/placeholder.svg?height=200&width=200",
            },
            {
              id: "sd-2004",
              name: "Surface Shield Protectant",
              image: "/placeholder.svg?height=200&width=200",
            },
          ],
        },
        "sd-3001": {
          id: "sd-3001",
          name: "ProShield Disinfectant Spray",
          brand: "SafeClean",
          description:
            "Professional-grade disinfectant spray for all hard surfaces",
          shortDescription:
            "Professional-grade disinfectant spray for all hard surfaces",
          image: "/placeholder.svg?height=500&width=500",
          additionalImages: [
            "/placeholder.svg?height=400&width=400",
            "/placeholder.svg?height=400&width=400",
            "/placeholder.svg?height=400&width=400",
            "/placeholder.svg?height=400&width=400",
          ],
          features: [
            "Hospital-grade disinfection",
            "Kills 99.9% of viruses and bacteria",
            "Works in 2 minutes",
            "No harsh chemicals",
            "Pleasant scent",
            "Non-staining formula",
          ],
          specifications: {
            "Active Ingredients": "Quaternary ammonium compounds",
            Form: "Liquid Spray",
            Fragrance: "Fresh",
            "Kill Time": "2 minutes",
            "Shelf Life": "24 months",
          },
          usage: {
            application:
              "Spray 6-8 inches from surface until thoroughly wet. Allow to remain wet for 2 minutes. Wipe or allow to air dry.",
            frequency: "Use daily on high-touch surfaces",
            precautions: [
              "Avoid contact with eyes",
              "Keep out of reach of children",
              "Do not mix with bleach",
            ],
            suitableFor: [
              "Healthcare facilities",
              "Schools",
              "Offices",
              "Retail environments",
            ],
          },
          sizes: [
            {
              size: "500ml",
              sku: "SD3001-500",
              caseQty: 12,
              dimensions: "22cm x 8cm x 8cm",
              weight: "0.55kg",
              barcode: "1234567890131",
            },
            {
              size: "1L",
              sku: "SD3001-1000",
              caseQty: 6,
              dimensions: "28cm x 10cm x 10cm",
              weight: "1.1kg",
              barcode: "1234567890132",
            },
          ],
          certifications: [
            {
              name: "EPA Registered",
              description:
                "Registered with the Environmental Protection Agency",
              issueDate: "2023-05-15",
              expiryDate: "2026-05-15",
            },
            {
              name: "Hospital Grade",
              description:
                "Meets requirements for use in healthcare facilities",
              issueDate: "2023-04-20",
              expiryDate: "2026-04-20",
            },
          ],
          qualityControl: {
            testing: [
              "Antimicrobial efficacy testing",
              "Surface compatibility testing",
              "Stability testing",
            ],
            standards: [
              "ISO 9001:2015 Quality Management",
              "GMP (Good Manufacturing Practice)",
            ],
          },
          sustainability: {
            packaging: "Recyclable HDPE bottles",
            carbonFootprint: "Carbon offset program",
            certifications: ["Eco-friendly packaging"],
            recycling: "Bottles are 100% recyclable",
          },
          documents: {
            productDatasheet: "/sample.pdf",
            technicalData: "/sample.pdf",
            safetyDataSheet: "/sample.pdf",
            usageInstructions: "/sample.pdf",
            certificationDocuments: "/sample.pdf",
            qualityReport: "/sample.pdf",
            complianceDocuments: "/sample.pdf",
          },
          relatedProducts: [
            {
              id: "sd-2002",
              name: "MultiSurface Wipes",
              image: "/placeholder.svg?height=200&width=200",
            },
            {
              id: "sd-2003",
              name: "FoamClean Disinfectant",
              image: "/placeholder.svg?height=200&width=200",
            },
          ],
        },
      },
    },
    wipes: {
      id: "wipes",
      name: "Disinfectant Wipes",
      products: {
        "sd-2002": {
          id: "sd-2002",
          name: "MultiSurface Wipes",
          brand: "HygieneMax",
          description:
            "Convenient disinfectant wipes for quick surface cleaning",
          shortDescription:
            "Convenient disinfectant wipes for quick surface cleaning",
          image: "/placeholder.svg?height=500&width=500",
          additionalImages: [
            "/placeholder.svg?height=400&width=400",
            "/placeholder.svg?height=400&width=400",
            "/placeholder.svg?height=400&width=400",
            "/placeholder.svg?height=400&width=400",
          ],
          features: [
            "Kills 99.9% of germs",
            "Pre-moistened for convenience",
            "Thick, durable wipes",
            "Safe on most surfaces",
            "Fresh scent",
          ],
          specifications: {
            "Active Ingredients": "Quaternary ammonium compounds",
            "Wipe Material": "Non-woven fabric",
            "Wipe Size": "20cm x 18cm",
            "Moisture Content": "Optimal for disinfection",
            "Shelf Life": "18 months sealed",
          },
          usage: {
            application:
              "Wipe surface and allow to remain wet for 30 seconds. Discard after use.",
            frequency: "Use as needed for quick disinfection",
            precautions: [
              "For external use only",
              "Do not flush",
              "Keep container sealed when not in use",
            ],
            suitableFor: [
              "Office equipment",
              "Door handles",
              "Countertops",
              "Bathroom surfaces",
            ],
          },
          sizes: [
            {
              size: "80 wipes",
              sku: "SD2002-80",
              caseQty: 12,
              dimensions: "15cm x 10cm x 20cm",
              weight: "0.5kg",
              barcode: "1234567890133",
            },
            {
              size: "160 wipes",
              sku: "SD2002-160",
              caseQty: 6,
              dimensions: "20cm x 12cm x 22cm",
              weight: "0.95kg",
              barcode: "1234567890134",
            },
          ],
          certifications: [
            {
              name: "EPA Registered",
              description:
                "Registered with the Environmental Protection Agency",
              issueDate: "2023-02-15",
              expiryDate: "2026-02-15",
            },
            {
              name: "Dermatologically Tested",
              description: "Tested for skin compatibility",
              issueDate: "2023-01-20",
              expiryDate: "2026-01-20",
            },
          ],
          qualityControl: {
            testing: [
              "Antimicrobial efficacy testing",
              "Moisture content testing",
              "Wipe strength testing",
            ],
            standards: [
              "ISO 9001:2015 Quality Management",
              "GMP (Good Manufacturing Practice)",
            ],
          },
          sustainability: {
            packaging: "Recyclable plastic container",
            carbonFootprint: "Reduced water usage in manufacturing",
            certifications: ["Sustainable forestry practices"],
            recycling: "Container is recyclable",
          },
          documents: {
            productDatasheet: "/sample.pdf",
            technicalData: "/sample.pdf",
            safetyDataSheet: "/sample.pdf",
            usageInstructions: "/sample.pdf",
            certificationDocuments: "/sample.pdf",
            qualityReport: "/sample.pdf",
            complianceDocuments: "/sample.pdf",
          },
          relatedProducts: [
            {
              id: "test",
              name: "QuickClean Surface Spray",
              image: "/placeholder.svg?height=200&width=200",
            },
            {
              id: "sd-3001",
              name: "ProShield Disinfectant Spray",
              image: "/placeholder.svg?height=200&width=200",
            },
          ],
        },
      },
    },
  },
};

// Default product template for fallback
const defaultProductTemplate = {
  id: "",
  name: "Product Not Found",
  brand: "Unknown",
  description: "This product information is not available at the moment.",
  shortDescription: "Product information unavailable",
  image: "/placeholder.svg?height=500&width=500",
  additionalImages: [
    "/placeholder.svg?height=400&width=400",
    "/placeholder.svg?height=400&width=400",
    "/placeholder.svg?height=400&width=400",
    "/placeholder.svg?height=400&width=400",
  ],
  features: ["Information not available"],
  specifications: {
    "Product ID": "Not available",
  },
  usage: {
    application: "Information not available",
    frequency: "Information not available",
    precautions: ["Information not available"],
    suitableFor: ["Information not available"],
  },
  sizes: [
    {
      size: "N/A",
      sku: "N/A",
      caseQty: 0,
      dimensions: "N/A",
      weight: "N/A",
      barcode: "N/A",
    },
  ],
  certifications: [
    {
      name: "N/A",
      description: "Information not available",
      issueDate: "N/A",
      expiryDate: "N/A",
    },
  ],
  qualityControl: {
    testing: ["Information not available"],
    standards: ["Information not available"],
  },
  sustainability: {
    packaging: "Information not available",
    carbonFootprint: "Information not available",
    certifications: ["Information not available"],
    recycling: "Information not available",
  },
  documents: {
    productDatasheet: "/sample.pdf",
    technicalData: "/sample.pdf",
    safetyDataSheet: "/sample.pdf",
    usageInstructions: "/sample.pdf",
    certificationDocuments: "/sample.pdf",
    qualityReport: "/sample.pdf",
    complianceDocuments: "/sample.pdf",
  },
  relatedProducts: [],
};

export default function ProductDetailPage({
  params,
}: {
  params: { type: string; subtype: string; product: string };
}) {
  const { type, subtype, product: productId } = params;

  // Check if the product type exists
  if (!productData[type]) {
    notFound();
  }

  // Check if the subtype exists
  if (!productData[type][subtype]) {
    notFound();
  }

  // Get the product data or use default template if not found
  const product = productData[type][subtype]?.products?.[productId] || null;

  // If product doesn't exist, return 404
  if (!product) {
    notFound();
  }

  const productType = type
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
  const subtypeName = productData[type][subtype].name;

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      {/* <header className="border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-2">
              <Shield className="h-8 w-8 text-blue-600" />
              <span className="text-2xl font-bold text-gray-900">HygieneMax</span>
            </div>
            <nav className="hidden md:flex space-x-8">
              <Link href="/" className="text-gray-700 hover:text-blue-600 transition-colors">
                Home
              </Link>
              <Link href="/products" className="text-blue-600 font-medium">
                Products
              </Link>
              <Link href="/suppliers" className="text-gray-700 hover:text-blue-600 transition-colors">
                Suppliers
              </Link>
              <Link href="/#contact" className="text-gray-700 hover:text-blue-600 transition-colors">
                Contact
              </Link>
            </nav>
            <Button className="bg-blue-600 hover:bg-blue-700">Get Quote</Button>
          </div>
        </div>
      </header> */}
      <Header />

      {/* Breadcrumb */}
      <div className="bg-gray-50 py-4 border-b">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center text-sm">
            <Link
              href="/products"
              className="text-gray-500 hover:text-blue-600"
            >
              Products
            </Link>
            <span className="mx-2 text-gray-400">/</span>
            <Link
              href={`/products/${type}`}
              className="text-gray-500 hover:text-blue-600"
            >
              {productType}
            </Link>
            <span className="mx-2 text-gray-400">/</span>
            <Link
              href={`/products/${type}/${subtype}`}
              className="text-gray-500 hover:text-blue-600"
            >
              {subtypeName}
            </Link>
            <span className="mx-2 text-gray-400">/</span>
            <span className="text-gray-900 font-medium">{product.name}</span>
          </div>
        </div>
      </div>

      {/* Product Overview */}
      <section className="py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-12">
            {/* Product Images */}
            <div className="lg:w-1/2 space-y-6">
              <div className="bg-white rounded-lg border p-4 flex items-center justify-center">
                <Image
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  width={500}
                  height={500}
                  className="object-contain max-h-[400px]"
                  priority
                />
              </div>
              <div className="grid grid-cols-4 gap-4">
                {product.additionalImages.map((img, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-lg border p-2 cursor-pointer hover:border-blue-500 transition-colors"
                  >
                    <Image
                      src={img || "/placeholder.svg"}
                      alt={`${product.name} view ${index + 1}`}
                      width={100}
                      height={100}
                      className="object-contain h-20 w-full"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div className="lg:w-1/2">
              <div className="mb-2">
                <Link
                  href={`/products/${type}/${subtype}`}
                  className="inline-flex items-center text-blue-600 hover:text-blue-800"
                >
                  <ArrowLeft className="h-4 w-4 mr-1" />
                  Back to {subtypeName}
                </Link>
              </div>
              <div className="flex items-center gap-3 mb-2">
                <Badge variant="outline" className="text-xs">
                  ID: {product.id}
                </Badge>
                <Badge variant="secondary" className="text-xs">
                  {product.brand}
                </Badge>
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                  <span className="ml-2 text-sm text-gray-600">(4.9/5)</span>
                </div>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {product.name}
              </h1>
              <p className="text-lg text-gray-600 mb-6">
                {product.description}
              </p>

              {/* Quick Info Cards */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <Card>
                  <CardContent className="p-4 text-center">
                    <Package className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                    <div className="text-sm font-medium">Available Sizes</div>
                    <div className="text-xs text-gray-500">
                      {product.sizes.length} options
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <Truck className="h-8 w-8 text-green-600 mx-auto mb-2" />
                    <div className="text-sm font-medium">Fast Delivery</div>
                    <div className="text-xs text-gray-500">
                      2-3 business days
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Call to Action */}
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    size="lg"
                    className="bg-blue-600 hover:bg-blue-700 flex-1"
                  >
                    <Phone className="h-5 w-5 mr-2" />
                    Request Quote
                  </Button>
                  <Button size="lg" variant="outline" className="flex-1">
                    <Download className="h-5 w-5 mr-2" />
                    Download Datasheet
                  </Button>
                </div>
                <p className="text-sm text-gray-500 text-center">
                  Need help? Contact our product specialists for personalized
                  recommendations
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Detailed Information Tabs */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-2 lg:grid-cols-6">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="specifications">Specifications</TabsTrigger>
              <TabsTrigger value="usage">Usage & Safety</TabsTrigger>
              <TabsTrigger value="certifications">Certifications</TabsTrigger>
              <TabsTrigger value="documents">Documents</TabsTrigger>
              <TabsTrigger value="sustainability">Sustainability</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="mt-6">
              <div className="grid lg:grid-cols-2 gap-8">
                <Card>
                  <CardHeader>
                    <CardTitle>Key Features</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {product.features.map((feature, index) => (
                        <li key={index} className="flex items-start">
                          <Check className="h-5 w-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Available Sizes & SKUs</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {product.sizes.map((size, index) => (
                        <div key={index} className="border rounded-lg p-4">
                          <div className="flex justify-between items-start mb-2">
                            <div className="text-lg font-medium">
                              {size.size}
                            </div>
                            <Badge variant="outline">SKU: {size.sku}</Badge>
                          </div>
                          <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                            <div>Case Qty: {size.caseQty} units</div>
                            <div>Weight: {size.weight}</div>
                            <div>Dimensions: {size.dimensions}</div>
                            <div>Barcode: {size.barcode}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="specifications" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Technical Specifications</CardTitle>
                  <CardDescription>
                    Detailed technical information and composition
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    {Object.entries(product.specifications).map(
                      ([key, value]) => (
                        <div
                          key={key}
                          className="flex justify-between py-2 border-b border-gray-100"
                        >
                          <span className="font-medium text-gray-700">
                            {key}:
                          </span>
                          <span className="text-gray-900">{value}</span>
                        </div>
                      )
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="usage" className="mt-6">
              <div className="grid lg:grid-cols-2 gap-8">
                <Card>
                  <CardHeader>
                    <CardTitle>Usage Instructions</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-2">Application:</h4>
                      <p className="text-gray-600">
                        {product.usage.application}
                      </p>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2">Frequency:</h4>
                      <p className="text-gray-600">{product.usage.frequency}</p>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2">Suitable For:</h4>
                      <ul className="space-y-1">
                        {product.usage.suitableFor.map((item, index) => (
                          <li
                            key={index}
                            className="flex items-center text-gray-600"
                          >
                            <Check className="h-4 w-4 text-green-600 mr-2" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Safety Precautions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {product.usage.precautions.map((precaution, index) => (
                        <li key={index} className="flex items-start">
                          <Info className="h-5 w-5 text-amber-600 mr-2 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-600">{precaution}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="certifications" className="mt-6">
              <div className="grid md:grid-cols-2 gap-6">
                {product.certifications.map((cert, index) => (
                  <Card key={index}>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Shield className="h-5 w-5 text-green-600 mr-2" />
                        {cert.name}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 mb-4">{cert.description}</p>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-500">Issue Date:</span>
                          <span>{cert.issueDate}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500">Expiry Date:</span>
                          <span>{cert.expiryDate}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Quality Control & Standards</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-medium mb-3">Testing Procedures:</h4>
                      <ul className="space-y-2">
                        {product.qualityControl.testing.map((test, index) => (
                          <li key={index} className="flex items-center">
                            <Check className="h-4 w-4 text-green-600 mr-2" />
                            <span className="text-gray-600">{test}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium mb-3">
                        Compliance Standards:
                      </h4>
                      <ul className="space-y-2">
                        {product.qualityControl.standards.map(
                          (standard, index) => (
                            <li key={index} className="flex items-center">
                              <Check className="h-4 w-4 text-green-600 mr-2" />
                              <span className="text-gray-600">{standard}</span>
                            </li>
                          )
                        )}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="documents" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Product Documentation</CardTitle>
                  <CardDescription>
                    Download comprehensive product information and documentation
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <Link
                      href={product.documents.productDatasheet}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button
                        variant="outline"
                        className="w-full h-auto p-4 flex flex-col items-center space-y-2"
                      >
                        <FileText className="h-8 w-8 text-blue-600" />
                        <span className="font-medium">Product Datasheet</span>
                        <span className="text-xs text-gray-500">
                          Complete product overview
                        </span>
                      </Button>
                    </Link>

                    <Link
                      href={product.documents.technicalData}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button
                        variant="outline"
                        className="w-full h-auto p-4 flex flex-col items-center space-y-2"
                      >
                        <Info className="h-8 w-8 text-green-600" />
                        <span className="font-medium">Technical Data</span>
                        <span className="text-xs text-gray-500">
                          Detailed specifications
                        </span>
                      </Button>
                    </Link>

                    <Link
                      href={product.documents.safetyDataSheet}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button
                        variant="outline"
                        className="w-full h-auto p-4 flex flex-col items-center space-y-2"
                      >
                        <Shield className="h-8 w-8 text-red-600" />
                        <span className="font-medium">Safety Data Sheet</span>
                        <span className="text-xs text-gray-500">
                          Safety information
                        </span>
                      </Button>
                    </Link>

                    <Link
                      href={product.documents.usageInstructions}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button
                        variant="outline"
                        className="w-full h-auto p-4 flex flex-col items-center space-y-2"
                      >
                        <FileText className="h-8 w-8 text-purple-600" />
                        <span className="font-medium">Usage Instructions</span>
                        <span className="text-xs text-gray-500">
                          How to use guide
                        </span>
                      </Button>
                    </Link>

                    <Link
                      href={product.documents.certificationDocuments}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button
                        variant="outline"
                        className="w-full h-auto p-4 flex flex-col items-center space-y-2"
                      >
                        <Shield className="h-8 w-8 text-green-600" />
                        <span className="font-medium">Certifications</span>
                        <span className="text-xs text-gray-500">
                          All certificates
                        </span>
                      </Button>
                    </Link>

                    <Link
                      href={product.documents.qualityReport}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button
                        variant="outline"
                        className="w-full h-auto p-4 flex flex-col items-center space-y-2"
                      >
                        <Star className="h-8 w-8 text-yellow-600" />
                        <span className="font-medium">Quality Report</span>
                        <span className="text-xs text-gray-500">
                          Test results
                        </span>
                      </Button>
                    </Link>
                  </div>

                  <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                    <div className="flex items-center mb-2">
                      <Download className="h-5 w-5 text-blue-600 mr-2" />
                      <span className="font-medium text-blue-900">
                        Download All Documents
                      </span>
                    </div>
                    <p className="text-sm text-blue-700 mb-3">
                      Get all product documentation in a single ZIP file for
                      easy access and sharing.
                    </p>
                    <Button className="bg-blue-600 hover:bg-blue-700">
                      Download Complete Package
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="sustainability" className="mt-6">
              <div className="grid lg:grid-cols-2 gap-8">
                <Card>
                  <CardHeader>
                    <CardTitle>Environmental Impact</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-2">Packaging:</h4>
                      <p className="text-gray-600">
                        {product.sustainability.packaging}
                      </p>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2">Carbon Footprint:</h4>
                      <p className="text-gray-600">
                        {product.sustainability.carbonFootprint}
                      </p>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2">Recycling:</h4>
                      <p className="text-gray-600">
                        {product.sustainability.recycling}
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Sustainability Certifications</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {product.sustainability.certifications.map(
                        (cert, index) => (
                          <li key={index} className="flex items-center">
                            <Check className="h-4 w-4 text-green-600 mr-2" />
                            <span className="text-gray-600">{cert}</span>
                          </li>
                        )
                      )}
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Related Products */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            Related Products
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {product.relatedProducts.map((relatedProduct) => (
              <Card
                key={relatedProduct.id}
                className="group hover:shadow-lg transition-shadow"
              >
                <div className="p-6 flex justify-center">
                  <Image
                    src={relatedProduct.image || "/placeholder.svg"}
                    alt={relatedProduct.name}
                    width={150}
                    height={150}
                    className="object-contain"
                  />
                </div>
                <CardHeader>
                  <CardTitle className="text-lg">
                    {relatedProduct.name}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Link
                    href={`/products/${type}/${subtype}/${relatedProduct.id}`}
                  >
                    <Button
                      variant="outline"
                      className="w-full group-hover:bg-blue-600 group-hover:text-white transition-colors"
                    >
                      View Product
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 bg-blue-600">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Need More Information?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Our product specialists are ready to help you find the perfect
            solution for your needs
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              variant="secondary"
              className="bg-white text-blue-600 hover:bg-gray-100"
            >
              <Phone className="h-5 w-5 mr-2" />
              Contact Specialist
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-blue-600"
            >
              Request Custom Quote
            </Button>
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
                Your trusted partner for premium hygiene products and equipment.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Products</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link
                    href="/products/hand-hygiene"
                    className="hover:text-white transition-colors"
                  >
                    Hand Hygiene
                  </Link>
                </li>
                <li>
                  <Link
                    href="/products/surface-disinfection"
                    className="hover:text-white transition-colors"
                  >
                    Surface Disinfection
                  </Link>
                </li>
                <li>
                  <Link
                    href="/products/protective-gear"
                    className="hover:text-white transition-colors"
                  >
                    Protective Gear
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
