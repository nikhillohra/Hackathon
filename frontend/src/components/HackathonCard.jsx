import React from "react";
import { useNavigate } from "react-router-dom";
import checkIcon from "../assets/check.svg";
import CountdownTimer from "./CountdownTimer";
import { formatPastDate } from "../utils/formatDate";

const HackathonCard = ({ hackathon }) => {
  const navigate = useNavigate();

  const handleParticipateClick = () => {
    navigate(`/hackathon/${hackathon._id}`);
  };

  const bgColors = {
    Upcoming: "bg-[#F2C94C40]",
    Active: "bg-[#44924C3D]",
    Past: "bg-[#FF3C002B]",
  };

  return (
    <div className="bg-white rounded-2xl flex flex-col justify-between items-center h-full">
      {hackathon.image ? (
        <img
          src={`https://hackathon-lqii.onrender.com/${hackathon.image}`}
          alt={hackathon.title}
          className="w-full h-48 object-cover rounded-t-2xl"
        />
      ) : (
        <div className="w-full h-48 rounded-t-2xl bg-gray-200 flex items-center justify-center">
          <span className="text-gray-500">No Image Available</span>
        </div>
      )}

      <div
        className={`flex items-center justify-center w-2/6 mt-8 ${
          bgColors[hackathon.status]
        }`}
      >
        <p className="text-gray-600">{hackathon.status}</p>
      </div>

      <div className="p-4 flex flex-col justify-between flex-grow">
        <h2 className="font-[500] text-center mt-4 text-xl mb-2">
          {hackathon.title}
        </h2>

        {hackathon.status === "Upcoming" && (
          <div className="flex flex-col items-center justify-center mt-4">
            <div className="text-[#454545]">Starts in</div>
            <CountdownTimer endDate={hackathon.startDate} />
          </div>
        )}

        {hackathon.status === "Active" && (
          <div className="flex flex-col items-center justify-center mt-4">
            <div className="text-[#454545]">Ends in</div>
            <CountdownTimer endDate={hackathon.endDate} />
          </div>
        )}

        {hackathon.status === "Past" && (
          <div className="flex flex-col items-center justify-center mt-4">
            <div className="text-[#454545] pt-3">Ended on</div>
            <div className="font-[500] p-2 text-xl mb-3">
              {formatPastDate(hackathon.endDate)}
            </div>
          </div>
        )}
      </div>

      <div className="w-full flex justify-center mt-auto">
        <button
          onClick={handleParticipateClick}
          className="bg-[#44924C] hover:bg-green-600 px-4 py-2 mb-6 rounded-lg text-sm text-white flex items-center justify-center gap-1"
        >
          <img src={checkIcon} alt="check" className="flex" />
          Participate Now
        </button>
      </div>
    </div>
  );
};

export default HackathonCard;
