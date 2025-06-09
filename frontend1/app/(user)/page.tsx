"use client";
import { motion } from "framer-motion";
// import Link from "next/link";
// import { useRef, useEffect, useState } from "react";
// import { Card, CardContent } from "@/components/ui/card";
// import {
//   Carousel,
//   CarouselContent,
//   CarouselItem,
//   CarouselNext,
//   CarouselPrevious,
// } from "@/components/ui/carousel";
// import Item from "@/components/Item";
// import Client from "@/components/Clients";
// import { db } from "@/firebase";
// import { collection, getDocs } from "firebase/firestore";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import Iteme1 from "@/components/Iteme1";

// interface EquipementType {
//   id: string;
//   typeName: string;
//   url: string;
//   image?: string;
//   contry?: string;
// }

// const Servises = [
//   {
//     name: "Conseil",
//     url: "/service/Conseil",
//     imageUrl: "/serves-conseil.webp",
//   },
//   {
//     name: "Formation",
//     url: "/service/Formation",
//     imageUrl: "/serves-formation.webp",
//   },
//   {
//     name: "Mise en Route",
//     url: "/service/Mise-en-route",
//     imageUrl: "/serves-miseRout.webp",
//   },
//   {
//     name: "Service apres vente",
//     url: "/service/Service-apres-vente",
//     imageUrl: "/serves-Sav.webp",
//   },
// ];

// const Fornisure = [
//   {
//     img: "/forni/heute-removebg-preview.png",
//     url: "https://www.heute-solecleaning.com/fr/pagedaccueil/",
//   },
//   {
//     img: "/forni/Lechler_Company-Logo-removebg-preview.png",
//     url: "https://www.lechler.de/",
//   },
//   {
//     img: "/forni/Logo_CFSBrands-Jofel-2023Curvas-01.webp",
//     url: "https://www.jofel.com/",
//   },
//   { img: "/forni/Logo_DELABIE.png", url: "https://www.delabie.com/" },
//   { img: "/forni/logo-ocene.svg", url: "https://www.ocene.fr/" },
//   { img: "/forni/Logos-Prago_profilgate.png", url: "www.profilgate.com/fr/" },
//   { img: "/forni/ramex.jpg", url: "https://www.ramex.it/" },
//   { img: "/forni/Tork-Logo-700x394.webp", url: "https://www.tork.fr/" },
//   { img: "/forni/Vikan_logo.png", url: "https://www.vikan.com/fr" },
// ];

// export default function Home() {
//   const ref = useRef(null);
//   const [Sec, setSec] = useState<EquipementType[]>([]);
//   const [EquipementTypes, setEquipementTypes] = useState<EquipementType[]>([]);

//   const fetchEquipementTypes = async () => {
//     const querySnapshot = await getDocs(collection(db, "products"));
//     const types = querySnapshot.docs.map((doc) => ({
//       id: doc.id,
//       ...doc.data(),
//     })) as EquipementType[];
//     setSec(types);
//   };
//   useEffect(() => {
//     fetchEquipementTypes();
//   }, []);

//   interface FormData {
//     name: string;
//     company: string;
//     message: string;
//     email: string;
//     phoneNumber: number | undefined;
//     ref: number | undefined;
//   }

//   const [formData, setFormData] = useState<FormData>({
//     name: "",
//     company: "",
//     message: "",
//     email: "",
//     phoneNumber: undefined,
//     ref: 0,
//   });

//   const handleChange = (
//     e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
//   ) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

//   // Update handleSubmit
//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();

//     const response = await fetch("/api/sendEmail", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(formData),
//     });

//     const data = await response.json();
//     if (response.ok) {
//       alert("Email sent successfully!");
//     } else {
//       alert("Error sending email: " + data.error);
//     }
//   };

//   const fetchEquipement = async () => {
//     const querySnapshot = await getDocs(collection(db, "Equipements"));
//     const types = querySnapshot.docs.map((doc) => ({
//       id: doc.id,
//       ...doc.data(),
//     })) as EquipementType[];
//     setEquipementTypes(types);
//   };
//   useEffect(() => {
//     fetchEquipement();
//   }, []);
//   return (
//     <>
//       <section className="w-full h-screen grid grid-rows-2 sm:grid-cols-2 sm:grid-rows-1 select-none">
//         <div className="flex justify-center items-center h-screen w-full bg-[#001439]">
//           <div className="lg:size-3/5 sm:w-4/5 flex justify-start items-start flex-col">
//             <motion.h1
//               initial={{ opacity: 0, x: -30 }}
//               animate={{ opacity: 1, x: 0 }}
//               className="text-blue-50 text-5xl font-bold mt-2"
//             >
//               Nous offrons la meilleure
//               <br />
//               <span className="text-blue-600">Qualité sur le marché</span>{" "}
//               <br />
//               au meilleur prix
//             </motion.h1>
//             {/* <motion.p
//               initial={{ opacity: 0, x: -30 }}
//               animate={{ opacity: 1, x: 0 }}
//               className="text-blue-50 my-5"
//             >
//               The cotton gin, invented by Eli Whitney in 1793, revolutionized
//               the cotton industry by mechanizing the labor-intensive process of
//               separating cotton fibers from seeds.
//             </motion.p> */}
//             <motion.div
//               whileHover={{ scale: 1.1 }}
//               whileTap={{ scale: 0.9 }}
//               initial={{ opacity: 0, y: -30 }}
//               animate={{ opacity: 1, y: 0 }}
//               className="w-2/5 h-14 flex mt-4 bg-[#3995EC] rounded-lg justify-center items-center text-blue-50 font-bold select-none"
//             >
//               <Link
//                 className="flex justify-center items-center size-full"
//                 href={"/#contact"}
//               >
//                 Contact Nous&nbsp;&nbsp;
//                 <img src="i.svg" alt="My Icon" width={30} height={30} />
//               </Link>
//             </motion.div>
//           </div>
//         </div>
//         <div
//           className="bg-cover bg-no-repeat bg-bottom"
//           style={{ backgroundImage: "url('/main2.jpg')" }}
//         ></div>
//       </section>
//       {/* <section className="w-full h-screen bg-gradient-to-b from-blue-200 to-white"></section> */}
//       <section
//         ref={ref}
//         className="w-full h-screen bg-white flex justify-center items-center flex-row lg:px-24"
//       >
//         <motion.div
//           initial={{ opacity: 0, x: -30 }}
//           whileInView={{ opacity: 1, x: 0, transition: { duration: 0.9 } }}
//           className="w-1/5 h-4/6 grid grid-rows-2"
//         >
//           <div
//             className="w-full h-full bg-cover bg-no-repeat bg-right bg-black"
//             style={{ backgroundImage: "url('/IMG_4530.jpg')" }}
//           ></div>
//           <div
//             className="w-full h-full bg-cover bg-no-repeat bg-right bg-red-900 mt-1"
//             style={{ backgroundImage: "url('/IMG_4560.png')" }}
//           ></div>
//         </motion.div>
//         <motion.div
//           initial={{ opacity: 0, y: 30 }}
//           whileInView={{ opacity: 1, y: 0, transition: { duration: 0.75 } }}
//           className="w-2/3 md:w-1/2 lg:w-1/3 h-5/6 bg-[#001439] mx-1 p-4 flex flex-col justify-center"
//         >
//           <h1 className="text-blue-100 text-2xl px-5">
//             A Propos de&nbsp;<span className="text-cyan-800">Nous</span>
//           </h1>
//           <p className="my-5 text-sm text-white px-5">
//             Hygindust (Hygiène industrielle) et Hyprotech (Hygiène
//             professionnelle et technologie), sont spécialisés dans le conseil et
//             la commercialisation de produits et de matériels de nettoyage et de
//             désinfection en industrie agroalimentaire, restauration collective,
//             industrie pharmaceutique et cosmétique. <br /> <br /> Par leur
//             politique de plus qu&apos;un fournisseur un réel partenaire
//             d&apos;hygiène;
//           </p>
//           <motion.div
//             whileHover={{ scale: 1.1 }}
//             whileTap={{ scale: 0.9 }}
//             initial={{ opacity: 0, y: -30 }}
//             animate={{ opacity: 1, y: 0 }}
//             className="w-3/5 mx-5 h-11 flex bg-[#3995EC] rounded-lg justify-center items-center text-blue-50 font-bold select-none"
//           >
//             <Link href={"/about"}>En Savoir Plus</Link>
//           </motion.div>
//         </motion.div>
//         <motion.div
//           initial={{ opacity: 0, x: 30 }}
//           whileInView={{ opacity: 1, x: 0, transition: { duration: 1 } }}
//           className=" hidden lg:block h-3/5 w-1/3 flex-row"
//         >
//           <div className="h-full w-4/5 flex flex-col">
//             <Link
//               href={"https://maps.app.goo.gl/JrMJBhnWmdkMSTf8A"}
//               className="w-full h-4/5 bg-black bg-cover bg-no-repeat bg-current"
//               style={{ backgroundImage: "url('/local.png')" }}
//             ></Link>
//             <div className="w-0 lg:w-full h-1/5 flex items-start justify-start mt-1 p-3">
//               <p className="text-black">
//                 <span className="text-[#001439] text-xl font-bold">
//                   localisation:
//                 </span>
//                 village benramdan lot 102 n°2 chebli blida
//               </p>
//             </div>
//           </div>
//           <div className="h-full w-1/5"></div>
//         </motion.div>
//       </section>
//       <section className="w-full h-screen flex flex-row">
//         <motion.div
//           initial={{ width: 0 }}
//           whileInView={{ width: "40%", transition: { duration: 0.75 } }}
//           style={{ backgroundImage: "url('/t.jpg')" }}
//           className="h-full w-2/5 bg-cover bg-black"
//         ></motion.div>
//         <motion.div
//           initial={{ width: "100%" }}
//           whileInView={{ width: "60%", transition: { duration: 0.75 } }}
//           className="h-full w-full bg-covert"
//           style={{ backgroundImage: "url('/p3.jpg')" }}
//         >
//           <div className="size-full bg-[#000000] opacity-95">
//             <div className="w-full h-full flex justify-start items-center p-5">
//               <div className="w-full flex justify-start items-start flex-col">
//                 {/* <motion.p
//                   initial={{ opacity: 0, x: -30 }}
//                   animate={{ opacity: 1, x: 0 }}
//                   className="text-blue-100"
//                 >
//                   HGINDUST HGINE INDUSTRAL
//                 </motion.p> */}
//                 <motion.h1
//                   initial={{ opacity: 0, x: -30 }}
//                   animate={{ opacity: 1, x: 0 }}
//                   className="text-blue-50 text-5xl font-bold mt-2 lg:w-3/5 sm:w-4/5"
//                 >
//                   Nous Offrons&nbsp;
//                   <span className="text-blue-600">Les Meilleurs Services</span>
//                   &nbsp;Que Vous
//                   <br /> Peut Le Trouver
//                 </motion.h1>
//                 <motion.p
//                   initial={{ opacity: 0, x: -30 }}
//                   animate={{ opacity: 1, x: 0 }}
//                   className="text-blue-50 my-5 lg:w-3/5 sm:w-4/5"
//                 >
//                   Chez Hygienedust, nous nous engageons à fournir des services
//                   de premier ordre sur mesure pour répondre aux besoins uniques
//                   de nos clients. Notre équipe de des professionnels
//                   expérimentés s&apos;engagent à livrer des résultats
//                   exceptionnels, garantissant que vous recevez le meilleur
//                   niveau de satisfaction
//                 </motion.p>
//                 <div className="w-full h-full grid grid-flow-row lg:grid-cols-2 lg:grid-rows-2 gap-10">
//                   {Servises.map((serve, index) => (
//                     <motion.div
//                       key={index}
//                       whileHover={{ scale: 1.1 }}
//                       className="mx-5"
//                     >
//                       <Card className="w-56  border-none h-full bg-transparent">
//                         <Link href={serve.url}>
//                           {" "}
//                           <CardContent
//                             className="flex items-center bg-center bg-cover justify-center min-h-24 p-2"
//                             style={{
//                               backgroundImage: `url(${serve.imageUrl})`,
//                             }}
//                           ></CardContent>
//                           <span className="text-2xl text-white font-medium">
//                             {serve.name}
//                           </span>
//                         </Link>
//                       </Card>
//                     </motion.div>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </motion.div>
//       </section>
//       <section className="w-full h-screen flex flex-row">
//         <motion.div
//           initial={{ width: "100%" }}
//           whileInView={{ width: "40%", transition: { duration: 0.75 } }}
//           className="h-full w-2/5 flex justify-center items-center"
//         >
//           <div className="lg:w-3/5 sm:w-4/5 flex justify-start items-start flex-col">
//             <motion.h1
//               initial={{ opacity: 0, x: -30 }}
//               animate={{ opacity: 1, x: 0 }}
//               className="text-[#0e012d] text-5xl font-bold mt-2"
//             >
//               Notre
//               <br />
//               Secture
//               <span className="text-blue-600">D&apos;Activites</span>
//             </motion.h1>
//             <motion.p
//               initial={{ opacity: 0, x: -30 }}
//               animate={{ opacity: 1, x: 0 }}
//               className="text-black my-5"
//             >
//               The cotton gin, invented by Eli Whitney in 1793, revolutionized
//               the cotton industry by mechanizing the labor-intensive process of
//               separating cotton fibers from seeds.
//             </motion.p>
//           </div>
//         </motion.div>
//         <motion.div
//           initial={{ width: 0 }}
//           whileInView={{ width: "60%", transition: { duration: 0.75 } }}
//           className="h-full w-full bg-white flex justify-end items-center"
//         >
//           <div className="bg-gray-950 flex justify-end items-center  w-5/6 h-3/5 rounded-tl-[50px]">
//             <div className="absolute h-64 w-[60%] flex">
//               <Carousel
//                 opts={{
//                   align: "end",
//                 }}
//                 className="w-[90%]"
//               >
//                 <CarouselContent>
//                   {Sec.map((sev, index) => {
//                     const valeu = {
//                       id: sev.id,
//                       name: sev.typeName,
//                       images: [sev.image],
//                       url: `/secteur-d-activites/${sev.typeName}`,
//                     };
//                     return (
//                       <CarouselItem
//                         key={index}
//                         className="basis-1/2 lg:basis-1/3 h-full m-5"
//                       >
//                         <Item
//                           //@ts-expect-error id type
//                           produits={valeu}
//                         />
//                       </CarouselItem>
//                     );
//                   })}
//                 </CarouselContent>
//                 <CarouselNext className="bg-white border-none hover:bg-blue-900 text-[#001439]" />
//                 <CarouselPrevious className="bg-[#001439] border-none hover:bg-blue-900 text-white" />
//               </Carousel>
//             </div>
//           </div>
//         </motion.div>
//       </section>
//       <section
//         className="w-full h-[50dvh] bg-transparent bg-cover  bg-no-repeat"
//         // style={{ backgroundImage: "url('/p5.jpg')" }}
//       >
//         {/* <div className="w-full h-full bg-black opacity-80"></div> */}
//         <Client />
//       </section>
//       <section className="w-full h-min flex flex-col justify-center items-center p-6 lg:p-20">
//         <motion.h1
//           initial={{ opacity: 0, y: -30 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.75 }}
//           className="flex mt-10 mb-5 justify-center mx-auto lg:text-7xl md:text-4xl text-[#0e012d] font-semibold"
//         >
//           <Link href="/No-Equipements" className="h-20">
//             Nos&nbsp;Equipements
//           </Link>
//         </motion.h1>
//         <div className="w-full h-max grid grid-rows-5 sm:grid-rows-2 sm:grid-cols-3 gap-3 p-5">
//           {EquipementTypes.map((serve, index) => {
//             const valeu = {
//               id: serve.id,
//               name: serve.typeName,
//               images: [serve.image],
//               contry: serve.contry,
//             };
//             return (
//               <Link
//                 href={`/No-Equipements/${serve.typeName}`}
//                 className=""
//                 key={index}
//               >
//                 <Iteme1
//                   key={index}
//                   //@ts-expect-error ggg
//                   produits={valeu}
//                 />
//               </Link>
//             );
//           })}
//         </div>
//       </section>
//       <section className="w-full h-[80dvh] bg-white grid grid-rows-2 sm:grid-rows-1 sm:grid-cols-3 gap-3">
//         <div className="sm:col-span-1 flex justify-center items-center size-full bg-gray-950">
//           <motion.div
//             initial={{ opacity: 0, x: -50 }}
//             whileInView={{ opacity: 1, x: 0, transition: { duration: 0.75 } }}
//             className="size-4/5 flex font-forum  items-center justify-start flex-col text-white"
//           >
//             <h1 className="text-4xl font-bold">
//               Ils Nous donnent <br />
//               Leur confiance pour vous servir
//             </h1>
//             <br />
//             <p className=" mt-5 text-sm text-gray-500">
//               Les meubles sont dédiés à établir la confiance avec nos clients
//               grâce à un savoir-faire de qualité et un service exceptionnel.{" "}
//               <br /> <br />
//               Nous comprenons que l&apos;achat de meubles est un investissement
//               important, et nous nous efforçons de nous assurer que chaque pièce
//               répond aux normes les plus élevées. <br /> <br /> Notre engagement
//               envers la transparence et l&apos;intégrité signifie que vous
//               pouvez compter sur nous pour une communication et un soutien
//               honnêtes.
//             </p>
//           </motion.div>
//         </div>
//         <div className="sm:col-span-2 size-full flex justify-center items-center">
//           <div className="size-4/5 flex flex-col items-center justify-center p-5">
//             <motion.div
//               variants={{
//                 hidden: { opacity: 0 },
//                 show: {
//                   opacity: 1,
//                   transition: {
//                     staggerChildren: 0.5,
//                   },
//                 },
//               }}
//               initial="hidden"
//               whileInView="show"
//               exit="hidden"
//               className="size-full grid grid-cols-2 lg:grid-cols-3 gap-2"
//             >
//               {Fornisure.map((map, index) => (
//                 <Link href={map.url} key={index}>
//                   <motion.div
//                     variants={{
//                       hidden: { y: 48, opacity: 0 },
//                       show: {
//                         opacity: 1,
//                         y: 0,
//                         transition: {
//                           staggerChildren: 0.25,
//                         },
//                       },
//                     }}
//                     whileHover={{ scale: 1.1 }}
//                     whileTap={{ scale: 0.9 }}
//                     className="size-full flex justify-center bg-center bg-contain bg-no-repeat items-center"
//                     style={{ backgroundImage: `url(${map.img})` }}
//                   ></motion.div>
//                 </Link>
//               ))}
//             </motion.div>
//           </div>
//         </div>
//       </section>
//       <section className="w-full h-screen flex flex-row" id="contact">
//         <motion.div
//           initial={{ width: "100%" }}
//           className="h-full w-full bg-covert"
//           style={{ backgroundImage: "url('/p3.jpg')" }}
//         >
//           <div className="size-full bg-[#000000] bg-opacity-95 grid grid-rows-2 lg:grid-rows-1 lg:grid-cols-3 overflow-hidden">
//             <div className="size-full lg:col-span-2 flex">
//               <motion.div
//                 initial={{ width: 0 }}
//                 whileInView={{
//                   width: "83.333333%",
//                   transition: { duration: 1.05 },
//                 }}
//                 className="size-full lg:h-4/5 lg:w-5/6 mt-auto bg-gray-950 p-5 lg:rounded-tr-[35px]"
//               >
//                 <h1 className="text-5xl text-white">Contact</h1>
//                 <p className="text-gray-300 text-sm">
//                   Enter Your information <br />
//                   to contact you
//                 </p>
//                 <form onSubmit={handleSubmit} className="size-full mt-5">
//                   <div className="w-full grid grid-rows-2 lg:grid-cols-2 gap-6">
//                     <Input
//                       type="text"
//                       id="name"
//                       name="name"
//                       className="text-white/50"
//                       value={formData.name}
//                       onChange={handleChange}
//                       required
//                       placeholder="Nom et prénom"
//                     />
//                     <Input
//                       type="text"
//                       id="company"
//                       name="company"
//                       className="text-white/50"
//                       value={formData.company}
//                       onChange={handleChange}
//                       required
//                       placeholder="Entreprise"
//                     />
//                     <Input
//                       type="email"
//                       id="email"
//                       name="email"
//                       className="text-white/50"
//                       value={formData.email}
//                       onChange={handleChange}
//                       required
//                       placeholder="Email"
//                     />
//                     <Input
//                       type="number"
//                       id="phoneNumber"
//                       name="phoneNumber"
//                       className="text-white/50"
//                       value={formData.phoneNumber}
//                       onChange={handleChange}
//                       required
//                       placeholder="phoneNumber"
//                     />
//                     <div className="size-full">
//                       <button
//                         type="submit"
//                         className="bg-cyan-800 text-white font-bold h-10 w-full rounded-lg"
//                       >
//                         Submit
//                       </button>
//                     </div>
//                   </div>
//                   <Textarea
//                     id="message"
//                     name="message"
//                     className="text-white/50 w-full h-max mt-6"
//                     value={formData.message}
//                     onChange={handleChange}
//                     required
//                     placeholder="Type your message here."
//                   />
//                 </form>
//               </motion.div>
//             </div>
//             <div className="size-full justify-center items-start p-10 lg:p-0 flex flex-col">
//               <img
//                 src="/logo/logo_hygindust-removebg-preview.png"
//                 alt="hygindust logo"
//                 className="w-4/5 mr-auto"
//               />
//               <motion.div
//                 initial={{ opacity: 0, x: -30 }}
//                 animate={{ opacity: 1, x: 0 }}
//                 className="text-blue-50 my-5"
//               >
//                 <div className="flex flex-row justify-start items-center">
//                   <img src="/gmail.png" alt="" className="size-5" />
//                   &nbsp;&nbsp;contact@hygindust.com
//                 </div>
//                 <div className="flex flex-row justify-start items-center">
//                   <img src="/phone.png" alt="" className="size-5" />
//                   &nbsp;&nbsp;+213&nbsp;(0)&nbsp;7&nbsp;70&nbsp;10&nbsp;51&nbsp;21
//                 </div>
//                 <div className="flex flex-row justify-start items-center">
//                   <img src="/gps.png" alt="" className="size-5" />
//                   &nbsp;&nbsp;village benramdan lot 102 n°2 chbli blida
//                 </div>
//               </motion.div>
//               <div className="">
//                 <motion.h1
//                   initial={{ opacity: 0, x: -30 }}
//                   animate={{ opacity: 1, x: 0 }}
//                   className="text-blue-50 text-5xl font-bold mt-2"
//                 >
//                   Sentez-Vous Libre
//                   <br />
//                   Pour&nbsp;
//                   <span className="text-blue-600">NOUS CONTACTER</span>
//                 </motion.h1>
//               </div>
//             </div>
//           </div>
//         </motion.div>
//       </section>
//     </>
//   );
// }

import React from "react";

const Page = () => {
  return (
    <div>
      <div
        className="w-full h-screen bg-cover bg-center"
        style={{ backgroundImage: "url(/IMG_4530.jpg)" }}
      >
        <div className="size-full bg-black bg-opacity-65 flex justify-center items-center">
          <div className="text-white text-4xl md:text-6xl font-bold">
            <h1 className="text-center">Hygindust</h1>
            <p className="text-center text-gray-300">
              Website under development Thank you for your patience
            </p>
            <motion.p
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1, transition: { duration: 0.7 } }}
              className="text-center text-gray-500 text-sm mt-5"
            >
              site Web est en construction
            </motion.p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
