import React from "react";
import AiChip from "../assets/aiChip.svg";
import DataSc from "../assets/dataSc.svg";
import AiCh from "../assets/AiCh.svg";
import CountUp from "react-countup";

const statsData = [
  {
    image: AiChip,
    alt: "AI Chip",
    count: 100,
    label: "AI model submissions",
    suffix: "K+",
  },
  {
    image: DataSc,
    alt: "Data Scientists",
    count: 50,
    label: "Data Scientists",
    suffix: "K+",
  },
  {
    image: AiCh,
    alt: "AI Challenges",
    count: 100,
    label: "AI Challenges hosted",
    suffix: "+",
  },
];

const CountUpBar = () => {
  return (
    <section className="bg-[#002A3B] w-full flex md:p-10 p-3 justify-evenly items-center flex-wrap gap-4">
      {statsData.map((item, index) => (
        <div
          key={index}
          className="flex md:gap-10 gap-2 flex-col sm:flex-row items-center justify-center"
        >
          <img src={item.image} alt={item.alt} className="w-10 sm:w-[55px]" />
          <div className="flex flex-col sm:items-start items-center justify-center ">
            <h1 className="inter sm:text-[24px] text-base font-[700] leading-5 text-white">
              <CountUp
                start={0}
                end={item.count}
                duration={3}
                delay={0.5}
                easingFn={(t, b, c, d) => c * (t /= d) * t + b}
              />
              <span>{item.suffix}</span>
            </h1>
            <h2 className="inter text-center sm:text-[16px] text-sm font-[500] leading-5 text-white">
              {item.label}
            </h2>
          </div>
          {index < statsData.length - 1 && (
            <div className="hidden md:flex bg-white w-[1px] h-10"></div>
          )}
        </div>
      ))}
    </section>
  );
};

export default CountUpBar;
