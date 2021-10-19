import styled from "styled-components";
import { motion } from "framer-motion";
import { FiPlus } from "react-icons/fi";
import { ELEVATIONS } from "utils/CONSTANTS";

const StyledButton = styled(motion.button)`
  --shadow-color: 220deg 60% 50%;
  box-shadow: ${ELEVATIONS.large};
  padding: 18px;
  border-radius: 50%;
  background: ${({ theme }) => theme.buttonBackground};
  color: white;
  position: fixed;
  right: calc(((100% - 25rem) / 2) + 1.5rem);
  bottom: calc(((100% - 48.75rem) / 2) + 1.5rem);
  z-index: 11;
  outline: none;

  &:focus {
    outline: none;
  }
`;

const AddTodoButton = ({ setCreating }) => {
  function handleClick() {
    setCreating(true);
  }

  return (
    <>
      <StyledButton
        initial="visible"
        onClick={() => {
          handleClick();
        }}
      >
        <FiPlus className="text-2xl" />
      </StyledButton>
    </>
  );
};

export default AddTodoButton;
