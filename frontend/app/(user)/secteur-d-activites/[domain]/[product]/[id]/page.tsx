"use client";
import React, { useEffect, useState } from "react";
import { useFirestoreP } from "@/_utils/useFirestore";
import { db } from "@/firebase";
import { collection, getDocs } from "firebase/firestore";
// import Link from "next/link";
import { Product } from "@/types";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface EquipementType {
  id: string;
  typeName: string;
  image?: string;
}

const Page = ({
  params,
}: {
  params: Promise<{ domain: string; product: string; id: string }>;
}) => {
  const { domain, product, id } = React.use(params);
  const CLDomain = domain.replace(/%20/g, " ");
  const CLproduct = product.replace(/%20/g, " ");

  const [EquipementSubType, setEquipementSubType] =
    useState<EquipementType | null>(null);
  const [Prod, setProd] = useState<Product>();

  const fetchProductSubTypeByName = async (type: string, name: string) => {
    try {
      const querySnapshot = await getDocs(
        collection(db, "products", type, "Equipements-subType")
      );
      const types = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as EquipementType[];
      // Find the product type by name
      const foundType = types.find((type) => type.typeName === name);
      setEquipementSubType(foundType || null);
    } catch (error) {
      console.error("Error fetching product type:", error);
    }
  };

  useEffect(() => {
    if (CLproduct) {
      fetchProductSubTypeByName(CLDomain, CLproduct);
    }
  }, [CLDomain, CLproduct]);
  const { products, loading, error } = useFirestoreP({
    selectedType: CLDomain,
    selectedSubType: EquipementSubType?.id,
  });

  useEffect(() => {
    if (id && products) {
      const p = products.find((pro) => pro.id === id);
      if (p) {
        //@ts-expect-error hur
        setProd(p);
        setFormData((prev) => ({
          ...prev,
          ref: p.ref, // Update ref in form data when Prod is set
        }));
      }
    }
  }, [id, products]);

  interface FormData {
    name: string;
    company: string;
    message: string;
    email: string;
    ref: number | undefined;
  }

  const [formData, setFormData] = useState<FormData>({
    name: "",
    company: "",
    message: "",
    email: "",
    ref: 0,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Update handleSubmit
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const response = await fetch("/api/sendEmail", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();
    if (response.ok) {
      alert("Email sent successfully!");
    } else {
      alert("Error sending email: " + data.error);
    }
  };

  if (loading) return <div>Loading...</div>;
  //@ts-expect-error ggg
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="min-h-max w-full h-max pt-20 grid grid-flow-row sm:grid-cols-3 sm:grid-rows-1">
      <div className="w-full min-h-screen h-full flex justify-start items-center flex-col">
        {Prod?.images ? (
          <Carousel className="w-full max-w-xs">
            <CarouselContent>
              {Prod?.images.map((_, index) => (
                <CarouselItem className="h-full" key={index}>
                  <div className="">
                    <Card>
                      <CardContent className="flex aspect-square items-center justify-center p-6">
                        <div
                          className="h-full w-full bg-cover bg-center bg-no-repeat"
                          style={{
                            backgroundImage: `url(${Prod?.images[index]})`,
                          }}
                        ></div>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        ) : (
          <p className="flex justify-center items-center">No image</p>
        )}
        <div className="w-full h-full p-5 grid grid-rows-2 grid-cols-4 gap-2">
          {Prod?.images.map((image, index) => (
            <div
              key={index}
              className="w-full h-full bg-cover bg-center bg-no-repeat"
              style={{
                backgroundImage: `url(${image})`,
              }}
            ></div>
          ))}
        </div>
      </div>
      <div className="w-full min-h-screen h-max flex flex-col justify-start items-start sm:col-span-2 p-5">
        <div className="flex w-full h-max flex-row justify-start items-start">
          <h1 className="text-5xl sm:text-7xl text-[#0e012d] font-bold ">
            {Prod?.name}
          </h1>
          <p className="w-full h-max p-4 justify-start ">{Prod?.ref}</p>
        </div>
        <h2 className="text-xl mt-3">{Prod?.subtitle}</h2>
        <h1 className="text-3xl my-5">description:</h1>
        <p className="mt-6 w-full h-max ">{Prod?.description}</p>
        <form onSubmit={handleSubmit} className="size-full mt-5">
          <div className="w-full grid grid-rows-2 lg:grid-cols-2 gap-6">
            <Input
              type="text"
              id="name"
              name="name"
              className="text-black"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Name"
            />
            <Input
              type="text"
              id="company"
              name="company"
              className="text-black"
              value={formData.company}
              onChange={handleChange}
              required
              placeholder="company name"
            />
            <Input
              type="email"
              id="email"
              name="email"
              className="text-black"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Email"
            />
            <div className="size-full">
              <button
                type="submit"
                className="bg-cyan-800 text-white font-bold size-full rounded-lg"
              >
                Submit
              </button>
            </div>
          </div>
          <Textarea
            id="message"
            name="message"
            className="text-black size-full mt-6"
            value={formData.message}
            onChange={handleChange}
            required
            placeholder="Type your message here."
          />
        </form>
      </div>
    </div>
  );
};

export default Page;
