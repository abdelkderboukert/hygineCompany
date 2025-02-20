import React from "react";

const Page = ({ params }: { params: Promise<{ service: string }> }) => {
  const { service } = React.use(params);
  console.log(service);
  return (
    <section className="h-max min-h-screen w-full grid grid-rows-2 lg:grid-rows-1 lg:grid-cols-3">
      <div className="h-[50dvh] lg:h-full w-full bg-black lg:col-span-1"></div>
      <div className="h-[50dvh] lg:h-full w-full bg-red-500 lg:col-span-2"></div>
    </section>
  );
};

export default Page;
