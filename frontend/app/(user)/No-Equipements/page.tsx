"use client";
import Iteme from "@/components/Iteme";
import React, { useEffect, useState } from "react";
import * as motion from "motion/react-client";
import { db } from "@/firebase";
import { collection, getDocs } from "firebase/firestore";
import Link from "next/link";

interface EquipementType {
  id: string;
  typeName: string;
  image?: string;
}

function Page() {
  // const serves = [
  //   {
  //     id: "1",
  //     name: "Essuyage & Sechage Distributeurs et seche mains",
  //     url: "/No-Equipements/Essuyage-Sechage-Distributeurs-et-seche-mains",
  //     description: "",
  //     images: ["/sechmains.webp"],
  //   },
  //   {
  //     id: "2",
  //     name: "Hygiene Des Personnes",
  //     url: "/No-Equipements/Hygiene-Des-Personnes",
  //     description: "",
  //     images: ["/personnes.webp"],
  //   },
  //   {
  //     id: "3",
  //     name: "Hygiene Des Sanitaires",
  //     url: "/No-Equipements/Hygiene-Des-Sanitaires",
  //     description: "",
  //     images: ["/Hygi_ne_des_sanitaires.webp"],
  //   },
  //   {
  //     id: "4",
  //     name: "Hygiene Des sols, Surfaces",
  //     url: "/No-Equipements/Hygiene-Des-sols-Surfaces",
  //     description: "",
  //     images: ["/sol.webp"],
  //   },
  //   {
  //     id: "5",
  //     name: "Brosserie Recurage",
  //     url: "/No-Equipements/Brosserie-Recurage",
  //     description: "",
  //     images: ["/Balais.webp"],
  //   },
  //   {
  //     id: "6",
  //     name: "Cireuses A Chaaussures",
  //     url: "/No-Equipements/Cireuses-A-Chaaussures",
  //     description: "",
  //     images: ["/serves-conseil.webp"],
  //   },
  //   {
  //     id: "7",
  //     name: "Equipements Pour Abattoirs",
  //     url: "/No-Equipements/Equipements-Pour-Abattoirs",
  //     description: "",
  //     images: ["/industriespharmaciqueetcosmetique.webp"],
  //   },
  //   {
  //     id: "8",
  //     name: "Buses Industrielles",
  //     url: "/No-Equipements/Buses-Industrielles",
  //     description: "",
  //     images: ["/Sante.webp"],
  //   },
  //   {
  //     id: "9",
  //     name: "Equipemments pour industries agroalimentaires",
  //     url: "/No-Equipements/Equipemments-pour-industries-agroalimentaires",
  //     description: "",
  //     images: ["/serves-conseil.webp"],
  //   },
  // ];

  const [EquipementTypes, setEquipementTypes] = useState<EquipementType[]>([]);

  const fetchEquipementTypes = async () => {
    const querySnapshot = await getDocs(collection(db, "Equipements"));
    const types = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as EquipementType[];
    setEquipementTypes(types);
  };
  useEffect(() => {
    fetchEquipementTypes();
  }, []);
  return (
    <section className="w-full h-max">
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: "100%" }}
        className="h-[50dvh] w-full bg-cyan-800 rounded-br-full shadow-xl bg-cover p-5"
        style={{ backgroundImage: "url('/serves.jpg')" }}
      />
      {/* <div className="w-full h-max grid sm:grid-cols-3">
        <div className="w-full min-h-screen h-full flex flex-col">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75 }}
            className="text-5xl text-[#0e012d] font-bold mt-5"
          >
            Nos&nbsp;Equipement
          </motion.h1>
          <p className="w-full h-max p-4 justify-start ">
            nous offrons des Solution de nettoyage et d&apos;hygienen
            personnalisees et concues pour repondre aus besoins de chaque
            secteur d&apos;actvite et chaque entreprise, quel que soit son
            domaine
          </p>
        </div>
        <div className="w-full min-h-screen h-max flex justify-center items-center col-span-2">
          <div className="w-full h-max grid grid-rows-5 sm:grid-rows-2 sm:grid-cols-2 gap-3 p-5">
            {serves.map((serve, index) => (
              <Iteme key={index} produits={serve} />
            ))}
          </div>
        </div>
      </div> */}
      <div className="w-full min-h-screen h-max">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75 }}
          className="flex mt-14 justify-center mx-auto sm:text-7xl text-4xl text-[#0e012d] font-semibold"
        >
          Nos&nbsp;Equipement
        </motion.h1>
        <p className="mx-auto h-max p-4 text-center w-1/2 ">
          nous offrons des Solution de nettoyage et d&apos;hygienen
          personnalisees et concues pour repondre aus besoins de chaque secteur
          d&apos;actvite et chaque entreprise, quel que soit son domaine
        </p>
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
          {EquipementTypes.map((serve, index) => {
            const valeu = {
              id: serve.id,
              name: serve.typeName,
              images: [serve.image],
            };
            return (
              <Link
                href={`/No-Equipements/${serve.typeName}`}
                className=""
                key={index}
              >
                <Iteme key={index}
                //@ts-expect-error type error
                produits={valeu} />
              </Link>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

export default Page;
