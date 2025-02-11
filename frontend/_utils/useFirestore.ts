"use client";
import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/firebase";

interface Product {
  id: string;
  // Add your specific product properties here
  name: string;
  description?: string;
  image: string[];
  ref: number;
  subtitle: string;
  category: string;
  // ... other fields
}

interface UseFirestoreProps {
  selectedType?: string;
  selectedSubType?: string;
}

interface UseFirestoreResult {
  products: Product[];
  loading: boolean;
  error: Error | null;
}

export const useFirestore = ({
  selectedType,
  selectedSubType,
}: UseFirestoreProps): UseFirestoreResult => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);

        if (!selectedType || !selectedSubType) {
          setProducts([]);
          return;
        }

        const collectionPath = collection(
          db,
          "Equipements",
          selectedType,
          "Equipements-subType",
          selectedSubType,
          "products"
        );

        const snapshot = await getDocs(collectionPath);
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Product[];
        setProducts(data);
      } catch (err) {
        setError(err instanceof Error ? err : new Error("Unknown error"));
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [selectedType, selectedSubType]);

  return { products, loading, error };
};

export const useFirestoreP = ({
  selectedType,
  selectedSubType,
}: UseFirestoreProps): UseFirestoreResult => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);

        if (!selectedType || !selectedSubType) {
          setProducts([]);
          return;
        }

        const collectionPath = collection(
          db,
          "products",
          selectedType,
          "Equipements-subType",
          selectedSubType,
          "products"
        );

        const snapshot = await getDocs(collectionPath);
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Product[];
        setProducts(data);
      } catch (err) {
        setError(err instanceof Error ? err : new Error("Unknown error"));
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [selectedType, selectedSubType]);

  return { products, loading, error };
};
