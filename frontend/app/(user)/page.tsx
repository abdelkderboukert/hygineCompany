"use client";
import * as motion from "motion/react-client";
import Link from "next/link";
import { useRef } from "react";

export default function Home() {
  const ref = useRef(null);
  // const {scrollYProgress} = useScroll({
  //   target: ref,
  //   effect:["start start","start end"]
  // })
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
              Contact As&nbsp;&nbsp;
              <img src="i.svg" alt="My Icon" width={30} height={30} />
            </motion.div>
          </div>
        </div>
        <div
          className="bg-cover bg-no-repeat bg-bottom"
          style={{ backgroundImage: "url('/main1.jpg')" }}
        ></div>
      </section>
      <section className="w-full h-screen bg-gradient-to-b from-blue-200 to-white"></section>
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
          <p className="my-5 text-sm px-5">
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
          className="w-0 h-3/5 lg:w-1/3 flex-row flex"
        >
          <div className="h-full w-4/5 flex flex-col">
            <Link
              href={"https://maps.app.goo.gl/JrMJBhnWmdkMSTf8A"}
              className="w-full h-4/5 bg-black bg-cover bg-no-repeat bg-current"
              style={{ backgroundImage: "url('/local.png')" }}
            ></Link>
            <div className="w-full h-1/5 flex items-start justify-start mt-1 p-3">
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
    </>
  );
}
