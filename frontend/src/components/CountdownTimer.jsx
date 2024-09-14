import React, { useState, useEffect } from "react";

const CountdownTimer = ({ endDate }) => {
  const parseEndTime = (endDate) => {
    if (!endDate) {
      console.error("Invalid or missing endDate");
      return null;
    }

    const parsedEndTime = new Date(endDate);
    if (isNaN(parsedEndTime.getTime())) {
      console.error("Invalid date format for endDate:", endDate);
      return null;
    }

    return parsedEndTime;
  };

  const calculateTimeLeft = () => {
    const parsedEndTime = parseEndTime(endDate);
    if (!parsedEndTime) return null;

    const now = new Date();
    const difference = parsedEndTime - now;

    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  }, [endDate]);

  return (
    <div>
      {timeLeft && timeLeft.days >= 0 ? (
        <div className="flex flex-col items-center justify-center">
          <div className="flex gap-4 items-center">
            {/* Days */}
            <div className="flex flex-col items-center">
              <span className="text-2xl font-[500] p-2">{timeLeft.days}</span>
              <span className="text-sm">Days</span>
            </div>

            {/* Colon */}
            <span className="text-2xl font-[500] p-2 mb-6">:</span>

            {/* Hours */}
            <div className="flex flex-col items-center">
              <span className="text-2xl font-[500] p-2">{timeLeft.hours}</span>
              <span className="text-sm">Hours</span>
            </div>

            {/* Colon */}
            <span className="text-2xl font-[500] p-2  mb-6">:</span>

            {/* Minutes */}
            <div className="flex flex-col items-center">
              <span className="text-2xl font-[500] p-2">
                {timeLeft.minutes}
              </span>
              <span className="text-sm">Minutes</span>
            </div>
          </div>
        </div>
      ) : (
        <div>Countdown finished!</div>
      )}
    </div>
  );
};

export default CountdownTimer;
