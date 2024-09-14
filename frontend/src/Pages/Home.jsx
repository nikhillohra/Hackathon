import React from "react";
import CreateChallenge from "../components/CreateChallenge";
import WhyParticipate from "../components/WhyParticipate";
import CountUpBar from "../components/CountUpBar";
import ExploreChallenge from "../components/ExploreChallenges";

const Home = () => {
  return (
    <>
      <div className="h-full w-full bg-[#003145]">
        <CreateChallenge />
        <CountUpBar />
      </div>
      <div className="mt-10 ">
        <WhyParticipate />
        <ExploreChallenge />
      </div>
    </>
  );
};

export default Home;
