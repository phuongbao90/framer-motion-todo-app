import styled, { css } from "styled-components";
import { motion } from "framer-motion";
import { FiChevronUp } from "react-icons/fi";
import { useHistory } from "react-router-dom";
import { useTodoDispatch } from "contexts/Todo";
import { format, add } from "date-fns";
import { ELEVATIONS } from "utils/CONSTANTS";

// const ELEVATIONS = {
//   small: `
//     0.5px 1px 1px hsl(var(--shadow-color) / 0.7)
//   `,
//   medium: `
//     1px 2px 2px hsl(var(--shadow-color) / 0.333),
//     2px 4px 4px hsl(var(--shadow-color) / 0.333),
//     3px 6px 6px hsl(var(--shadow-color) / 0.333)
//   `,
//   large: `
//     1px 2px 2px hsl(var(--shadow-color) / 0.2),
//     2px 4px 4px hsl(var(--shadow-color) / 0.2),
//     4px 8px 8px hsl(var(--shadow-color) / 0.2),
//     8px 16px 16px hsl(var(--shadow-color) / 0.2),
//     16px 32px 32px hsl(var(--shadow-color) / 0.2)
//   `,
// };

const StyledAddTodoButton = styled(motion.button)`
  --shadow-color: 220deg 60% 50%;
  box-shadow: ${ELEVATIONS.large};
  position: absolute;
  bottom: 5%;
  right: 10%;
  display: flex;
  align-items: center;
  padding: 15px 34px;
  color: white;
  border-radius: 30px;
  &:active,
  &:focus {
    outline: none;
  }

  ${({ disabled }) => {
    if (disabled) {
      return css`
        background-color: #808588;
      `;
    } else {
      return css`
        background-color: ${({ theme }) => theme.buttonBackground};
      `;
    }
  }}
`;

const UpdateTaskButton = ({
  variants,
  id,
  content,
  isEditing,
  setCreating,
}) => {
  const history = useHistory();
  const dispatch = useTodoDispatch();

  return (
    <StyledAddTodoButton
      initial={variants.actions.initial}
      animate={variants.actions.animate}
      exit={variants.actions.exit}
      disabled={content.trim().length >= 5 ? false : true}
      onClick={() => {
        if (isEditing) {
          dispatch({
            type: "UPDATE",
            payload: {
              id,
              content,
            },
          });
        } else {
          setCreating(false);
          dispatch({
            type: "CREATE",
            payload: {
              id,
              category: "personal",
              dueDate: format(
                add(new Date(), { days: 7 }),
                "dd/MM/yyyy HH:mm:ss"
              ),
              content: content,
              created_at: format(new Date(), "dd/MM/yyyy HH:mm:ss"),
              finished: false,
              active: true,
            },
          });
        }
        history.push("/");
      }}
    >
      <span className="mr-3 text-md font-bold">
        {isEditing ? "Update task" : "New task"}
      </span>
      <span>
        <FiChevronUp size={26} />
      </span>
    </StyledAddTodoButton>
  );
};

export default UpdateTaskButton;
