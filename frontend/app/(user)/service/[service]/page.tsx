import React from "react";

const Page = ({ params }: { params: Promise<{ service: string }> }) => {
  const { service } = React.use(params);
  return <div>{service}</div>;
};

export default Page;
