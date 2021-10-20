// import { useState } from "react";
import styled from "styled-components";
import { FiCalendar } from "react-icons/fi";
import { FaRegDotCircle } from "react-icons/fa";
import { motion } from "framer-motion";

// import { format, add } from "date-fns";

const StyledOptions = styled(motion.div)`
  display: flex;
  justify-content: start;
  position: absolute;
  transform: translateY(-50%);
  top: 53%;
`;

const Icon = styled.span`
  border: 2px solid ${({ theme }) => theme.editIconBorderColor};
  color: ${({ theme }) => theme.editIconColor};
`;

const Options = ({ variants, category = "personal" }) => {
  return (
    <StyledOptions
      initial={variants.actions.initial}
      animate={variants.actions.animate}
      exit={variants.actions.exit}
    >
      <Icon className="flex items-center p-3 rounded-full mr-5 cursor-pointer">
        <span>
          <FiCalendar className="text-2xl" />
        </span>
        <span className="font-bold px-4">Today</span>
      </Icon>
      <Icon className="p-3 rounded-full cursor-pointer">
        <FaRegDotCircle
          color={`${category !== "personal" ? "#066aff" : "#eb06ff"}`}
          className="text-2xl"
        />
      </Icon>
    </StyledOptions>
  );
};

export default Options;
