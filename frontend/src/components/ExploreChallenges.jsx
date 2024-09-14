import React, { useState, useEffect } from "react";
import axios from "axios";
import SearchAndFilter from "./SearchAndFilter";
import HackathonCard from "./HackathonCard";

const ExploreChallenges = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState([]);
  const [selectedLevel, setSelectedLevel] = useState([]);
  const [hackathons, setHackathons] = useState([]); 
  const [filteredHackathons, setFilteredHackathons] = useState([]);

  // Fetching Hackathons
  useEffect(() => {
    const fetchHackathons = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5005/api/hackathons"
        );
        setHackathons(response.data);
      } catch (error) {
        console.error("Error fetching hackathons:", error);
      }
    };
    fetchHackathons();
  }, []);

  // Handle Filter
  useEffect(() => {
    const filteredData = hackathons.filter((hackathon) => {
      const matchesStatus =
        selectedStatus.length === 0 ||
        selectedStatus.includes(hackathon.status);
      const matchesLevel =
        selectedLevel.length === 0 || selectedLevel.includes(hackathon.level);
      const matchesSearch = hackathon.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

      return matchesStatus && matchesLevel && matchesSearch;
    });
    setFilteredHackathons(filteredData);
  }, [searchTerm, selectedStatus, selectedLevel, hackathons]);

  return (
    <>
      <section className="bg-[#003145]">
        <div className="bg-[#002A3B] p-10 mt-4 mb-10">
          {/* Title */}
          <h1 className="text-3xl mt-6 font-semibold text-white mb-6 text-center">
            Explore Challenges
          </h1>
          {/* Search and Filter Section */}
          <SearchAndFilter
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            selectedStatus={selectedStatus}
            setSelectedStatus={setSelectedStatus}
            selectedLevel={selectedLevel}
            setSelectedLevel={setSelectedLevel}
          />
        </div>

        {/* Hackathon Cards Section */}
        <div className="w-full bg-[#003145] p-10 mb-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-20 p-1 sm:p-10">
            {filteredHackathons.map((hackathon) => (
              <HackathonCard key={hackathon._id} hackathon={hackathon} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default ExploreChallenges;
