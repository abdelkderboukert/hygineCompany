"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRef, useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Item from "@/components/Item";
import Client from "@/components/Clients";
import { db } from "@/firebase";
import { collection, getDocs } from "firebase/firestore";
import { TextReveal } from "@/components/magicui/text-reveal";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface EquipementType {
  id: string;
  typeName: string;
  url: string;
  image?: string;
}

const Servises = [
  {
    name: "Carousel",
    url: "/service/Carousel",
    imageUrl: "/serves-conseil.webp",
  },
  {
    name: "Formation",
    url: "/service/Formation",
    imageUrl: "/serves-formation.webp",
  },
  {
    name: "Mise en route",
    url: "/service/Mis-en-route",
    imageUrl: "/serves-miseRout.webp",
  },
  {
    name: "Apre vente",
    url: "/service/Apre-vente",
    imageUrl: "/serves-Sav.webp",
  },
];

const Fornisure = [
  "/forni/heute-removebg-preview.png",
  "/forni/Lechler_Company-Logo-removebg-preview.png",
  "/forni/Logo_CFSBrands-Jofel-2023Curvas-01.webp",
  "/forni/Logo_DELABIE.png",
  "/forni/logo-ocene.svg",
  "/forni/Logos-Prago_profilgate.png",
  "/forni/ramix.png",
  "/forni/Tork-Logo-700x394.webp",
  "/forni/Vikan_logo.png",
  "",
];

export default function Home() {
  const ref = useRef(null);
  const [Sec, setSec] = useState<EquipementType[]>([]);
  const [EquipementTypes, setEquipementTypes] = useState<EquipementType[]>([]);

  const fetchEquipementTypes = async () => {
    const querySnapshot = await getDocs(collection(db, "products"));
    const types = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as EquipementType[];
    setSec(types);
  };
  useEffect(() => {
    fetchEquipementTypes();
  }, []);

  interface FormData {
    name: string;
    company: string;
    message: string;
    email: string;
    ref: number | undefined;
  }

  const [formData, setFormData] = useState<FormData>({
    name: "",
    company: "",
    message: "",
    email: "",
    ref: 0,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Update handleSubmit
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const response = await fetch("/api/sendEmail", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();
    if (response.ok) {
      alert("Email sent successfully!");
    } else {
      alert("Error sending email: " + data.error);
    }
  };

  const fetchEquipement = async () => {
    const querySnapshot = await getDocs(collection(db, "Equipements"));
    const types = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as EquipementType[];
    setEquipementTypes(types);
  };
  useEffect(() => {
    fetchEquipement();
  }, []);

  const [hoveredDiv, setHoveredDiv] = useState<number | null>(null);

  const handleMouseEnter = (id: number) => {
    setHoveredDiv(id);
  };

  const handleMouseLeave = () => {
    setHoveredDiv(null);
  };
  return (
    <>
      <section className="w-full h-screen grid grid-rows-2 sm:grid-cols-2 sm:grid-rows-1 select-none">
        <div className="flex justify-center items-center h-screen w-full bg-[#001439]">
          <div className="lg:size-3/5 sm:w-4/5 flex justify-start items-start flex-col">
            <motion.p
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-blue-100"
            >
              HGINDUST HGINE INDUSTRAL
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-blue-50 text-5xl font-bold mt-2"
            >
              Now It&apos;s Easy To <br />
              Find <span className="text-blue-600">Your Chois</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-blue-50 my-5"
            >
              The cotton gin, invented by Eli Whitney in 1793, revolutionized
              the cotton industry by mechanizing the labor-intensive process of
              separating cotton fibers from seeds.
            </motion.p>
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              className="w-2/5 h-14 flex bg-[#3995EC] rounded-lg justify-center items-center text-blue-50 font-bold select-none"
            >
              <Link
                className="flex justify-center items-center size-full"
                href={"/#contact"}
              >
                Contact Us&nbsp;&nbsp;
                <img src="i.svg" alt="My Icon" width={30} height={30} />
              </Link>
            </motion.div>
          </div>
        </div>
        <div
          className="bg-cover bg-no-repeat bg-bottom"
          style={{ backgroundImage: "url('/main1.jpg')" }}
        ></div>
      </section>
      <div className="z-10 flex min-h-64 items-center justify-center rounded-lg border bg-gradient-to-b from-blue-200 to-white dark:bg-black">
        <TextReveal text="We Offer the best quality on the market at the best price you can find." />
      </div>
      {/* <section className="w-full h-screen bg-gradient-to-b from-blue-200 to-white"></section> */}
      <section
        ref={ref}
        className="w-full h-screen bg-white flex justify-center items-center flex-row lg:px-24"
      >
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0, transition: { duration: 0.9 } }}
          className="w-1/5 h-4/6 grid grid-rows-2"
        >
          <div
            className="w-full h-full bg-cover bg-no-repeat bg-right bg-black"
            style={{ backgroundImage: "url('/p1.jpg')" }}
          ></div>
          <div
            className="w-full h-full bg-cover bg-no-repeat bg-right bg-red-900 mt-1"
            style={{ backgroundImage: "url('/p2.jpg')" }}
          ></div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0, transition: { duration: 0.75 } }}
          className="w-2/3 md:w-1/2 lg:w-1/3 h-5/6 bg-[#001439] mx-1 p-4 flex flex-col justify-center"
        >
          <h1 className="text-blue-100 text-2xl px-5">
            About&nbsp;<span className="text-cyan-800">Us</span>
          </h1>
          <p className="my-5 text-sm text-white px-5">
            Hygindust (Hygiène industrielle) et Hyprotech (Hygiène
            professionnelle et technologie), sont spécialisés dans le conseil et
            la commercialisation de produits et de matériels de nettoyage et de
            désinfection en industrie agroalimentaire, restauration collective,
            industrie pharmaceutique et cosmétique. <br /> <br /> Par leur
            politique de plus qu&apos;un fournisseur un réel partenaire
            d&apos;hygiène;
          </p>
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-3/5 mx-5 h-11 flex bg-[#3995EC] rounded-lg justify-center items-center text-blue-50 font-bold select-none"
          >
            Rede More
          </motion.div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0, transition: { duration: 1 } }}
          className=" hidden lg:block h-3/5 w-1/3 flex-row"
        >
          <div className="h-full w-4/5 flex flex-col">
            <Link
              href={"https://maps.app.goo.gl/JrMJBhnWmdkMSTf8A"}
              className="w-full h-4/5 bg-black bg-cover bg-no-repeat bg-current"
              style={{ backgroundImage: "url('/local.png')" }}
            ></Link>
            <div className="w-0 lg:w-full h-1/5 flex items-start justify-start mt-1 p-3">
              <p className="text-black">
                <span className="text-[#001439] text-xl font-bold">
                  localisation
                </span>
                sbsh bqdh ethsdnhs shsrh hshr dhdsbsg
              </p>
            </div>
          </div>
          <div className="h-full w-1/5"></div>
        </motion.div>
      </section>
      <section className="w-full h-screen flex flex-row">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: "40%", transition: { duration: 0.75 } }}
          style={{ backgroundImage: "url('/p4.jpg')" }}
          className="h-full w-2/5 bg-cover bg-black"
        ></motion.div>
        <motion.div
          initial={{ width: "100%" }}
          whileInView={{ width: "60%", transition: { duration: 0.75 } }}
          className="h-full w-full bg-covert"
          style={{ backgroundImage: "url('/p3.jpg')" }}
        >
          <div className="size-full bg-[#000000] opacity-95">
            <div className="w-full h-full flex justify-start items-center p-5">
              <div className="lg:w-3/5 sm:w-4/5 flex justify-start items-start flex-col">
                {/* <motion.p
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="text-blue-100"
                >
                  HGINDUST HGINE INDUSTRAL
                </motion.p> */}
                <motion.h1
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="text-blue-50 text-5xl font-bold mt-2"
                >
                  We Offer The
                  <br />
                  Best&nbsp;
                  <span className="text-blue-600">Servises</span>You <br />
                  Can Find It
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="text-blue-50 my-5"
                >
                  The cotton gin, invented by Eli Whitney in 1793,
                  revolutionized the cotton industry by mechanizing the
                  labor-intensive process of separating cotton fibers from
                  seeds.
                </motion.p>
                <div className="h-28 w-max flex flex-row">
                  <Carousel
                    opts={{
                      align: "start",
                    }}
                    className="w-full max-w-sm"
                  >
                    <CarouselContent>
                      {Servises.map((sev, index) => (
                        <CarouselItem
                          key={index}
                          className="basis-2/3 lg:basis-2/3"
                        >
                          <motion.div
                            whileHover={{ scale: 1.1 }}
                            className="mx-5"
                          >
                            <Card className="w-56  border-none h-full bg-transparent">
                              <Link href={sev.url}>
                                {" "}
                                <CardContent
                                  className="flex items-center bg-center bg-cover justify-center min-h-24 p-2"
                                  style={{
                                    backgroundImage: `url(${sev.imageUrl})`,
                                  }}
                                >
                                  <span className="text-3xl text-gray-700 font-semibold">
                                    {sev.name}
                                  </span>
                                </CardContent>
                              </Link>
                            </Card>
                          </motion.div>
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                    <CarouselPrevious className="bg-[#001439] border-none hover:bg-blue-900 text-white" />
                    <CarouselNext className="bg-[#001439] border-none hover:bg-blue-900 text-white" />
                  </Carousel>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>
      <section className="w-full h-screen flex flex-row">
        <motion.div
          initial={{ width: "100%" }}
          whileInView={{ width: "40%", transition: { duration: 0.75 } }}
          className="h-full w-2/5 flex justify-center items-center"
        >
          <div className="lg:w-3/5 sm:w-4/5 flex justify-start items-start flex-col">
            <motion.h1
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-[#0e012d] text-5xl font-bold mt-2"
            >
              Our
              <br />
              Secture
              <span className="text-blue-600">D&apos;Activites</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-black my-5"
            >
              The cotton gin, invented by Eli Whitney in 1793, revolutionized
              the cotton industry by mechanizing the labor-intensive process of
              separating cotton fibers from seeds.
            </motion.p>
          </div>
        </motion.div>
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: "60%", transition: { duration: 0.75 } }}
          className="h-full w-full bg-white flex justify-end items-center"
        >
          <div className="bg-gray-950 flex justify-end items-center  w-5/6 h-3/5 rounded-tl-[50px]">
            <div className="absolute h-64 w-[60%] flex">
              <Carousel
                opts={{
                  align: "end",
                }}
                className="w-[90%]"
              >
                <CarouselContent>
                  {Sec.map((sev, index) => {
                    const valeu = {
                      id: sev.id,
                      name: sev.typeName,
                      images: [sev.image],
                      url: `/secteur-d-activites/${sev.typeName}`,
                    };
                    return (
                      <CarouselItem
                        key={index}
                        className="basis-1/2 lg:basis-1/3 h-full m-5"
                      >
                        <Item
                          //@ts-expect-error id type
                          produits={valeu}
                        />
                      </CarouselItem>
                    );
                  })}
                </CarouselContent>
                <CarouselPrevious className="bg-[#001439] border-none hover:bg-blue-900 text-white" />
                <CarouselNext className="bg-[#001439] border-none hover:bg-blue-900 text-white" />
              </Carousel>
            </div>
          </div>
        </motion.div>
      </section>
      <section
        className="w-full h-[50dvh] bg-black bg-cover  bg-no-repeat"
        style={{ backgroundImage: "url('/p5.jpg')" }}
      >
        {/* <div className="w-full h-full bg-black opacity-80"></div> */}
        <Client />
      </section>
      <section className="w-full h-min flex flex-col justify-center items-center p-6 lg:p-20">
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75 }}
          className="flex mt-10 mb-5 justify-center mx-auto lg:text-7xl md:text-4xl text-[#0e012d] font-semibold"
        >
          <Link href="/No-Equipements" className="h-20">
            Nos&nbsp;Equipements
          </Link>
        </motion.h1>
        <div className="size-full grid grid-flow-row gap-3">
          <div className="grid grid-rows-2 lg:grid-rows-1 lg:grid-cols-4 gap-3">
            <motion.div
              initial={{ x: -30, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1, transition: { duration: 1.05 } }}
              className="w-full h-[80dvh] bg-red-500 col-span-2 overflow-hidden relative"
            >
              <motion.div
                onMouseEnter={() => handleMouseEnter(1)}
                onMouseLeave={handleMouseLeave}
                className={`size-full bg-slate-400 bg-cover shadow-xl transition-transform duration-300 ease-in-out ${
                  hoveredDiv === 1 ? "scale-110" : "scale-100"
                }`}
                style={{ backgroundImage: `url(${EquipementTypes[0]?.image})` }}
              >
                {hoveredDiv === 1 && (
                  <div className="size-full bg-blackOverlay"></div>
                )}
              </motion.div>
              <Link
                href={`/No-Equipements/${EquipementTypes[0]?.typeName}`}
                className="absolute text-5xl font-bold bottom-5 left-5 p-4 text-white"
              >
                {EquipementTypes[0]?.typeName}
              </Link>
            </motion.div>
            <motion.div
              initial={{ y: -30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1, transition: { duration: 1.05 } }}
              className="w-full h-[80dvh] bg-black col-span-1 overflow-hidden relative"
            >
              <motion.div
                onMouseEnter={() => handleMouseEnter(2)}
                onMouseLeave={handleMouseLeave}
                className={`size-full bg-slate-400 bg-cover shadow-xl transition-transform duration-300 ease-in-out ${
                  hoveredDiv === 2 ? "scale-110" : "scale-100"
                }`}
                style={{ backgroundImage: `url(${EquipementTypes[1]?.image})` }}
              >
                {hoveredDiv === 2 && (
                  <div className="size-full bg-blackOverlay"></div>
                )}
              </motion.div>
              <Link
                href={`/No-Equipements/${EquipementTypes[1]?.typeName}`}
                className="absolute text-5xl font-bold bottom-5 left-5 p-4 text-white"
              >
                {EquipementTypes[1]?.typeName}
              </Link>
            </motion.div>
            <motion.div
              initial={{ y: -30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1, transition: { duration: 1.05 } }}
              className="w-full h-[80dvh] bg-black col-span-1 overflow-hidden relative"
            >
              <motion.div
                onMouseEnter={() => handleMouseEnter(3)}
                onMouseLeave={handleMouseLeave}
                className={`size-full bg-slate-400 bg-cover shadow-xl transition-transform duration-300 ease-in-out ${
                  hoveredDiv === 3 ? "scale-110" : "scale-100"
                }`}
                style={{ backgroundImage: `url(${EquipementTypes[2]?.image})` }}
              >
                {hoveredDiv === 3 && (
                  <div className="size-full bg-blackOverlay"></div>
                )}
              </motion.div>
              <Link
                href={`/No-Equipements/${EquipementTypes[2]?.typeName}`}
                className="absolute text-5xl font-bold bottom-5 left-5 p-4 text-white"
              >
                {EquipementTypes[2]?.typeName}
              </Link>
            </motion.div>
          </div>
          <div className="grid grid-rows-2 lg:grid-rows-1 lg:grid-cols-4 gap-3">
            <motion.div
              initial={{ y: -30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1, transition: { duration: 1.05 } }}
              className="w-full h-[80dvh] bg-black col-span-1 overflow-hidden  relative"
            >
              <motion.div
                onMouseEnter={() => handleMouseEnter(4)}
                onMouseLeave={handleMouseLeave}
                className={`size-full bg-slate-400 bg-cover shadow-xl transition-transform duration-300 ease-in-out ${
                  hoveredDiv === 4 ? "scale-110" : "scale-100"
                }`}
                style={{ backgroundImage: `url(${EquipementTypes[3]?.image})` }}
              >
                {hoveredDiv === 4 && (
                  <div className="size-full bg-blackOverlay"></div>
                )}
              </motion.div>
              <Link
                href={`/No-Equipements/${EquipementTypes[3]?.typeName}`}
                className="absolute text-5xl font-bold bottom-5 left-5 p-4 text-white"
              >
                {EquipementTypes[3]?.typeName}
              </Link>
            </motion.div>
            <motion.div
              initial={{ y: -30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1, transition: { duration: 1.05 } }}
              className="w-full h-[80dvh] bg-black col-span-1 overflow-hidden relative"
            >
              <motion.div
                onMouseEnter={() => handleMouseEnter(5)}
                onMouseLeave={handleMouseLeave}
                className={`size-full bg-slate-400 bg-cover shadow-xl transition-transform duration-300 ease-in-out ${
                  hoveredDiv === 5 ? "scale-110" : "scale-100"
                }`}
                style={{ backgroundImage: `url(${EquipementTypes[4]?.image})` }}
              >
                {hoveredDiv === 5 && (
                  <div className="size-full bg-blackOverlay"></div>
                )}
              </motion.div>
              <Link
                href={`/No-Equipements/${EquipementTypes[4]?.typeName}`}
                className="absolute text-5xl font-bold bottom-5 left-5 p-4 text-white"
              >
                {EquipementTypes[4]?.typeName}
              </Link>
            </motion.div>
            <motion.div
              initial={{ x: 30, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1, transition: { duration: 1.05 } }}
              className="w-full h-[80dvh] bg-red-500 col-span-2 overflow-hidden relative"
            >
              <motion.div
                onMouseEnter={() => handleMouseEnter(6)}
                onMouseLeave={handleMouseLeave}
                className={`size-full bg-slate-400 bg-cover shadow-xl transition-transform duration-300 ease-in-out ${
                  hoveredDiv === 6 ? "scale-110" : "scale-100"
                }`}
                style={{ backgroundImage: `url(${EquipementTypes[5]?.image})` }}
              >
                {hoveredDiv === 6 && (
                  <div className="size-full bg-blackOverlay"></div>
                )}
              </motion.div>
              <Link
                href={`/No-Equipements/${EquipementTypes[5]?.typeName}`}
                className="absolute text-5xl font-bold bottom-5 left-5 p-4 text-white"
              >
                {EquipementTypes[5]?.typeName}
              </Link>
            </motion.div>
          </div>
          <div className="grid grid-rows-2 md:grid-rows-1 md:grid-cols-2 gap-3">
            <motion.div className="w-full h-[30dvh] bg-black overflow-hidden  relative">
              <motion.div
                onMouseEnter={() => handleMouseEnter(7)}
                onMouseLeave={handleMouseLeave}
                className={`size-full bg-slate-400 bg-cover shadow-xl transition-transform duration-300 ease-in-out ${
                  hoveredDiv === 7 ? "scale-110" : "scale-100"
                }`}
                style={{ backgroundImage: `url(${EquipementTypes[6]?.image})` }}
              >
                {hoveredDiv === 7 && (
                  <div className="size-full bg-blackOverlay"></div>
                )}
              </motion.div>
              <Link
                href={`/No-Equipements/${EquipementTypes[6]?.typeName}`}
                className="absolute text-5xl font-bold bottom-5 left-5 p-4 text-white"
              >
                {EquipementTypes[6]?.typeName}
              </Link>
            </motion.div>
            <motion.div className="w-full h-[30dvh] bg-black overflow-hidden  relative">
              <motion.div
                onMouseEnter={() => handleMouseEnter(8)}
                onMouseLeave={handleMouseLeave}
                className={`size-full bg-slate-400 bg-cover shadow-xl transition-transform duration-300 ease-in-out ${
                  hoveredDiv === 8 ? "scale-110" : "scale-100"
                }`}
                style={{ backgroundImage: `url(${EquipementTypes[7]?.image})` }}
              >
                {hoveredDiv === 8 && (
                  <div className="size-full bg-blackOverlay"></div>
                )}
              </motion.div>
              <Link
                href={`/No-Equipements/${EquipementTypes[7]?.typeName}`}
                className="absolute text-5xl font-bold bottom-5 left-5 p-4 text-white"
              >
                {EquipementTypes[7]?.typeName}
              </Link>
            </motion.div>
          </div>
          <div className="grid grid-rows-1 md:grid-rows-1 lg:grid-cols-4 gap-3">
            <motion.div className="w-full h-[30dvh] bg-black col-span-3 overflow-hidden relative">
              <motion.div
                onMouseEnter={() => handleMouseEnter(9)}
                onMouseLeave={handleMouseLeave}
                className={`size-full bg-slate-400 bg-cover shadow-xl transition-transform duration-300 ease-in-out ${
                  hoveredDiv === 9 ? "scale-110" : "scale-100"
                }`}
                style={{ backgroundImage: `url(${EquipementTypes[8]?.image})` }}
              >
                {hoveredDiv === 9 && (
                  <div className="size-full bg-blackOverlay"></div>
                )}
              </motion.div>
              <Link
                href={`/No-Equipements/${EquipementTypes[8]?.typeName}`}
                className="absolute text-5xl font-bold bottom-5 left-5 p-4 text-white"
              >
                {EquipementTypes[8]?.typeName}
              </Link>
            </motion.div>
            <motion.div className="w-full h-[30dvh] bg-black col-span-1"></motion.div>
          </div>
        </div>
      </section>
      <section className="w-full h-[80dvh] bg-gray-950 grid grid-rows-2 sm:grid-rows-1 sm:grid-cols-3 gap-3">
        <div className="sm:col-span-1 flex justify-center items-center size-full">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0, transition: { duration: 0.75 } }}
            className="size-4/5 flex font-forum  items-center justify-start flex-col text-white"
          >
            <h1 className="text-4xl font-bold">
              They give Us <br />
              Their trust to serve you
            </h1>
            <br />
            <p className=" mt-5 text-sm text-gray-500">
              Fornisure is dedicated to building trust with our customers
              through quality craftsmanship and exceptional service. <br />{" "}
              <br /> We understand that purchasing furniture is a significant
              investment, and we strive to ensure that every piece meets the
              highest standards. <br /> <br />
              Our commitment to transparency and integrity means you can rely on
              us for honest communication and support.
            </p>
          </motion.div>
        </div>
        <div className="sm:col-span-2 size-full flex justify-center items-center">
          <div className="size-4/5 flex flex-col items-center justify-center p-5">
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
              whileInView="show"
              exit="hidden"
              className="size-full grid grid-cols-2 lg:grid-cols-3 gap-2"
            >
              {Fornisure.map((map, index) => (
                <motion.div
                  variants={{
                    hidden: { y: 48, opacity: 0 },
                    show: {
                      opacity: 1,
                      y: 0,
                      transition: {
                        staggerChildren: 0.25,
                      },
                    },
                  }}
                  key={index}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="size-full flex justify-center bg-center bg-contain bg-no-repeat items-center"
                  style={{ backgroundImage: `url(${map})` }}
                ></motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>
      <section className="w-full h-screen flex flex-row" id="contact">
        <motion.div
          initial={{ width: "100%" }}
          className="h-full w-full bg-covert"
          style={{ backgroundImage: "url('/p3.jpg')" }}
        >
          <div className="size-full bg-[#000000] bg-opacity-95 grid grid-rows-2 lg:grid-rows-1 lg:grid-cols-3 overflow-hidden">
            <div className="size-full lg:col-span-2 flex">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{
                  width: "83.333333%",
                  transition: { duration: 1.05 },
                }}
                className="size-full lg:h-4/5 lg:w-5/6 mt-auto bg-gray-950 p-5 lg:rounded-tr-[35px]"
              >
                <h1 className="text-5xl text-white">Contact</h1>
                <p className="text-gray-300 text-sm">
                  Enter Your information <br />
                  to contact you
                </p>
                <form onSubmit={handleSubmit} className="size-full mt-5">
                  <div className="w-full grid grid-rows-2 lg:grid-cols-2 gap-6">
                    <Input
                      type="text"
                      id="name"
                      name="name"
                      className="text-white/50"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="Name"
                    />
                    <Input
                      type="text"
                      id="company"
                      name="company"
                      className="text-white/50"
                      value={formData.company}
                      onChange={handleChange}
                      required
                      placeholder="company name"
                    />
                    <Input
                      type="email"
                      id="email"
                      name="email"
                      className="text-white/50"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="Email"
                    />
                    <div className="size-full">
                      <button
                        type="submit"
                        className="bg-cyan-800 text-white font-bold size-full rounded-lg"
                      >
                        Submit
                      </button>
                    </div>
                  </div>
                  <Textarea
                    id="message"
                    name="message"
                    className="text-white/50 size-full mt-6"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    placeholder="Type your message here."
                  />
                </form>
              </motion.div>
            </div>
            <div className="size-full justify-center items-start p-10 lg:p-0 flex flex-col">
              <img
                src="/logo/logo_hygindust-removebg-preview.png"
                alt="hygindust logo"
                className="w-4/5 mr-auto"
              />
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-blue-50 my-5"
              >
                <div className="flex flex-row justify-start items-center">
                  <img src="/gmail.png" alt="" className="size-5" />
                  &nbsp;&nbsp;contact@hygindust.com
                </div>
                <div className="flex flex-row justify-start items-center">
                  <img src="/phone.png" alt="" className="size-5" />
                  &nbsp;&nbsp;+213&nbsp;(0)&nbsp;7&nbsp;70&nbsp;10&nbsp;51&nbsp;21
                </div>
                <div className="flex flex-row justify-start items-center">
                  <img src="/gps.png" alt="" className="size-5" />
                  &nbsp;&nbsp;village benramdan lot 102 n°2 chbli blida
                </div>
              </motion.div>
              <div className="">
                <motion.h1
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="text-blue-50 text-5xl font-bold mt-2"
                >
                  Feel Free
                  <br />
                  To&nbsp;
                  <span className="text-blue-600">Contacting</span> US
                </motion.h1>
              </div>
            </div>
          </div>
        </motion.div>
      </section>
    </>
  );
}
