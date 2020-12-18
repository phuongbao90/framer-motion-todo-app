import styled from "styled-components";
import { motion } from "framer-motion";
import { FiPlus } from "react-icons/fi";

const StyledButton = styled(motion.button)`
  padding: 18px;
  border-radius: 50%;
  background: ${({ theme }) => theme.buttonBackground};
  color: white;
  position: fixed;
  bottom: 30px;
  right: 22px;
  outline: none;
  box-shadow: 0 0 5px ${({ theme }) => theme.buttonBackground},
    0 0 10px ${({ theme }) => theme.buttonBackground};

  &:focus {
    outline: none;
  }
`;

const buttonVariants = {
  visible: {
    zIndex: 3,
  },
  hidden: {
    zIndex: 3,
  },
};

const AddTodoButton = ({ toggleIsAddTodoOpen, isAddTodoOpen }) => {
  return (
    <>
      <StyledButton
        // className="shadow-2xl"
        onClick={() => toggleIsAddTodoOpen()}
        initial="visible"
        animate={isAddTodoOpen ? "hidden" : "visible"}
        variants={buttonVariants}
      >
        <FiPlus className="text-2xl" />
      </StyledButton>
    </>
  );
};

export default AddTodoButton;
