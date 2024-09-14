import React from "react";
import CardContainer from "./CardContainer";
import { community } from "../constants";

const WhyParticipate = () => {
  return (
    <>
      <section className="flex items-center flex-col justify-center h-auto bg-[#ffffff]">
        {/* Header Section */}
        <div className="flex mt-10 justify-center">
          <h1 className="text-center text-4xl">
            Why Participate in{" "}
            <span className="text-[#0FA958]">AI Challenges?</span>
          </h1>
        </div>

        {/* Cards Section */}
        <div className="mt-24 flex flex-wrap justify-center gap-6 p-6">
          {community.map((item, index) => (
            <CardContainer
              key={index}
              title={item.title}
              details={item.details}
              image={item.image}
            />
          ))}
        </div>
      </section>
    </>
  );
};

export default WhyParticipate;
