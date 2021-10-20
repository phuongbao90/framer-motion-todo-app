import styled from "styled-components";
import { useState } from "react";
import { motion } from "framer-motion";

const StyledForm = styled.div`
  border-radius: 18px;
  background: ${(props) => props.theme.listBackground};

  .todo {
    color: ${({ theme }) => theme.textColorPrimary};
  }
`;

const StyledCheckbox = styled.label`
  display: flex;
  align-items: center;
`;

const StyledInput = styled.span`
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

const StyledControl = styled.span`
  display: inline-grid;
  /* border: solid pink 2px; */
  width: 30px;
  height: 30px;
  border-radius: 50%;
  color: white;
  outline: "none";

  svg {
    transition: transform 0.1s ease-in 25ms;
    transform: scale(0);
    transform-origin: center;
  }
`;

const variants = {
  checked: {
    // opacity: 1,
    textDecoration: "line-through",
    transition: { ease: "easeOut", duration: 2 },
  },
  unchecked: {
    // opacity: 0,
    textDecoration: "none",
  },
};

const TaskListItem = ({ content, category, created_at }) => {
  const [isChecked, setIsChecked] = useState(false);

  return (
    <StyledForm className="px-5 py-3">
      <StyledCheckbox htmlFor="">
        <StyledInput
          className="checkbox__input"
          onClick={() => setIsChecked((prev) => !prev)}
        >
          <input type="checkbox" name="checkbox" id="" />
          <StyledControl
            className={`checkbox__control border-2 border-solid`}
            style={{
              borderColor: isChecked
                ? "transparent"
                : category === "business"
                ? "#eb06ff"
                : "#066aff",
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              aria-hidden="true"
              focusable="false"
              className="transform scale-0"
            >
              <path
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                d="M1.73 12.91l6.37 6.37L22.79 4.59"
              />
            </svg>
          </StyledControl>
        </StyledInput>
        <motion.span
          className={`checkbox__label leading-6 text-base font-semibold todo`}
          initial="unchecked"
          animate={isChecked ? "checked" : "unchecked"}
          variants={variants}
        >
          {content}
        </motion.span>
      </StyledCheckbox>
    </StyledForm>
  );
};

export default TaskListItem;
