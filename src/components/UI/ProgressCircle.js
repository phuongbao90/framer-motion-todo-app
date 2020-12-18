import { motion, useMotionTemplate } from "framer-motion";
import Portrait from "assets/images/8.jpg";
// import styled from "styled-components";

const ProgressCircle = ({
  percents = 20,
  strokeWidth = 6,
  delay = 0.4,
  duration = 1,
  emptyStrokeOpacity = 0.25,
  emptyStroke = "#e2e2e2",
  radius = "45",
  stroke = "#d53f8c",
  isSidebarOpen,
}) => {
  const circumference = Math.ceil(2 * Math.PI * radius);
  const fillPercents = Math.abs(
    Math.ceil((circumference / 100) * (percents - 100))
  );

  const variants = {
    hidden: {
      strokeDashoffset: circumference,
      transition: {},
    },
    visible: {
      strokeDashoffset: fillPercents,

      transition: {
        duration,
        delay,
      },
    },
  };

  return (
    <div className="relative h-full w-full">
      <div className="absolute h-full w-full">
        <img
          src={Portrait}
          alt="Portrait"
          className="object-cover h-full w-full rounded-full p-3"
        />
      </div>
      <div className="absolute">
        <svg
          viewBox="0 0 100 100"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
        >
          <circle
            cx="50"
            cy="50"
            r={radius}
            className="circle"
            strokeWidth={strokeWidth}
            stroke={emptyStroke}
            strokeOpacity={emptyStrokeOpacity}
            fill="transparent"
          />
        </svg>
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full"
          style={{
            position: "absolute",
            transform: "rotate(-90deg)",
            overflow: "visible",
            top: 0,
            filter: `drop-shadow(0 0 10px ${stroke})`,
          }}
        >
          <motion.circle
            cx="50"
            cy="50"
            r={radius}
            strokeWidth={strokeWidth}
            stroke={stroke}
            fill="transparent"
            strokeDashoffset={fillPercents}
            strokeDasharray={circumference}
            variants={variants}
            initial="hidden"
            animate={`${isSidebarOpen ? "visible" : "hidden"}`}
          />
        </svg>
      </div>
    </div>
  );
};

export default ProgressCircle;
