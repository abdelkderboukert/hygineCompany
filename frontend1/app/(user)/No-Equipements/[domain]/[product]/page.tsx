// "use client";
import React, { useEffect, useState } from "react";
import * as motion from "motion/react-client";
import Iteme from "@/components/Iteme";
import { useFirestore } from "@/_utils/useFirestore";
import { db } from "@/firebase";
import { collection, getDocs } from "firebase/firestore";
import Link from "next/link";

interface EquipementType {
  id: string;
  typeName: string;
  image?: string;
}

const Page = ({
  params,
}: {
  params: { domain: string; product: string };
}) => {
  const domain = decodeURIComponent(params.domain);
  const product = decodeURIComponent(params.product);

  const [equipementSubType, setEquipementSubType] = useState<EquipementType | null>(null);

  // Fetch all subTypes, then select the one matching the product name
  const fetchProductSubTypeByName = async (type: string, name: string) => {
    try {
      const querySnapshot = await getDocs(
        collection(db, "Equipements", type, "Equipements-subType")
      );

      const types = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as EquipementType[];

      const foundType = types.find((t) => t.typeName === name);
      setEquipementSubType(foundType || null);
    } catch (error) {
      console.error("Error fetching product subtype:", error);
    }
  };

  useEffect(() => {
    if (domain && product) {
      fetchProductSubTypeByName(domain, product);
    }
  }, [domain, product]);

  const { products, loading, error } = useFirestore({
    selectedType: domain,
    selectedSubType: equipementSubType?.id || "", // empty string if not ready
  });

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message || error}</div>;

  return (
    <section className="w-full min-h-screen h-max flex justify-center items-center flex-col">
      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.75 }}
        className="flex mt-20 justify-center mx-auto lg:text-7xl text-4xl text-[#0e012d] font-semibold"
      >
        {product}
      </motion.h1>
      <h2 className="flex justify-center mx-auto text-gray-300 select-none">
        {domain} &gt; {product}
      </h2>

      <div className="w-full h-max grid grid-rows-5 sm:grid-rows-2 sm:grid-cols-3 gap-3 p-5">
        {products.map((serve) => (
          <Link
            href={`/No-Equipements/${params.domain}/${params.product}/${serve.id}`}
            key={serve.id}
          >
            <Iteme produits={serve} />
          </Link>
        ))}
      </div>
    </section>
  );
};

export default Page;
