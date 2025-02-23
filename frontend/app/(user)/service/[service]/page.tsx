"use client";
import React, { useEffect, useState } from "react";
import * as motion from "motion/react-client";

const Page = ({ params }: { params: Promise<{ service: string }> }) => {
  const { service } = React.use(params);
  const serviceName = service.replace(/-/, " ");
  const [Service, setService] = useState({ img: "", title: "", text: "" });
  useEffect(() => {
    switch (serviceName) {
      case "Conseil":
        setService({
          img: "/serves-conseil.webp",
          title: "Conseil",
          text: "Les Technico-commerciaux d’HYGINDUST et HYPROTECH ont été formés pour vous apporter des solutions en termes de conseils et d’études pour vos investissements. L’expérience d’HYGINDUST  et d’HYPROTECH, à travers ses nombreuses réalisations, fait office de référence pour les produits et équipements d’hygiène dans  différents domaines, notamment l’industrie agro-alimentaire.",
        });
        break;
      case "Formation":
        setService({
          img: "/serves-formation.webp",
          title: "Formation",
          text: "Notre offre de service comprend également la formation à l’utilisation rationnelle de nos produits et équipements. Cette formation est proposée aux utilisateurs ainsi qu’aux différents responsables. Pour les utilisateurs, l’objectif est de mieux maîtriser les potentialités des produits et équipements, ce qui, à terme, induit une économie certaine pour l’entreprise, aussi bien en produit qu’en maintenance des équipements.",
        });
        break;
      case "Service apres-vente":
        setService({
          img: "/serves-Sav.webp",
          title: "Apre vente",
          text: "Nos ingénieurs technico-commerciaux visitent régulièrement nos clients, selon les besoins et les plannings préétablis.Ces programmes de visites ont pour objet le contrôle du matériel et des méthodes existants et utilisés dans chaque établissement, le contrôle des résultats des consommations ainsi que le bon fonctionnement du matériel.",
        });
        break;
      case "Mise en-route":
        setService({
          img: "/serves-miseRout.webp",
          title: "Mis en route",
          text: "Nos équipes d’ingénieurs interviennent sur site pour la mise en route des équipements et l’application des produits.Ils procèdent à des essais adaptés à vos configurations et les valident pour l’entrée en production.",
        });
        break;

      default:
        break;
    }
  }, [serviceName]);

  return (
    <section className="h-max min-h-screen w-full grid grid-rows-2 lg:grid-rows-1 lg:grid-cols-3">
      <motion.div
        className="h-[50dvh] lg:h-full w-full lg:col-span-1 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${Service.img})`,
        }}
      ></motion.div>
      <div className="h-[50dvh] lg:h-full w-full lg:col-span-2">
        <div className="w-full h-full flex justify-start items-center p-5">
          <div className="lg:w-3/5 sm:w-4/5 flex justify-start items-start flex-col">
            <motion.h1
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-black text-5xl font-bold mt-2"
            >
              Service <br />
              <span className="text-blue-600">{Service.title}</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-black my-5"
            >
              {Service.text}
            </motion.p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Page;
