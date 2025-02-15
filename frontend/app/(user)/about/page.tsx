import React from "react";

function page() {
  return (
    <section className="h-max w-full">
      <div
        className="h-[60dvh] w-full bg-black bg-cover bg-top"
        style={{ backgroundImage: "url('/serves-conseil.webp')" }}
      ></div>
      <div className="flex w-full justify-center items-center flex-col">
        <h1 className="text-5xl sm:text-7xl font-bold my-16 text-[#0e012d]">
          A Propos De Nous
        </h1>
        <div className="flex justify-center items-center text-start sm:text-xl p-8">
          Hygindust (Hygiène industrielle) et Hyprotech (Hygiène professionnelle
          et technologie), sont spécialisés dans le conseil et la
          commercialisation de produits et de matériels de nettoyage et de
          désinfection en industrie agroalimentaire, restauration collective,
          industrie pharmaceutique et cosmétique. <br /> <br /> Par leur
          politique de plus qu&apos;un fournisseur un réel partenaire
          d&apos;hygiène; Hygindust/hyprotech, dans un temps record ont pus
          fidéliser une clientèle multiple et diverse: Laiteries, Industrie des
          boissons et des glaces, Conserveries et Charcuteries, Hôtelleries, En
          étroite collaboration avec ses partenaires internationaux,
          Hygindust/Hyprotech mettent à votre disposition une équipe
          d&apos;ingénieurs experts et un savoir-faire, afin de mettre en place
          des produits et un matériel à travers des protocoles d&apos;hygiène
          appropriés à chaque type d&apos;industrie et compatibles aux démarches
          H.A.C.C.P. <br /> <br /> Hygindust/Hyprotech vous propose un rapport
          qualité/prix optimal, élaboré de façon rigoureuse en fonction
          d&apos;une étude d&apos;existant préalable de conditions techniques et
          de la spécialité de votre établissement. <br /> <br /> Dans le souci
          d&apos;être encore plus proche de vous et à l&apos;écoute de vos
          inquiétudes, Hygindust/hyprotech ont tissés un réseau couvrant
          l&apos;ensemble du territoire national
        </div>
      </div>
    </section>
  );
}

export default page;
