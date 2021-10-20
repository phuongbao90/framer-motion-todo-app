import { motion } from "framer-motion";
import styled from "styled-components";
import { VariantCloseButton } from "components/Todo/variants";
import { FiX } from "react-icons/fi";
import { useHistory } from "react-router-dom";
import { useTodoDispatch } from "contexts/Todo";
import { v4 as uuidv4 } from "uuid";
import { format, add } from "date-fns";
import { useTodoState } from "contexts/Todo";

const StyledCloseButton = styled(motion.button)`
  position: absolute;
  top: 5%;
  right: 10%;
  border: 1.5px solid ${({ theme }) => theme.sidebarIconColor};
  border-radius: 50%;
  color: ${({ theme }) => theme.iconColor};
  padding: 9px;

  &:active,
  &:focus {
    outline: none;
  }
`;

const CloseButton = ({ isSelected, setCalendarOpen }) => {
  const history = useHistory();
  const dispatch = useTodoDispatch();
  const { isEditing } = useTodoState();

  const handleClose = () => {
    setCalendarOpen(false);
    if (!isEditing) {
      console.log("run");
      dispatch({
        type: "not_save",
      });
    }

    history.push("/");
  };

  return (
    <StyledCloseButton
      layout
      initial="hidden"
      animate={isSelected ? "visible" : "hidden"}
      variants={VariantCloseButton}
      custom={{
        isSelected,
      }}
      onClick={() => {
        handleClose();
      }}
    >
      <FiX className="text-2xl" />
    </StyledCloseButton>
  );
};

export default CloseButton;
