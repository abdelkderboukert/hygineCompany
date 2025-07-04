"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Save } from "lucide-react"
import { createProductType, uploadFile } from "@/lib/firebase-admin"
import { toast } from "sonner"

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
]

export default function NewProductTypePage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    theme: themeOptions[0].value,
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      let imageUrl = ""

      if (imageFile) {
        const imagePath = `product-types/${Date.now()}-${imageFile.name}`
        imageUrl = await uploadFile(imageFile, imagePath)
      }

      await createProductType({
        ...formData,
        image: imageUrl,
      })

      toast.success("Product type created successfully!")
      router.push("/admin/types")
    } catch (error) {
      console.error("Error creating product type:", error)
      toast.error("Failed to create product type")
    } finally {
      setLoading(false)
    }
  }

  const handleThemeChange = (themeName: string) => {
    const theme = themeOptions.find((t) => t.name === themeName)
    if (theme) {
      setFormData({ ...formData, theme: theme.value })
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <Link href="/admin/types">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Types
                </Button>
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Create Product Type</h1>
                <p className="text-sm text-gray-500">Add a new product category</p>
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
                  <CardTitle>Basic Information</CardTitle>
                  <CardDescription>Enter the basic details for the product type</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <Label htmlFor="name">Name *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g., Sterilization Chemicals"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="description">Description *</Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      placeholder="Describe this product category..."
                      rows={3}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="theme">Theme Color</Label>
                    <Select onValueChange={handleThemeChange} defaultValue="Blue">
                      <SelectTrigger>
                        <SelectValue placeholder="Select a theme color" />
                      </SelectTrigger>
                      <SelectContent>
                        {themeOptions.map((theme) => (
                          <SelectItem key={theme.name} value={theme.name}>
                            <div className="flex items-center space-x-2">
                              <div className={`w-4 h-4 rounded-full bg-gradient-to-r ${theme.value.gradient}`}></div>
                              <span>{theme.name}</span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="image">Category Image</Label>
                    <div className="mt-2">
                      <input
                        id="image"
                        type="file"
                        accept="image/*"
                        onChange={(e) => setImageFile(e.target.files?.[0] || null)}
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
                  <CardDescription>How this will appear on the website</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className={`p-4 rounded-lg ${formData.theme.bgColor} border ${formData.theme.borderColor}`}>
                    <div className="flex items-center space-x-3 mb-3">
                      <div
                        className={`w-8 h-8 rounded-full ${formData.theme.bgColor} border ${formData.theme.borderColor} flex items-center justify-center`}
                      >
                        <div className={`w-4 h-4 rounded-full bg-gradient-to-r ${formData.theme.gradient}`}></div>
                      </div>
                      <h3 className="font-medium">{formData.name || "Product Type Name"}</h3>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">
                      {formData.description || "Product type description will appear here..."}
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
                <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700" disabled={loading}>
                  <Save className="h-4 w-4 mr-2" />
                  {loading ? "Creating..." : "Create Product Type"}
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
  )
}
