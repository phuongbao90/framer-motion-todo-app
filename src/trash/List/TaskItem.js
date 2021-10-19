import styled from "styled-components";
import { motion } from "framer-motion";
// import { Link, useHistory } from "react-router-dom";

const StyledContent = styled(motion.div)`
  pointer-events: auto;
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 100%;
  margin: 0 auto;
  /* color: white; */
`;

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
  outline: none;

  svg {
    transition: transform 0.1s ease-in 25ms;
    transform: scale(0);
    transform-origin: center;
  }
`;

const TaskItem = ({
  content,
  // isSelected,
  // id,
  // isDragged,
}) => {
  // const history = useHistory();
  return (
    <>
      <StyledContent className="StyledContent">
        <StyledForm className="px-5 py-3">
          <StyledCheckbox htmlFor="">
            <StyledInput className="checkbox__input">
              <input type="checkbox" name="checkbox" id="" />
              <StyledControl
                className={`checkbox__control border-2 border-solid`}
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
              // onClick={() => {
              //   if (!isSelected && !isDragged) {
              //     history.push(`/${id}`);
              //   }
              // }}
            >
              {content}
            </motion.span>
          </StyledCheckbox>
        </StyledForm>
      </StyledContent>
    </>
  );
};

export default TaskItem;
