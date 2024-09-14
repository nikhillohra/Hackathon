import React from "react";
import rocket from "../assets/rocket.svg";
import { useNavigate } from "react-router-dom";

const CreateChallenge = () => {
  const navigate = useNavigate();

  const handleCreateChallenge = () => {
    navigate("/challenge");
  };

  return (
    <section className="flex w-full p-4 bg-[#003145]">
      <div className="flex flex-col lg:flex-row sm:justify-evenly w-full gap-10 sm:m-[5rem] m-6">
        {/* Left Section */}
        <div className="flex justify-start gap-5">
          <div className="bg-[#FFCE5C] h-[115px] w-1 md:w-2"></div>
          <div>
            <h1 className="text-white text-[36px] md:text-[48px] leading-[46px] md:leading-[56px] font-semibold lg:w-[640px]">
              Accelerate Innovation with Global AI Challenges
            </h1>
            <p className="text-[#ECECEC] sm:w-[530px] font-[500] text-[16px] md:text-[18px] leading-[26px] md:leading-[28px] mt-6 md:mt-14">
              AI Challenges at DPhi simulate real-world problems. It is a great
              place to put your AI/Data Science skills to the test on diverse
              datasets, allowing you to foster learning through competitions.
            </p>
            <button
              onClick={handleCreateChallenge}
              className="w-[200px] h-[50px] bg-white text-black font-semibold rounded-lg mt-8 hover:bg-[#FFCE5C] transition duration-300 ease-in-out"
            >
              Create Challenge
            </button>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center justify-center mt-6 lg:mt-0">
          <img
            src={rocket}
            alt="rocket-img"
            className="md:w-[300px] w-[180px]"
          />
        </div>
      </div>
    </section>
  );
};

export default CreateChallenge;
