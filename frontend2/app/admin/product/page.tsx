"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { onAuthStateChanged, signOut, type User } from "firebase/auth"
import { auth, db } from "@/lib/firebase"
import { collection, getDocs, query, limit } from "firebase/firestore"
import { Loader2, AlertCircle, Package, Layers, Grid3X3, BarChart, LogOut, Shield } from "lucide-react"
import Link from "next/link"
import { Header } from "@/components/Header"

export default function AdminDashboard() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const [stats, setStats] = useState({
    types: 0,
    subtypes: 0,
    products: 0,
  })
  const [recentItems, setRecentItems] = useState([])
  const [firebaseError, setFirebaseError] = useState<string | null>(null)
  const [isLoadingData, setIsLoadingData] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user)
      setLoading(false)

      if (!user) {
        router.push("/admin/login")
      }
    })

    return unsubscribe
  }, [router])

  useEffect(() => {
    async function fetchStats() {
      if (!user) return

      setIsLoadingData(true)
      try {
        // Check if Firebase is properly initialized
        if (!db) {
          throw new Error("Firebase database is not initialized")
        }

        // Fetch product types count
        const typesSnapshot = await getDocs(collection(db, "productTypes"))
        const typesCount = typesSnapshot.size

        // Fetch subtypes count
        const subtypesSnapshot = await getDocs(collection(db, "subtypes"))
        const subtypesCount = subtypesSnapshot.size

        // Fetch products count
        const productsSnapshot = await getDocs(collection(db, "products"))
        const productsCount = productsSnapshot.size

        // Fetch recent items
        const recentItemsQuery = query(collection(db, "productTypes"), limit(5))
        const recentItemsSnapshot = await getDocs(recentItemsQuery)
        const recentItemsData = recentItemsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
          type: "Product Type",
        }))

        setStats({
          types: typesCount,
          subtypes: subtypesCount,
          products: productsCount,
        })
        //@ts-ignore
        setRecentItems(recentItemsData)
        setFirebaseError(null)
      } catch (error) {
        console.error("Error fetching stats:", error)
        setFirebaseError(error instanceof Error ? error.message : "Unknown error occurred")
      } finally {
        setIsLoadingData(false)
      }
    }

    fetchStats()
  }, [user])

  const handleSignOut = async () => {
    try {
      await signOut(auth)
      router.push("/admin/login")
    } catch (error) {
      console.error("Error signing out:", error)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-blue-600 mx-auto" />
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return null // Router will redirect to login
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      {/* <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <Shield className="h-8 w-8 text-blue-600" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">HygienDust Admin</h1>
                <p className="text-sm text-gray-500">Product Management System</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">{user?.email}</p>
                <p className="text-xs text-gray-500">Administrator</p>
              </div>
              <Button variant="outline" onClick={handleSignOut}>
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </header> */}
      <Header/>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {firebaseError && (
          <div className="mb-6 rounded-lg bg-red-50 p-4 text-red-800">
            <div className="flex items-center">
              <AlertCircle className="mr-2 h-5 w-5" />
              <h3 className="font-semibold">Firebase Error</h3>
            </div>
            <p className="mt-2">{firebaseError}</p>
            <p className="mt-2 text-sm">
              Please check your Firebase configuration and environment variables. Make sure you have set up the
              following environment variables:
            </p>
            <ul className="mt-1 list-inside list-disc text-sm">
              <li>NEXT_PUBLIC_FIREBASE_API_KEY</li>
              <li>NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN</li>
              <li>NEXT_PUBLIC_FIREBASE_PROJECT_ID</li>
              <li>NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET</li>
              <li>NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID</li>
              <li>NEXT_PUBLIC_FIREBASE_APP_ID</li>
            </ul>
          </div>
        )}

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Product Types</CardTitle>
              <Layers className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {isLoadingData ? <Loader2 className="h-6 w-6 animate-spin" /> : stats.types}
              </div>
              <p className="text-xs text-muted-foreground">Main product categories</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Subtypes</CardTitle>
              <Package className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {isLoadingData ? <Loader2 className="h-6 w-6 animate-spin" /> : stats.subtypes}
              </div>
              <p className="text-xs text-muted-foreground">Product subcategories</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Products</CardTitle>
              <Grid3X3 className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {isLoadingData ? <Loader2 className="h-6 w-6 animate-spin" /> : stats.products}
              </div>
              <p className="text-xs text-muted-foreground">Individual products</p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Common administrative tasks</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Link href="/admin/product/types/new">
                <Button className="w-full justify-start bg-blue-600 hover:bg-blue-700">
                  <Package className="h-4 w-4 mr-2" />
                  Create New Product Type
                </Button>
              </Link>
              <Link href="/admin/product/subtypes/new">
                <Button className="w-full justify-start bg-green-600 hover:bg-green-700">
                  <Layers className="h-4 w-4 mr-2" />
                  Create New Subtype
                </Button>
              </Link>
              <Link href="/admin/product/products/new">
                <Button className="w-full justify-start bg-purple-600 hover:bg-purple-700">
                  <Grid3X3 className="h-4 w-4 mr-2" />
                  Create New Product
                </Button>
              </Link>
              <Link href="/admin/data">
                <Button className="w-full justify-start bg-orange-600 hover:bg-orange-700">
                  <BarChart className="h-4 w-4 mr-2" />
                  View All Data
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Management</CardTitle>
              <CardDescription>Manage existing content</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Link href="/admin/product/types">
                <Button variant="outline" className="w-full justify-start">
                  <Layers className="h-4 w-4 mr-2" />
                  Manage Product Types
                </Button>
              </Link>
              <Link href="/admin/product/subtypes">
                <Button variant="outline" className="w-full justify-start">
                  <Package className="h-4 w-4 mr-2" />
                  Manage Subtypes
                </Button>
              </Link>
              <Link href="/admin/product/products">
                <Button variant="outline" className="w-full justify-start">
                  <Grid3X3 className="h-4 w-4 mr-2" />
                  Manage Products
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* Recent Items */}
        {recentItems.length > 0 && (
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Recent Product Types</CardTitle>
              <CardDescription>Recently created product categories</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentItems.map((item: any) => (
                  <div key={item.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 rounded-full bg-blue-100 border-2 border-blue-200 flex items-center justify-center">
                        <Shield className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-medium">{item.name}</h3>
                        <p className="text-sm text-gray-500">{item.description}</p>
                      </div>
                    </div>
                    <Link href={`/admin/product/types/${item.id}/edit`}>
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
                    </Link>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
