import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
{
  /*import Header from "@/components/Header";*/
}
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Hygindust",
  description: "hyginène industrielle",
};

export default function RootLayout(
  {
    /*{
  children,
}: Readonly<{
  children: React.ReactNode;
}>*/
  }
) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/*<Header />
        {children}*/}
        <div
          className="w-full h-screen bg-cover bg-center"
          style={{ backgroundImage: "url(/IMG_4530.jpg)" }}
        >
          <div className="size-full bg-black bg-opacity-65 flex justify-center items-center">
            <div className="text-white text-4xl md:text-6xl font-bold">
              <h1 className="text-center">Hygindust</h1>
              <p className="text-center text-gray-300">hygiène industrielle</p>
              <p className="text-center text-gray-500 text-xl">
                Website under development Thank you for your patience
              </p>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
