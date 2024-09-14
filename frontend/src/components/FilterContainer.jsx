import React, { useState } from 'react';

const FilterContainer = ({ onFilterChange }) => {
  const [selectedStatus, setSelectedStatus] = useState([]);
  const [selectedLevel, setSelectedLevel] = useState([]);

  const handleStatusChange = (e) => {
    const { value, checked } = e.target;
    const updatedStatus = checked
      ? [...selectedStatus, value]
      : selectedStatus.filter((status) => status !== value);
    setSelectedStatus(updatedStatus);
    onFilterChange({ status: updatedStatus, level: selectedLevel });
  };

  const handleLevelChange = (e) => {
    const { value, checked } = e.target;
    const updatedLevel = checked
      ? [...selectedLevel, value]
      : selectedLevel.filter((level) => level !== value);
    setSelectedLevel(updatedLevel);
    onFilterChange({ status: selectedStatus, level: updatedLevel });
  };

  return (
    <div className="filter-container">
      <div>
        <h3>Status</h3>
        <label>
          <input
            type="checkbox"
            value="Active"
            checked={selectedStatus.includes('Active')}
            onChange={handleStatusChange}
          />
          Active
        </label>
        <label>
          <input
            type="checkbox"
            value="Upcoming"
            checked={selectedStatus.includes('Upcoming')}
            onChange={handleStatusChange}
          />
          Upcoming
        </label>
        <label>
          <input
            type="checkbox"
            value="Past"
            checked={selectedStatus.includes('Past')}
            onChange={handleStatusChange}
          />
          Past
        </label>
      </div>

      <div>
        <h3>Level</h3>
        <label>
          <input
            type="checkbox"
            value="easy"
            checked={selectedLevel.includes('easy')}
            onChange={handleLevelChange}
          />
          Easy
        </label>
        <label>
          <input
            type="checkbox"
            value="medium"
            checked={selectedLevel.includes('medium')}
            onChange={handleLevelChange}
          />
          Medium
        </label>
        <label>
          <input
            type="checkbox"
            value="hard"
            checked={selectedLevel.includes('hard')}
            onChange={handleLevelChange}
          />
          Hard
        </label>
      </div>
    </div>
  );
};

export default FilterContainer;
