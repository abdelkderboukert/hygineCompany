"use client";
import React, { useState, useEffect } from "react";
import * as motion from "motion/react-client";
import Iteme from "@/components/Iteme";
import { db } from "@/firebase";
import { collection, getDocs } from "firebase/firestore";
import Link from "next/link";

interface EquipementType {
  id: string;
  typeName: string;
  image?: string;
}

interface SubType {
  id: string;
  typeName: string;
  image?: string;
}

const Page = ({
  params,
}: {
  params: Promise<{ domain: string; product: string }>;
}) => {
  const { domain } = React.use(params);
  const CLDomain = domain.replace(/%20/g, " ");

  const [EquipementType, setEquipementType] = useState<EquipementType | null>(
    null
  );
  const [EquipementSubTypes, setEquipementSubTypes] = useState<SubType[]>([]);

  const fetchProductTypeByName = async (name: string) => {
    try {
      const querySnapshot = await getDocs(collection(db, "Equipements"));
      const types = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as EquipementType[];
      console.log(types);
      // Find the product type by name
      const foundType = types.find((type) => type.typeName === name);
      setEquipementType(foundType || null);
    } catch (error) {
      console.error("Error fetching product type:", error);
    }
  };

  const fetchEquipementSubTypes = async (typeId: string) => {
    try {
      const subtypesRef = collection(
        db,
        "Equipements",
        typeId,
        "Equipements-subType"
      );
      const querySnapshot = await getDocs(subtypesRef);
      const subtypes = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as SubType[];
      setEquipementSubTypes(subtypes);
      console.log(subtypes);
    } catch (error) {
      console.error("Error fetching subtypes:", error);
      setEquipementSubTypes([]);
    }
  };

  useEffect(() => {
    if (CLDomain) {
      fetchProductTypeByName(CLDomain);
    }
  }, [CLDomain]);
  useEffect(() => {
    if (EquipementType) {
      fetchEquipementSubTypes(EquipementType.id);
    }
  }, [EquipementType]);
  return (
    <section className="w-full h-max min-h-screen">
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: "100%" }}
        className="h-[50dvh] w-full bg-cyan-800 rounded-br-full flex justify-center shadow-xl bg-cover p-5"
        style={{ backgroundImage: `url(${EquipementType?.image})` }}
      ></motion.div>
      <div className="w-full min-h-screen h-max">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75 }}
          className="flex mt-14 justify-center mx-auto sm:text-7xl text-4xl text-[#0e012d] font-semibold"
        >
          {EquipementType?.typeName}
        </motion.h1>
        <motion.div
          variants={{
            hidden: { opacity: 0 },
            show: {
              opacity: 1,
              transition: {
                staggerChildren: 0.5,
              },
            },
          }}
          initial="hidden"
          animate="show"
          className="w-full h-max grid grid-rows-5 sm:grid-rows-2 sm:grid-cols-3 gap-3 p-5"
        >
          {EquipementSubTypes.map((serve, index) => {
            const valeu = {
              id: serve.id,
              name: serve.typeName,
              images: [serve.image],
            };
            return (
              <Link
                href={`/No-Equipements/${EquipementType?.typeName}/${valeu.name}`}
                className=""
                key={index}
              >
                <Iteme
                  key={index}
                  //@ts-expect-error image props missing
                  produits={valeu}
                />
              </Link>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default Page;
