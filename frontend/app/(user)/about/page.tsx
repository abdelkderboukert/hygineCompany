import React from "react";
import Link from "next/link";

const Page = () => {
  return (
    <>
      <section className="w-full h-screen grid grid-rows-1 lg:grid-rows-1 lg:grid-cols-3">
        <div className="col-span-1 size-full  flex justify-start items-start">
          <div
            className="bg-slate-500 size-5/6 rounded-br-3xl bg-no-repeat bg-cover bg-center overflow-hidden"
            style={{ backgroundImage: "url('/IMG_4530.jpg')" }}
          >
            <div className="size-full bg-gray-900 bg-opacity-90 p-5 justify-center items-center flex">
              {" "}
              <div className="size-full text-white pt-14">
                <h1 className="font-bold text-3xl">Hygindust</h1> <br />
                <p className="">
                  Hygindust (Hygiène industrielle) et Hyprotech (Hygiène
                  professionnelle et technologie), sont spécialisés dans le
                  conseil et la commercialisation de produits et de matériels de
                  nettoyage et de désinfection en industrie agroalimentaire,
                  restauration collective, industrie pharmaceutique et
                  cosmétique. <br /> <br /> Par leur politique de plus
                  qu&apos;un fournisseur un réel partenaire d&apos;hygiène;
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-2 size-full flex justify-center items-center">
          <Link
            href={"/"}
            className="w-32 h-10 mr-5 bg-cover bg-bottom"
            // style={{
            //   backgroundImage: "url('/logo_hygindust-removebg-preview.png')",
            // }}
          >
            <div
              className="w-32 h-10 bg-cover bg-bottom scale-150 lg:scale-[5]"
              style={{
                backgroundImage:
                  "url('/logo/logo_hygindust-removebg-preview.png')",
                // scale: 5,
              }}
            ></div>
          </Link>
        </div>
      </section>
      <section className="w-full h-screen grid grid-rows-1 lg:grid-rows-1 lg:grid-cols-3">
        <div className="col-span-2 size-full flex justify-center items-center">
          <Link
            href={"/"}
            className="w-32 h-10 mr-5 bg-cover bg-bottom"
            // style={{
            //   backgroundImage: "url('/logo_hygindust-removebg-preview.png')",
            // }}
          >
            <div
              className="w-32 h-10 bg-center  bg-contain  bg-no-repeat scale-150 lg:scale-[5]"
              style={{
                backgroundImage:
                  "url('/logo/logo_hyprotech-removebg-preview-removebg-preview.png')",
                // scale: 5,
              }}
            ></div>
          </Link>
        </div>
        <div className="col-span-1 size-full  flex justify-end items-start">
          <div
            className="bg-slate-500 size-5/6 rounded-l-3xl bg-no-repeat bg-cover bg-center overflow-hidden"
            style={{ backgroundImage: "url('/IMG_4530.jpg')" }}
          >
            <div className="size-full bg-gray-900 bg-opacity-90 p-5 justify-center items-center flex">
              {" "}
              <div className="size-full text-white pt-14">
                <h1 className="font-bold text-3xl">Hyprotech</h1> <br />
                <p className="">
                  Hygindust (Hygiène industrielle) et Hyprotech (Hygiène
                  professionnelle et technologie), sont spécialisés dans le
                  conseil et la commercialisation de produits et de matériels de
                  nettoyage et de désinfection en industrie agroalimentaire,
                  restauration collective, industrie pharmaceutique et
                  cosmétique. <br /> <br /> Par leur politique de plus
                  qu&apos;un fournisseur un réel partenaire d&apos;hygiène;
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="w-full h-screen grid grid-rows-1 lg:grid-rows-1 lg:grid-cols-3">
        <div className="col-span-1 size-full  flex justify-start items-start">
          <div
            className="bg-slate-500 size-5/6 rounded-r-3xl bg-no-repeat bg-cover bg-center overflow-hidden"
            style={{ backgroundImage: "url('/IMG_4530.jpg')" }}
          >
            <div className="size-full bg-gray-900 bg-opacity-90 p-5 justify-center items-center flex">
              {" "}
              <div className="size-full text-white pt-14">
                <h1 className="font-bold text-3xl">Hyprochem</h1> <br />
                <p className="">
                  Hygindust (Hygiène industrielle) et Hyprotech (Hygiène
                  professionnelle et technologie), sont spécialisés dans le
                  conseil et la commercialisation de produits et de matériels de
                  nettoyage et de désinfection en industrie agroalimentaire,
                  restauration collective, industrie pharmaceutique et
                  cosmétique. <br /> <br /> Par leur politique de plus
                  qu&apos;un fournisseur un réel partenaire d&apos;hygiène;
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-2 size-full flex justify-center items-center">
          <Link
            href={"/"}
            className="w-32 h-10 mr-5 bg-cover bg-bottom"
            // style={{
            //   backgroundImage: "url('/logo_hygindust-removebg-preview.png')",
            // }}
          >
            <div
              className="w-32 h-10 bg-cover bg-bottom scale-150 lg:scale-[5]"
              style={{
                backgroundImage: "url('/logo/IMG-20250227-WA0002.jpg')",
                // scale: 5,
              }}
            ></div>
          </Link>
        </div>
      </section>
      <section className="w-full h-screen grid grid-rows-1 lg:grid-rows-1 lg:grid-cols-3">
        <div className="col-span-2 size-full flex justify-center items-center">
          <Link
            href={"/"}
            className="w-32 h-10 mr-5 bg-cover bg-bottom"
            // style={{
            //   backgroundImage: "url('/logo_hygindust-removebg-preview.png')",
            // }}
          >
            <div
              className="w-32 h-10 bg-center  bg-contain  bg-no-repeat scale-150 lg:scale-[5]"
              style={{
                backgroundImage: "url('/logo/IMG-20250227-WA0003.jpg')",
                // scale: 5,
              }}
            ></div>
          </Link>
        </div>
        <div className="col-span-1 size-full  flex justify-end items-start">
          <div
            className="bg-slate-500 size-5/6 rounded-l-3xl bg-no-repeat bg-cover bg-center overflow-hidden"
            style={{ backgroundImage: "url('/IMG_4530.jpg')" }}
          >
            <div className="size-full bg-gray-900 bg-opacity-90 p-5 justify-center items-center flex">
              {" "}
              <div className="size-full text-white pt-14">
                <h1 className="font-bold text-3xl">Hyproplast</h1> <br />
                <p className="">
                  Hygindust (Hygiène industrielle) et Hyprotech (Hygiène
                  professionnelle et technologie), sont spécialisés dans le
                  conseil et la commercialisation de produits et de matériels de
                  nettoyage et de désinfection en industrie agroalimentaire,
                  restauration collective, industrie pharmaceutique et
                  cosmétique. <br /> <br /> Par leur politique de plus
                  qu&apos;un fournisseur un réel partenaire d&apos;hygiène;
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="w-full h-screen grid grid-rows-1 lg:grid-rows-1 lg:grid-cols-3">
        <div className="col-span-1 size-full  flex justify-start items-start">
          <div
            className="bg-slate-500 size-5/6 rounded-r-3xl bg-no-repeat bg-cover bg-center overflow-hidden"
            style={{ backgroundImage: "url('/IMG_4530.jpg')" }}
          >
            <div className="size-full bg-gray-900 bg-opacity-90 p-5 justify-center items-center flex">
              {" "}
              <div className="size-full text-white pt-14">
                <h1 className="font-bold text-3xl">Vabiotech</h1> <br />
                <p className="">
                  Hygindust (Hygiène industrielle) et Hyprotech (Hygiène
                  professionnelle et technologie), sont spécialisés dans le
                  conseil et la commercialisation de produits et de matériels de
                  nettoyage et de désinfection en industrie agroalimentaire,
                  restauration collective, industrie pharmaceutique et
                  cosmétique. <br /> <br /> Par leur politique de plus
                  qu&apos;un fournisseur un réel partenaire d&apos;hygiène;
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-2 size-full flex justify-center items-center">
          <Link
            href={"/"}
            className="w-32 h-10 mr-5 bg-cover bg-bottom"
            // style={{
            //   backgroundImage: "url('/logo_hygindust-removebg-preview.png')",
            // }}
          >
            <div
              className="w-32 h-10 bg-center  bg-contain  bg-no-repeat scale-150 lg:scale-[5]"
              style={{
                backgroundImage: "url('/logo/IMG-20250227-WA0004.jpg')",
                // scale: 5,
              }}
            ></div>
          </Link>
        </div>
      </section>
    </>
  );
};

export default Page;
