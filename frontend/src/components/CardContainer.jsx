import React from 'react';

const CardContainer = ({ title, details, image }) => {
  return (
    <div className="bg-[#F8F9FD] shadow-md rounded-lg p-6 md:p-10 flex flex-col items-center md:items-start  md:text-start w-[8] sm:w-[40%]">
      <img src={image} alt={title} className="w-14 h-14  mb-4 flex" />
      <h3 className="font-semibold md:text-lg text-base mb-2">{title}</h3>
      <p className="text-gray-600 text-center md:text-start">{details}</p>
    </div>
  );
};

export default CardContainer;
