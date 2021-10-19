import styled, { css } from "styled-components";
import TextareaAutosize from "react-autosize-textarea";
import { motion } from "framer-motion";
import { useHistory } from "react-router-dom";
import { useRef, useState } from "react";
import NewTaskButton from "components/Todo/UpdateTaskButton";
import CloseButton from "components/Todo/CloseButton";
import Options from "components/Todo/Options";
import {
  TODO_CONTENT_OPEN_DURATION,
  TODO_CONTENT_OPEN_DELAY,
  TODO_CONTENT_CLOSE_DELAY,
  // TODO_CONTENT_CLOSE_DURATION,
} from "utils/CONSTANTS";
import { useTodoDispatch } from "contexts/Todo";

const StyledTodoContainer = styled(motion.div)`
  pointer-events: auto;
  overflow: hidden;
  width: 100%;
  height: 100%;
  margin: 0 auto;
  color: white;
`;

const StyledTodoContent = styled(motion.form)`
  background: transparent;
  .todo {
    color: ${({ theme }) => theme.textColorPrimary};
  }
`;

const StyledCheckboxWrapper = styled(motion.span)`
  display: flex;
  align-items: center;
  margin-right: 10px;

  > input {
    width: 30px;
    height: 30px;
    opacity: 0;
    position: absolute;
    z-index: 2;
    cursor: pointer;
  }

  > input:checked + .checkbox__control svg {
    transform: scale(0.5);
  }

  > input:checked + .checkbox__control {
    background: ${({ theme }) => theme.checkboxBackground};
  }

  input:focus + .checkbox__control {
    box-shadow: 0 0 0 0.05em #fff, 0 0 0.15em 0.1em currentColor;
  }
`;

const StyledCheckbox = styled(motion.span)`
  display: inline-grid;
  width: 30px;
  height: 30px;
  color: white;
  outline: none;
  ${({ isSelected }) =>
    isSelected &&
    css`
      display: none;
    `}

  svg {
    transition: transform 0.1s ease-in 25ms;
    transform: scale(0);
    transform-origin: center;
  }
`;

const TodoContent = ({
  content,
  isSelected,
  id,
  isDragged,
  // isEditing = true,
}) => {
  const history = useHistory();
  const TodoContentRef = useRef();
  const dispatch = useTodoDispatch();
  const [isCalendarOpen, setCalendarOpen] = useState(false);

  const [formData, setFormData] = useState({
    content,
    dueDate: null,
    category: null,
  });

  async function handleTap() {
    // e, info
    if (!isSelected && !isDragged) {
      await history.push(`/${id}`);
    }
  }

  function handleUpdate(e) {
    setFormData((data) => ({
      ...data,
      [e.target.name]: e.target.value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    // console.log(id);

    await dispatch({
      type: "update",
      payload: {
        id,
        // ...formData,
        content: formData.content,
      },
    });
    history.push("/");
  }

  return (
    <>
      <StyledTodoContainer
        ref={TodoContentRef}
        className="StyledContent relative"
        transition={{
          duration: TODO_CONTENT_OPEN_DURATION,
          delay: isSelected
            ? TODO_CONTENT_OPEN_DELAY
            : TODO_CONTENT_CLOSE_DELAY,
        }}
      >
        <CloseButton
          isSelected={isSelected}
          setCalendarOpen={setCalendarOpen}
        />
        <StyledTodoContent
          // <form></form>
          className="px-5 py-4"
          isSelected={isSelected}
          onSubmit={handleSubmit}
        >
          <motion.label
            // layout
            htmlFor={id}
            style={{
              position: isSelected ? "absolute" : "relative",
              transform: isSelected ? "translateY(-50%)" : "none",
              top: isSelected ? "35%" : "inherit",
              display: "flex",
              // alignItems: "center",
              width: isSelected ? "85%" : "100%",
            }}
            // className={`${isSelected ? "" : "transform-none"}`}
          >
            <StyledCheckboxWrapper className="checkbox__input">
              <input type="checkbox" name="checkbox" id={id} />
              <StyledCheckbox
                // layout
                className={`checkbox__control border-2 border-solid`}
                isSelected={isSelected}
                style={{
                  borderRadius: "15px",
                }}
                animate={{
                  opacity: isSelected ? 0 : [0, 1],
                }}
                transition={{
                  duration: 0.3,
                  delay: isSelected ? 0 : TODO_CONTENT_CLOSE_DELAY,
                }}
              >
                <motion.svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  focusable="false"
                >
                  <motion.path
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    d="M1.73 12.91l6.37 6.37L22.79 4.59"
                  />
                </motion.svg>
              </StyledCheckbox>
            </StyledCheckboxWrapper>
            <motion.div
              layout
              className={`checkbox__label cursor-pointer w-full transform-none`}
              initial={false}
              onTap={handleTap}
              transition={{
                duration: isSelected ? TODO_CONTENT_OPEN_DURATION : 0.4,
                delay: isSelected ? 0 : 0,
              }}
            >
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae,
              maxime.
              {/* <TextareaAutosize
                className={`font-semibold todo bg-transparent resize-none w-full outline-none cursor-pointer`}
                value={formData.content}
                disabled={!isSelected ? true : false}
                placeholder="write something here"
                selected={false}
                onChange={handleUpdate}
                name="content"
              /> */}
            </motion.div>
          </motion.label>

          <Options
            isSelected={isSelected}
            isCalendarOpen={isCalendarOpen}
            setCalendarOpen={setCalendarOpen}
          />
          <NewTaskButton isSelected={isSelected} />
        </StyledTodoContent>
      </StyledTodoContainer>
    </>
  );
};

export default TodoContent;
