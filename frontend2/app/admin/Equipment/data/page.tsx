"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Shield, Package, FileText, Loader2, RefreshCw } from "lucide-react"
import { useAuth } from "@/hooks/useAuth"
import { getProductTypes, getProductSubtypes, getProducts } from "@/lib/firebase-admin"
import type { ProductType, ProductSubtype, Product } from "@/lib/firebase-admin"

export default function DataPage() {
  const { user } = useAuth()
  const [productTypes, setProductTypes] = useState<ProductType[]>([])
  const [productSubtypes, setProductSubtypes] = useState<ProductSubtype[]>([])
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)

  const fetchAllData = async () => {
    try {
      setRefreshing(true)
      const [types, subtypes, allProducts] = await Promise.all([getProductTypes(), getProductSubtypes(), getProducts()])

      setProductTypes(types)
      setProductSubtypes(subtypes)
      setProducts(allProducts)
    } catch (error) {
      console.error("Error fetching data:", error)
    } finally {
      setLoading(false)
      setRefreshing(false)
    }
  }

  useEffect(() => {
    fetchAllData()
  }, [])

  const getSubtypesByType = (typeId: string) => {
    return productSubtypes.filter((subtype) => subtype.typeId === typeId)
  }

  const getProductsBySubtype = (subtypeId: string) => {
    return products.filter((product) => product.subtypeId === subtypeId)
  }

  const getProductsByType = (typeId: string) => {
    return products.filter((product) => product.typeId === typeId)
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin mx-auto mb-4 text-blue-600" />
          <p className="text-gray-600">Loading data from Firebase...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <Shield className="h-8 w-8 text-blue-600" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Firebase Data Overview</h1>
                <p className="text-sm text-gray-500">All product types, subtypes, and products</p>
              </div>
            </div>
            <Button onClick={fetchAllData} disabled={refreshing}>
              <RefreshCw className={`h-4 w-4 mr-2 ${refreshing ? "animate-spin" : ""}`} />
              Refresh Data
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Product Types</CardTitle>
              <Shield className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{productTypes.length}</div>
              <p className="text-xs text-muted-foreground">Total categories</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Subtypes</CardTitle>
              <Package className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{productSubtypes.length}</div>
              <p className="text-xs text-muted-foreground">Total subcategories</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Products</CardTitle>
              <FileText className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{products.length}</div>
              <p className="text-xs text-muted-foreground">Total products</p>
            </CardContent>
          </Card>
        </div>

        {/* Data Tabs */}
        <Tabs defaultValue="hierarchy" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="hierarchy">Hierarchy View</TabsTrigger>
            <TabsTrigger value="types">Product Types</TabsTrigger>
            <TabsTrigger value="subtypes">Subtypes</TabsTrigger>
            <TabsTrigger value="products">Products</TabsTrigger>
          </TabsList>

          {/* Hierarchy View */}
          <TabsContent value="hierarchy" className="space-y-6">
            {productTypes.map((type) => (
              <Card key={type.id}>
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <div
                      className={`w-10 h-10 rounded-full ${type.theme.bgColor} border-2 ${type.theme.borderColor} flex items-center justify-center`}
                    >
                      <Shield className={`h-5 w-5 ${type.theme.iconColor}`} />
                    </div>
                    <div>
                      <CardTitle>{type.name}</CardTitle>
                      <CardDescription>{type.description}</CardDescription>
                    </div>
                    <Badge variant="secondary">{getSubtypesByType(type.id!).length} subtypes</Badge>
                    <Badge variant="outline">{getProductsByType(type.id!).length} products</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {getSubtypesByType(type.id!).map((subtype) => (
                      <div key={subtype.id} className="border-l-2 border-gray-200 pl-4">
                        <div className="flex items-center justify-between mb-2">
                          <div>
                            <h4 className="font-medium">{subtype.name}</h4>
                            <p className="text-sm text-gray-600">{subtype.description}</p>
                          </div>
                          <Badge variant="outline">{getProductsBySubtype(subtype.id!).length} products</Badge>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                          {getProductsBySubtype(subtype.id!).map((product) => (
                            <div key={product.id} className="p-2 bg-gray-50 rounded text-sm">
                              <div className="font-medium">{product.name}</div>
                              <div className="text-gray-600">{product.brand}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          {/* Product Types Tab */}
          <TabsContent value="types" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {productTypes.map((type) => (
                <Card key={type.id}>
                  <CardHeader>
                    <div className="flex items-center space-x-3">
                      <div
                        className={`w-10 h-10 rounded-full ${type.theme.bgColor} border-2 ${type.theme.borderColor} flex items-center justify-center`}
                      >
                        <Shield className={`h-5 w-5 ${type.theme.iconColor}`} />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{type.name}</CardTitle>
                        <CardDescription>{type.description}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Subtypes:</span>
                        <Badge variant="secondary">{getSubtypesByType(type.id!).length}</Badge>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Products:</span>
                        <Badge variant="outline">{getProductsByType(type.id!).length}</Badge>
                      </div>
                      <div className="text-xs text-gray-500">ID: {type.id}</div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Subtypes Tab */}
          <TabsContent value="subtypes" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {productSubtypes.map((subtype) => {
                const parentType = productTypes.find((type) => type.id === subtype.typeId)
                return (
                  <Card key={subtype.id}>
                    <CardHeader>
                      <CardTitle className="text-lg">{subtype.name}</CardTitle>
                      <CardDescription>{subtype.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Parent Type:</span>
                          <Badge variant="secondary">{parentType?.name || "Unknown"}</Badge>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Products:</span>
                          <Badge variant="outline">{getProductsBySubtype(subtype.id!).length}</Badge>
                        </div>
                        <div className="text-xs text-gray-500">ID: {subtype.id}</div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </TabsContent>

          {/* Products Tab */}
          <TabsContent value="products" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => {
                const parentType = productTypes.find((type) => type.id === product.typeId)
                const parentSubtype = productSubtypes.find((subtype) => subtype.id === product.subtypeId)
                return (
                  <Card key={product.id}>
                    <CardHeader>
                      <CardTitle className="text-lg">{product.name}</CardTitle>
                      <CardDescription>{product.brand}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <p className="text-sm text-gray-600">{product.shortDescription}</p>
                        <div className="flex justify-between text-sm">
                          <span>Type:</span>
                          <Badge variant="secondary">{parentType?.name || "Unknown"}</Badge>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Subtype:</span>
                          <Badge variant="outline">{parentSubtype?.name || "Unknown"}</Badge>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Features:</span>
                          <Badge variant="outline">{product.features?.length || 0}</Badge>
                        </div>
                        <div className="text-xs text-gray-500">ID: {product.id}</div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
