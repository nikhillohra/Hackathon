import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { MdAccessTime } from "react-icons/md";
import levelIcon from "../assets/level.svg";

const HackathonDetail = () => {
  const { id } = useParams();
  const [hackathon, setHackathon] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const navigate = useNavigate();

  const handleBackButton = () => {
    navigate("/");
  };

  useEffect(() => {
    const fetchHackathon = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5005/api/hackathons/${id}`
        );
        setHackathon(response.data);
      } catch (error) {
        console.error("Error fetching hackathon details:", error);
      }
    };
    fetchHackathon();
  }, [id]);

  const handleEdit = () => {
    navigate(`/edit/${id}`);
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5005/api/hackathons/${id}`);
      navigate("/");
    } catch (error) {
      console.error("Error deleting hackathon:", error);
    }
  };

  const confirmDelete = () => {
    setShowConfirm(true);
  };

  const cancelDelete = () => {
    setShowConfirm(false);
  };

  const capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  };

  return (
    <div className="h-lvh w-full">
      {hackathon ? (
        <>
          {/* Header Section */}
          <div className=" bg-[rgb(0,49,69)]  flex flex-col text-white p-12  sm:p-24 ">
            {/* Date and Time Bar */}
            <div className="bg-[#FFCE5C] w-[50%] p-1 flex items-center justify-center text-center rounded   ">
              <p className="text-black flex items-center justify-center gap-2   inter font-semibold sm:text-base text-xs ">
                <MdAccessTime className="text-lg " />
                Starts on{" "}
                {new Date(hackathon.startDate).toLocaleString("en-IN", {
                  timeZone: "Asia/Kolkata",
                })}{" "}
                (India Standard Time)
              </p>
            </div>
            {/* hackathon.title */}
            <h1 className="text-[40px] font-semibold my-10">
              {hackathon.title}
            </h1>
            <p className="text-base">{hackathon.description}</p>
            {/* Difficulty Badge */}
            <div className="mt-5">
              <div className="flex gap-2 w-[6rem] items-center justify-center bg-gray-200 inter text-[#003145] px-4 py-2 rounded-lg">
                <img src={levelIcon} alt="levelIcon" className="w-4 " />
                {capitalizeFirstLetter(hackathon.level)}
              </div>
            </div>
          </div>

          {/* Overview Bar  */}
          <div className="flex justify-around w-full h-[66px] bg-white shadow-lg shadow-[#DDE6ED] mb-10">
            {/* overview with green bar */}
            <div className="overview flex items-center justify-center">
              <div className="flex justify-center h-full px-10 bg-white items-center relative">
                <h2 className="text-xl font-semibold">Overview</h2>
                <div className="absolute bottom-0 rounded-full  w-[9rem] h-[4px] bg-[#44924C] shadow-lg"></div>
              </div>
            </div>

            {/* Buttons */}

            <div className="buttons flex justify-end ">
              <div className="flex justify-end items-center space-x-4 p-4">
                <button
                  onClick={handleEdit}
                  className="px-8 py-2 bg-[#44924C] hover:bg-[#2c6532] text-white rounded-xl"
                >
                  Edit
                </button>
                <button
                  onClick={confirmDelete}
                  className="px-4 py-2 bg-white hover:bg-[#f6cccc] border-[#DC1414] text-[#DC1414] border-[1.2px] rounded-xl"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="flex px-10 mb-20">
            <div className="container p-4">
              <p className="text-[#64607D]">{hackathon.description}</p>
            </div>
          </div>

          {/* Back Button */}
          <button
            type="button"
            onClick={handleBackButton}
            className="px-8 py-2 m-10 text-white bg-red-500 rounded-xl hover:bg-gray-600 focus:outline-none"
          >
            Back
          </button>

          {/* Delete Confirmation Modal */}
          {showConfirm && (
            <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
              <div className="bg-white p-4 rounded-lg shadow-lg">
                <p className="mb-4">
                  Are you sure you want to delete this hackathon?
                </p>
                <div className="flex space-x-4">
                  <button
                    onClick={handleDelete}
                    className="px-4 py-2 bg-red-500 text-white rounded-lg"
                  >
                    Yes, Delete
                  </button>
                  <button
                    onClick={cancelDelete}
                    className="px-4 py-2 bg-gray-500 text-white rounded-lg"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default HackathonDetail;
