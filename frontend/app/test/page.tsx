import React from "react";

const Page = () => {
  return (
    <section className="w-full h-screen bg-black flex justify-center items-center">
      <div className="w-[300px] h-[150px] bg-white flex flex-row">
        <div className="w-1/2 h-full flex flex-col">
          <div className="flex flex-col justify-start items-start p-3">
            <h1 className="text-xl font-black text-black">
              Boukert&nbsp;Abdelkader
            </h1>
            <p className="text-[8px] text-gray-500">
              ingenieur systemes informatiques et logiciel
            </p>
            <div className="w-1/2 h-[2px] rounded-full my-2 bg-cyan-900"></div>
            <div className="text-[5px] text-gray-600 flex flex-row items-center">
              <img src="i1.svg" alt="My Icon" width={12} height={12} />
              &nbsp;
              <p className="w-full h-max">
                Hygindust <br />
                village benramdan lot 102 n°2 chbli blida
              </p>
            </div>
            <div className="text-[5px] text-gray-600 flex flex-row items-center">
              <img src="i2.svg" alt="My Icon" width={12} height={12} />
              &nbsp;
              <p className="w-full h-max">
                + 213&nbsp;(0)&nbsp;6&nbsp;56&nbsp;90&nbsp;60&nbsp;49
              </p>
            </div>
            <div className="text-[5px] text-gray-600 flex flex-row items-center">
              <img src="i3.svg" alt="My Icon" width={12} height={12} />
              &nbsp;
              <a href="" className="w-full h-max">
                www.hygindust.com
              </a>
            </div>
          </div>
        </div>
        <div className="w-1/2 h-full  flex flex-col justify-center items-center">
          {/* <div
            className=" w-1/2 h-10 bg-contain bg-no-repeat bg-center"
            style={{
              backgroundImage:
                "url('https://drive.google.com/uc?export=view&id=1kYZ9LyH9WRQTWAV-s3qqa31QI_mxDAFd')",
            }}
          ></div> */}
          <img
            src="https://drive.google.com/uc?export=view&id=1kYZ9LyH9WRQTWAV-s3qqa31QI_mxDAFd"
            className="w-1/2 h-10 bg-contain bg-no-repeat bg-center"
            alt="My Icon"
          />
          <div
            className=" w-full h-10 bg-contain bg-no-repeat bg-center"
            style={{
              backgroundImage:
                "url('/logo_hyprotech-removebg-preview-removebg-preview.png')",
            }}
          ></div>
        </div>
      </div>
    </section>
  );
};

export default Page;
