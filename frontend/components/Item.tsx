"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Product } from "@/types";
import Link from "next/link";

const Item = ({ produits }: { produits: Product }) => {
  const [isHover, setIsHover] = useState<boolean>(false);
  return (
    
      <motion.div className="w-full flex flex-col bg-black min-h-64 rounded-b-2xl shadow-lg overflow-hidden ">
        <motion.div
          onHoverStart={() => setIsHover(true)}
          onHoverEnd={() => setIsHover(false)}
          className={`w-full h-[204.8px] bg-black bg-cover shadow-xl transition-transform duration-300 ease-in-out ${
            isHover ? "scale-110" : "scale-100"
          }`}
          style={{ backgroundImage: `url(${produits.images[0]})` }}
        >
          {isHover ? <div className="size-full bg-blackOverlay"></div> : null}
        </motion.div>
        <div className="h-[52.2px] w-full bg-white justify-start items-center flex px-3 font-bold">
          <h1 className="text-2xl text-slate-600 select-none">
            {produits.url ? (
              <Link href={produits.url}>{produits.name}</Link>
            ) : (
              <p className="">{produits.name}</p>
            )}
          </h1>
          <p>{produits.description}</p>
        </div>
      </motion.div>
  
  );
};

export default Item;
