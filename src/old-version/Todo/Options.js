import { useState } from "react";
import styled from "styled-components";
import { FiCalendar } from "react-icons/fi";
import { BiRadioCircleMarked } from "react-icons/bi";
import { VariantTodoOptions } from "components/Todo/variants";
import { motion } from "framer-motion";
import { format, add } from "date-fns";

const StyledOptions = styled(motion.div)`
  position: absolute;
  transform: translateY(-50%);
  top: 55%;
  width: 100%;
`;

const variants = {
  initial: () => {
    return {
      opacity: 0,
      position: "fixed",
      zIndex: -1,
    };
  },
  hidden: () => {
    return {
      // opacity: 0,
      transitionEnd: {
        display: "none",
      },
    };
  },
  visible: () => {
    return {
      opacity: 1,
      position: "fixed",
      zIndex: 100,
      top: "50%",
      left: 0,
      y: "-50%",
    };
  },
};

const Options = ({ isSelected, isCalendarOpen, setCalendarOpen }) => {
  // const [isCalendarOpen, setCalendarOpen] = useState(false);
  const [selectedDay, setSelectedDay] = useState(null);

  return (
    <StyledOptions
      layout
      className="flex items-center justify-start"
      initial="hidden"
      animate={isSelected ? "visible" : "hidden"}
      variants={VariantTodoOptions}
      custom={{
        isSelected,
      }}
    >
      <span
        className="flex items-center p-3 border-gray-500 border-2 rounded-full mr-5 cursor-pointer"
        onClick={() => setCalendarOpen(true)}
      >
        <span>
          <FiCalendar className="text-2xl" />
        </span>
      </span>
      <span className="p-3 border-gray-500 border-2 rounded-full cursor-pointer">
        <BiRadioCircleMarked className="text-2xl" />
      </span>
      <motion.span
        variants={variants}
        initial="initial"
        animate={isCalendarOpen ? "visible" : "hidden"}
        transition={{
          duration: 0.2,
        }}
      >
        <Calendar
          calendarClassName="responsive-calendar" // added this
          value={selectedDay}
          onChange={(e) => {
            setSelectedDay(e);
            setCalendarOpen(false);
          }}
          shouldHighlightWeekends
        />
      </motion.span>
    </StyledOptions>
  );
};

export default Options;
