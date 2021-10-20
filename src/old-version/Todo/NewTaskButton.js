import styled from "styled-components";
import { motion } from "framer-motion";
import { FiChevronUp } from "react-icons/fi";
import { useHistory } from "react-router-dom";

const VariantNewTaskButton = {
  visible: ({ isSelected }) => {
    if (isSelected) {
      return {
        opacity: [0, 1],
        display: "flex",
        transition: {
          duration: 0,
          delay: 0,
        },
      };
    }
  },
  hidden: () => {
    return {
      opacity: 0,
      display: "none",
      transition: {
        duration: 0,
        delay: 0,
      },
    };
  },
};

const StyledAddTodoButton = styled(motion.button)`
  position: absolute;
  bottom: 5%;
  right: 10%;
  display: flex;
  align-items: center;
  padding: 11px 24px;
  background: ${({ theme }) => theme.buttonBackground};
  box-shadow: 0 0 5px ${({ theme }) => theme.buttonBackground},
    0 0 10px ${({ theme }) => theme.buttonBackground};
  color: white;
  border-radius: 20px;

  &:active,
  &:focus {
    outline: none;
  }
`;

const NewTaskButton = ({ isSelected }) => {
  const history = useHistory();

  return (
    <StyledAddTodoButton
      layout
      type="submit"
      initial="hidden"
      animate={isSelected ? "visible" : "hidden"}
      variants={VariantNewTaskButton}
      custom={{
        isSelected,
      }}
    >
      <span className="mr-3 text-md">Update</span>
      <span>
        <FiChevronUp />
      </span>
    </StyledAddTodoButton>
  );
};

export default NewTaskButton;
