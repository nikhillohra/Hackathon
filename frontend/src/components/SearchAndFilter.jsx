import React, { useState } from "react";
import { FaAngleUp, FaAngleDown } from "react-icons/fa";
import { IoIosCloseCircle } from "react-icons/io";

const SearchAndFilter = ({
  searchTerm,
  setSearchTerm,
  selectedStatus,
  setSelectedStatus,
  selectedLevel,
  setSelectedLevel,
}) => {
  const [showFilters, setShowFilters] = useState(false);

  // Handle checkbox changes for status
  const handleStatusChange = (e) => {
    const { value, checked } = e.target;
    if (value !== "All") {
      const updatedStatus = checked
        ? [...selectedStatus, value]
        : selectedStatus.filter((status) => status !== value);
      setSelectedStatus(updatedStatus);
    }
  };

  // Handle checkbox changes for level
  const handleLevelChange = (e) => {
    const { value, checked } = e.target;
    if (value !== "All") {
      const updatedLevel = checked
        ? [...selectedLevel, value]
        : selectedLevel.filter((level) => level !== value);
      setSelectedLevel(updatedLevel);
    }
  };

  // Remove selected filter
  const removeFilter = (filter, type) => {
    if (type === "status") {
      setSelectedStatus(selectedStatus.filter((status) => status !== filter));
    } else {
      setSelectedLevel(selectedLevel.filter((level) => level !== filter));
    }
  };

  return (
    <div className="relative flex flex-col justify-center items-center gap-4 mb-8">
      {/* Search Bar */}
      <div className="flex justify-center w-full">
        <input
          type="text"
          className="border border-gray-300 rounded-lg py-2 px-4 w-3/4"
          placeholder="Search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        {/* Button toggle filters */}
        <button
          className="ml-4 flex items-center justify-center gap-1 bg-gray-100 text-black px-4 py-2 rounded-lg"
          onClick={() => setShowFilters(!showFilters)} // Toggle filter visibility
        >
          Filter {showFilters ? <FaAngleUp /> : <FaAngleDown />}
        </button>
      </div>

      {/* Selected Filters Chips */}
      <div className="flex gap-2 mt-2 flex-wrap">
        {selectedStatus.map((status) => (
          <div
            key={status}
            className="flex items-center justify-center bg-[#F8F9FD7D] text-white px-3 py-1 rounded-full"
          >
            {status}
            <button
              className="flex items-center justify-center p-2"
              onClick={() => removeFilter(status, "status")}
            >
              <IoIosCloseCircle className="w-4 h-4" />
            </button>
          </div>
        ))}
        {selectedLevel.map((level) => (
          <div
            key={level}
            className="flex items-center justify-center bg-[#F8F9FD7D] text-white px-3 py-1 rounded-full"
          >
            {level}
            <button
              className="flex items-center justify-center p-2"
              onClick={() => removeFilter(level, "level")}
            >
              <IoIosCloseCircle className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>

      {/* Filter Section */}
      {showFilters && (
        <div className="absolute top-12 right-0 z-50 flex flex-col p-4 rounded gap-4 bg-white shadow-lg w-64">
          {/* Status Filter */}
          <div className="flex flex-col">
            <h3 className="text-gray-500">Status</h3>
            <span className="bg-[#ECECEC] w-full h-[1px] my-2"></span>
            <label className="text-gray-400 p-1 flex gap-1">
              <input
                type="checkbox"
                value="All"
                checked={false} 
                onChange={() => {}}
              />
              All
            </label>
            <label className="text-gray-400 p-1 flex gap-1">
              <input
                type="checkbox"
                value="Active"
                checked={selectedStatus.includes("Active")}
                onChange={handleStatusChange}
              />
              Active
            </label>
            <label className="text-gray-400 p-1 flex gap-1">
              <input
                type="checkbox"
                value="Upcoming"
                checked={selectedStatus.includes("Upcoming")}
                onChange={handleStatusChange}
              />
              Upcoming
            </label>
            <label className="text-gray-400 p-1 flex gap-1">
              <input
                type="checkbox"
                value="Past"
                checked={selectedStatus.includes("Past")}
                onChange={handleStatusChange}
              />
              Past
            </label>
          </div>

          <span className="bg-[#ECECEC] w-full h-[1px]"></span>

          {/* Level Filter */}
          <div className="flex flex-col">
            <h3 className="text-gray-500">Level</h3>
            <label className="text-gray-400 p-1 flex gap-1">
              <input
                type="checkbox"
                value="easy"
                checked={selectedLevel.includes("easy")}
                onChange={handleLevelChange}
              />
              Easy
            </label>
            <label className="text-gray-400 p-1 flex gap-1">
              <input
                type="checkbox"
                value="medium"
                checked={selectedLevel.includes("medium")}
                onChange={handleLevelChange}
              />
              Medium
            </label>
            <label className="text-gray-400 p-1 flex gap-1">
              <input
                type="checkbox"
                value="hard"
                checked={selectedLevel.includes("hard")}
                onChange={handleLevelChange}
              />
              Hard
            </label>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchAndFilter;
