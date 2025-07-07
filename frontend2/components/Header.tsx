"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Shield,
  ChevronDown,
  Globe,
  Menu,
  X,
  ChevronRight,
} from "lucide-react";
import { getProductTypes, type ProductType } from "@/lib/firebase-admin";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

export function Header() {
  const [productTypes, setProductTypes] = useState<ProductType[]>([]);
  const [loading, setLoading] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileProductsOpen, setMobileProductsOpen] = useState(false);
  const pathname = usePathname();

  // Close mobile menu when navigating to a new page
  useEffect(() => {
    setMobileMenuOpen(false);
    setMobileProductsOpen(false);
  }, [pathname]);

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  useEffect(() => {
    const fetchProductTypes = async () => {
      try {
        const types = await getProductTypes();
        setProductTypes(types);
      } catch (error) {
        console.error("Error fetching product types:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProductTypes();
  }, []);

  return (
    <header className="border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 z-10">
            <Shield className="h-8 w-8 text-blue-600" />
            <span className="text-2xl font-bold text-gray-900">Hygindust</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link
              href="/"
              className="text-gray-700 hover:text-blue-600 transition-colors"
            >
              home
            </Link>

            {/* Products Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center text-gray-700 hover:text-blue-600 transition-colors">
                products
                <ChevronDown className="ml-1 h-4 w-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-64">
                {loading ? (
                  <DropdownMenuItem disabled>loading</DropdownMenuItem>
                ) : productTypes.length > 0 ? (
                  <>
                    <DropdownMenuItem asChild>
                      <Link href="/products" className="w-full">
                        <div className="flex flex-col">
                          <span className="font-medium">viewAll products</span>
                        </div>
                      </Link>
                    </DropdownMenuItem>
                    <div className="border-t my-1" />
                    {productTypes.map((type) => (
                      <DropdownMenuItem key={type.id} asChild>
                        <Link href={`/products/${type.id}`} className="w-full">
                          <div className="flex items-center space-x-3">
                            <div
                              className={`w-3 h-3 rounded-full ${
                                type.theme?.bgColor || "bg-blue-100"
                              } border ${
                                type.theme?.borderColor || "border-blue-300"
                              }`}
                            />
                            <div className="flex flex-col">
                              <span className="font-medium">{type.name}</span>
                              <span className="text-sm text-gray-500 truncate max-w-48">
                                {type.description}
                              </span>
                            </div>
                          </div>
                        </Link>
                      </DropdownMenuItem>
                    ))}
                  </>
                ) : (
                  <DropdownMenuItem disabled>
                    "Aucun produit trouvé"
                  </DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>

            <Link
              href="/suppliers"
              className="text-gray-700 hover:text-blue-600 transition-colors"
            >
              suppliers
            </Link>
            <Link
              href="/about"
              className="text-gray-700 hover:text-blue-600 transition-colors"
            >
              about
            </Link>
            <Link
              href="/#contact"
              className="text-gray-700 hover:text-blue-600 transition-colors"
            >
              contact
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center z-10">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileMenuOpen}
              className="text-gray-700"
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>

          {/* Mobile Menu */}
        </div>
      </div>
    </header>
  );
}
