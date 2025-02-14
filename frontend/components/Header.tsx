"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { isAuthenticated } from "@/_utils/auth";

const Header = () => {
  const Links = [
    { name: "Acceuil", url: "/" },
    { name: "A propos de nous", url: "/about" },
    {
      name: "Secteur d'activites",
      url1: "/secteur-d-activites",
      url: [
        {
          name: "Entreprise de proprete",
          url: "/secteur-d-activites/Entreprise-de-proprete",
        },
        { name: "HoReCa", url: "/secteur-d-activites/HoReCa" },
        {
          name: "Industries agroalimentaire",
          url: "/secteur-d-activites/Industries-agroalimentaire",
        },
        {
          name: "industries pharmacique et cosmetique",
          url: "/secteur-d-activites/industries-pharmacique-et-cosmetique",
        },
        { name: "Sante", url: "/secteur-d-activites/Sante" },
      ],
    },
    { name: "Nos Equipements", url: "/No-Equipements" },
    {
      name: "services",
      url1: "/serves",
      url: [
        { name: "Conseil", url: "/serves/Conseil" },
        { name: "Mise en Route", url: "/serves/mise-en-route" },
        { name: "Formation", url: "/serves/Formation" },
        { name: "Service apres vente", url: "/serves/Service-apres-vente" },
      ],
    },
    { name: "Contact", url: "/" },
  ];
  const [isMobile, setIsMobile] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (!mobile) {
        setIsOpen(false);
      }
    };

    handleResize(); // Set initial value
    window.addEventListener("resize", handleResize); // Update on resize

    return () => {
      window.removeEventListener("resize", handleResize); // Cleanup
    };
  }, []);

  // const [authToken, setAuthToken] = useState<string | null>(null);

  // useEffect(() => {
  //   // Client-side cookie access
  //   const getCookie = (name: string) => {
  //     const value = `; ${document.cookie}`;
  //     const parts = value.split(`; ${name}=`);
  //     if (parts.length === 2) return parts.pop()?.split(";").shift();
  //   };

  //   setAuthToken(getCookie("authToken") || null);
  // }, []);https://r3rblgp3-3000.uks1.devtunnels.ms/
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const checkAuth = () => {
      setLoggedIn(isAuthenticated());
    };

    checkAuth();
  }, []);

  return (
    <header
      className={`font-bold p-4 fixed w-full z-50  bg-white${
        isOpen ? "divBlur" : ""
      }`}
    >
      <div className="container mx-auto flex items-center">
        <Link
          href={"/"}
          className="w-32 h-10 mr-5 bg-cover bg-bottom"
          // style={{
          //   backgroundImage: "url('/logo_hygindust-removebg-preview.png')",
          // }}
        >
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0, transition: { duration: 0.5 } }}
            exit={{ opacity: 0, transition: { duration: 0.5 } }}
            className="w-32 h-10 mr-5 bg-cover bg-bottom"
            style={{
              backgroundImage:
                "url('/logo/logo_hygindust-removebg-preview.png')",
            }}
          ></motion.div>
        </Link>
        <Link
          href={"/"}
          className="w-32 h-10 mr-5 bg-cover bg-bottom"
          // style={{
          //   backgroundImage: "url('/logo_hygindust-removebg-preview.png')",
          // }}
        >
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0, transition: { duration: 0.5 } }}
            exit={{ opacity: 0, transition: { duration: 0.5 } }}
            className="w-32 h-14 mr-auto bg-center  bg-contain  bg-no-repeat"
            style={{
              backgroundImage:
                "url('/logo/logo_hyprotech-removebg-preview-removebg-preview.png')",
            }}
          ></motion.div>
        </Link>
        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-black flex ml-auto mr-0 focus:outline-none"
          >
            {isOpen ? (
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            )}
          </button>
        </div>

        {/* Navigation Links */}
        <nav className={`md:flex ${isOpen ? "block" : "hidden"} md:block`}>
          <motion.ul
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
            className={`flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4 md:items-center ${
              isOpen ? "absolute top-16 left-0 w-full divBlur" : ""
            }`}
          >
            {Links.map((item) => (
              <motion.li
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
                key={item.name}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className={`relative group rounded-lg overflow-hidden ${
                  isOpen ? " divBlur" : ""
                }`}
              >
                {Array.isArray(item.url) ? (
                  <DropdownMenu>
                    <DropdownMenuTrigger className="text-black px-4 py-2 select-none">
                      <a href={item.url1} onClick={() => setIsOpen(false)}>
                        {item.name}
                      </a>
                    </DropdownMenuTrigger>
                    <DropdownMenuPortal></DropdownMenuPortal>
                    <DropdownMenuContent className="w-56">
                      <DropdownMenuLabel>
                        <a href={item.url1} onClick={() => setIsOpen(false)}>
                          {item.name}
                        </a>
                      </DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      {item.url.map((subItem) => (
                        <DropdownMenuItem key={subItem.name}>
                          {Array.isArray(subItem.url) ? (
                            <>
                              {/* <DropdownMenu>
                                <DropdownMenuTrigger className="text-black px-4 py-2">
                                  {subItem.name}
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="w-56">
                                  <DropdownMenuLabel>
                                    {subItem.name}
                                  </DropdownMenuLabel>
                                  <DropdownMenuSeparator />
                                  {subItem.url.map((nestedItem) => (
                                    <DropdownMenuItem key={nestedItem.name}>
                                      <a
                                        href={nestedItem.url}
                                        onClick={() => setIsOpen(false)}
                                      >
                                        {nestedItem.name}
                                      </a>
                                    </DropdownMenuItem>
                                  ))}
                                </DropdownMenuContent>
                              </DropdownMenu> */}
                              <DropdownMenuSub>
                                <DropdownMenuSubTrigger>
                                  {subItem.name}
                                  <a
                                    href={subItem.url}
                                    onClick={() => setIsOpen(false)}
                                  >
                                    {subItem.name}
                                  </a>
                                </DropdownMenuSubTrigger>
                                <DropdownMenuPortal>
                                  <DropdownMenuSubContent>
                                    {subItem.url.map((nestedItem) => (
                                      <DropdownMenuItem key={nestedItem.name}>
                                        <a
                                          href={nestedItem.url}
                                          onClick={() => setIsOpen(false)}
                                        >
                                          {nestedItem.name}
                                        </a>
                                      </DropdownMenuItem>
                                    ))}
                                  </DropdownMenuSubContent>
                                </DropdownMenuPortal>
                              </DropdownMenuSub>
                            </>
                          ) : (
                            <a
                              href={subItem.url}
                              className="relative text-black z-10 hover:text-cyan-700 px-4 py-2"
                              onClick={() => setIsOpen(false)} // Close mobile menu on link click
                            >
                              {subItem.name}
                            </a>
                          )}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  <a
                    href={item.url}
                    className="relative text-black z-10 hover:text-green-300 px-4 py-2"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.name}
                  </a>
                )}
              </motion.li>
            ))}
            {loggedIn ? (
              <motion.li
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
                className="text-black"
              >
                Logout
              </motion.li>
            ) : null}
          </motion.ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
