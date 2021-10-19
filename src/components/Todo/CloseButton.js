import { motion } from "framer-motion";
import styled from "styled-components";
// import { VariantCloseButton } from "components/Todo/variants";
import { FiX } from "react-icons/fi";
import { useHistory } from "react-router-dom";
import { useTodoDispatch } from "contexts/Todo";
// import { v4 as uuidv4 } from "uuid";
// import { format, add } from "date-fns";
// import { useTodoState } from "contexts/Todo";

const StyledCloseButton = styled(motion.button)`
  position: absolute;
  top: 7%;
  right: 10%;
  border-radius: 50%;
  border: 3px solid ${({ theme }) => theme.editIconBorderColor};
  color: ${({ theme }) => theme.editIconColor};
  padding: 10px;
  z-index: 10;

  &:active,
  &:focus {
    outline: none;
  }
`;

const CloseButton = ({ variants, setCreating, isCreating }) => {
  const history = useHistory();
  const dispatch = useTodoDispatch();

  const handleClose = () => {
    // console.log("run handleClose");
    dispatch({
      type: "DESELECTED",
    });

    if (isCreating) {
      setCreating(false);
    }
    history.push("/");
  };

  return (
    <StyledCloseButton
      initial={variants.actions.initial}
      animate={variants.actions.animate}
      exit={variants.actions.exit}
      onClick={() => {
        handleClose();
      }}
    >
      <FiX className="text-2xl" />
    </StyledCloseButton>
  );
};

export default CloseButton;
