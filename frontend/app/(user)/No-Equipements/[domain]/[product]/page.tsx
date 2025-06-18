"use client";
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
  params: Promise<{ domain: string; product: string }>;
}) => {
  const { domain, product } = React.use(params);
  const CLDomain = domain.replace(/%20/g, " ");
  const CLproduct = product.replace(/%20/g, " ");
  console.log("product" + CLproduct);

  const [EquipementSubType, setEquipementSubType] =
    useState<EquipementType | null>(null);

  const fetchProductSubTypeByName = async (type: string, name: string) => {
    console.log(name);
    try {
      const querySnapshot = await getDocs(
        collection(db, "Equipements", type, "Equipements-subType")
      );
      const types = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as EquipementType[];
      console.log(types);
      // Find the product type by name
      const foundType = types.find((type) => type.typeName === name);
      setEquipementSubType(foundType || null);
    } catch (error) {
      console.error("Error fetching product type:", error);
    }
  };

  useEffect(() => {
    if (CLproduct) {
      fetchProductSubTypeByName(CLDomain, CLproduct);
    }
  }, [CLDomain, CLproduct]);
  console.log(EquipementSubType);
  const { products, loading, error } = useFirestore({
    selectedType: CLDomain,
    selectedSubType: EquipementSubType?.id,
  });

  if (loading) return <div>Loading...</div>;
  //@ts-expect-error ggg
  if (error) return <div>Error: {error}</div>;

  return (
    <section className="w-full min-h-screen h-max flex justify-center items-center flex-col">
      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.75 }}
        className="flex mt-20 justify-center mx-auto lg:text-7xl text-4xl text-[#0e012d] font-semibold"
      >
        {CLproduct}
      </motion.h1>
      <h2 className="flex justify-center mx-auto text-gray-300 select-none">
        {CLDomain}&gt;{CLproduct}
      </h2>
      <div className="w-full h-max grid grid-rows-5 sm:grid-rows-2 sm:grid-cols-3 gap-3 p-5">
        {products.map((serve, index) => (
          <Link
            href={`/No-Equipements/${domain}/${product}/${serve.id}`}
            className=""
            key={index}
          >
            <Iteme
              key={index}
              //@ts-expect-error type error
              produits={serve}
            />
          </Link>
        ))}
      </div>
    </section>
  );
};

export default Page;
