import styled, { css } from "styled-components";
import { motion } from "framer-motion";
import { useState } from "react";
// import { useHistory } from "react-router-dom";
// import { useTodoDispatch } from "contexts/Todo";
// import TextareaAutosize from "react-autosize-textarea";

const Wrapper = styled(motion.div)`
  pointer-events: auto;
  overflow: hidden;
  display: flex;
  background: white;
  background: ${({ theme }) => theme.listBackground};
  color: ${({ theme }) => theme.textColorPrimary};
  border-radius: 2rem;
  transform: scale(1);
`;

// const StyledCheckboxWrapper = styled.span`
const StyledCheckboxWrapper = styled(motion.span)`
  display: flex;
  align-items: center;

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
    background: ${({ theme }) => theme.checkedBgColor};
    border: 2px solid ${({ theme }) => theme.checkedBgColor};
  }

  input:focus + .checkbox__control {
    box-shadow: 0 0 0 0.05em #fff, 0 0 0.15em 0.1em currentColor;
  }

  label {
    display: inline-grid;
    width: 30px;
    height: 30px;
    color: white;
    outline: none;
    border: 2px solid
      ${({ category }) => (category === "business" ? "#066aff" : "#eb06ff")};

    svg {
      transition: transform 0.1s ease-in 25ms;
      transform: scale(0);
      transform-origin: center;
    }
  }
`;

// const StyledCheckbox = styled.span`
// const StyledCheckbox = styled(motion.label)`
//   display: inline-grid;
//   width: 30px;
//   height: 30px;
//   color: white;
//   outline: none;
//   /* ${({ isSelected }) =>
//     isSelected &&
//     css`
//       display: none;
//     `} */

//   svg {
//     transition: transform 0.1s ease-in 25ms;
//     transform: scale(0);
//     transform-origin: center;
//   }
// `;

const StyledTextWrapper = styled(motion.div)`
  background: ${({ theme }) => theme.listBackground};
  color: ${({ theme }) => theme.textColorPrimary};
`;

const StyledContent = styled.p`
  background-image: linear-gradient(
    transparent calc(100% - 1px),
    ${({ theme }) => theme.lineThrough} -1px
  );
  background-repeat: no-repeat;
  background-size: 0% 100%;
  background-position: 0px -8px;
  transition: background-size 0.4s;

  ${({ isChecked }) =>
    isChecked &&
    css`
      background-size: 100% 100%;
    `}
`;

const TodoContent = ({
  content,
  isSelected,
  id,
  onTap,
  category,
  finished,
  isDragging,
}) => {
  const [isChecked, setChecked] = useState(finished);
  const handleCheck = (e) => {
    e.target.checked ? setChecked(true) : setChecked(false);
  };

  return (
    <>
      <Wrapper
        // fixed issue with random scale when sidebar is toggle
        className={`todo-container ${isDragging && "transform-none"}`}
        layoutId={`todo-container-${id}`}
      >
        <StyledCheckboxWrapper
          layout
          className="checkbox__input pl-4 pr-1"
          category={category}
        >
          <input
            type="checkbox"
            name="checkbox"
            id={id}
            onChange={handleCheck}
            value={isChecked}
            checked={isChecked}
          />
          <motion.label
            className={`checkbox__control rounded-2xl`}
            isSelected={isSelected}
            animate={{
              opacity: isSelected ? 0 : [0, 1],
            }}
            transition={{
              duration: 1.6,
              delay: 0,
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
          </motion.label>
        </StyledCheckboxWrapper>

        <StyledTextWrapper
          className="w-full h-full z-10 py-5 pl-3 pr-4"
          onTap={onTap}
          layoutId={`content-container-${id}`}
        >
          <StyledContent isChecked={isChecked} className={`inline`}>
            {content}
          </StyledContent>
        </StyledTextWrapper>
      </Wrapper>
    </>
  );
};

export default TodoContent;
