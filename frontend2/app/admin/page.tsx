"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { onAuthStateChanged, signOut, type User } from "firebase/auth";
import { auth, db } from "@/lib/firebase";
import { collection, getDocs, query, limit } from "firebase/firestore";
import {
  Loader2,
  AlertCircle,
  Package,
  Layers,
  Grid3X3,
  BarChart,
  LogOut,
  Shield,
} from "lucide-react";
import Link from "next/link";
import { Header } from "@/components/Header";

export default function page() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const [stats, setStats] = useState({
    types: 0,
    subtypes: 0,
    products: 0,
  });
  const [recentItems, setRecentItems] = useState([]);
  const [firebaseError, setFirebaseError] = useState<string | null>(null);
  const [isLoadingData, setIsLoadingData] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);

      if (!user) {
        router.push("/admin/login");
      }
    });

    return unsubscribe;
  }, [router]);

  useEffect(() => {
    async function fetchStats() {
      if (!user) return;

      setIsLoadingData(true);
      try {
        // Check if Firebase is properly initialized
        if (!db) {
          throw new Error("Firebase database is not initialized");
        }

        // Fetch product types count
        const typesSnapshot = await getDocs(collection(db, "productTypes"));
        const typesCount = typesSnapshot.size;

        // Fetch subtypes count
        const subtypesSnapshot = await getDocs(collection(db, "subtypes"));
        const subtypesCount = subtypesSnapshot.size;

        // Fetch products count
        const productsSnapshot = await getDocs(collection(db, "products"));
        const productsCount = productsSnapshot.size;

        // Fetch recent items
        const recentItemsQuery = query(
          collection(db, "productTypes"),
          limit(5)
        );
        const recentItemsSnapshot = await getDocs(recentItemsQuery);
        const recentItemsData = recentItemsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
          type: "Product Type",
        }));

        setStats({
          types: typesCount,
          subtypes: subtypesCount,
          products: productsCount,
        });
        //@ts-ignore
        setRecentItems(recentItemsData);
        setFirebaseError(null);
      } catch (error) {
        console.error("Error fetching stats:", error);
        setFirebaseError(
          error instanceof Error ? error.message : "Unknown error occurred"
        );
      } finally {
        setIsLoadingData(false);
      }
    }

    fetchStats();
  }, [user]);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      router.push("/admin/login");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-blue-600 mx-auto" />
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null; // Router will redirect to login
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {firebaseError && (
          <div className="mb-6 rounded-lg bg-red-50 p-4 text-red-800">
            <div className="flex items-center">
              <AlertCircle className="mr-2 h-5 w-5" />
              <h3 className="font-semibold">Firebase Error</h3>
            </div>
            <p className="mt-2">{firebaseError}</p>
            <p className="mt-2 text-sm">
              Please check your Firebase configuration and environment
              variables. Make sure you have set up the following environment
              variables:
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
      </div>
    </div>
  );
}
