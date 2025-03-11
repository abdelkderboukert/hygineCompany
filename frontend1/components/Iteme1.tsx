"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Product } from "@/types";
import Link from "next/link";

const Iteme1 = ({ produits }: { produits: Product }) => {
  const [isHover, setIsHover] = useState<boolean>(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.75 }}
      className="w-full h-72 justify-center overflow-hidden"
    >
      <motion.div
        onHoverStart={() => setIsHover(true)}
        onHoverEnd={() => setIsHover(false)}
        className={`w-full h-2/3 bg-slate-400 bg-cover shadow-xl transition-transform duration-300 ease-in-out ${
          isHover ? "scale-110" : "scale-100"
        }`}
        style={{ backgroundImage: `url(${produits.images[0]})` }}
      >
        {isHover ? <div className="size-full bg-blackOverlay"></div> : null}
      </motion.div>
      <div className="relative -top-5 flex items-start justify-center bg-white mx-auto h-2/5 w-5/6 p-3 flex-col shadow-xl">
        <div
          className=" absolute top-1 right-1 size-8 rounded-full bg-center bg-cover"
          style={{
            backgroundImage: `url(${produits.contry})`,
          }}
        ></div>
        <h1 className="text-2xl text-slate-600 select-none">
          {produits.url ? (
            <Link href={produits.url}>{produits.name}</Link>
          ) : (
            <p className="">{produits.name}</p>
          )}
        </h1>
        <p>{produits.subtitle}</p>
      </div>
    </motion.div>
  );
};

export default Iteme1;
