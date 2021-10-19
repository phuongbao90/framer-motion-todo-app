import { Line } from "rc-progress";
import styled from "styled-components";
import { ELEVATIONS } from "utils/CONSTANTS";

const StyledContainer = styled.div`
  width: 195px;
  height: 114px;
  background: ${({ theme }) => theme.listBackground};
  border-radius: 1.4rem;
  /* --shadow-color: 220deg 60% 50%; */
  /* box-shadow: ${ELEVATIONS.medium}; */
  --shadow-color: ${({ theme }) => theme.shadowColor};
  box-shadow: ${({ theme }) => theme.boxShadow};

  span {
    color: ${({ theme }) => theme.textColorSecondaryDark};
  }

  h2 {
    color: ${({ theme }) => theme.textColorPrimary};
  }

  svg {
    text-shadow: 0 0 5px #fff, 0 0 10px #fff, 0 0 15px #0073e6, 0 0 20px #0073e6,
      0 0 25px #0073e6, 0 0 30px #0073e6, 0 0 35px #0073e6;
  }
`;

const CategoryListItem = ({ count, name, percent, stroke }) => {
  return (
    // <StyledContainer className="wrapper px-1 mr-3">
    <StyledContainer className="flex flex-col justify-between px-4 pt-5 pb-3 mr-3 mb-14 cursor-pointer">
      <span className="text-xs mb-1 font-semibold">{count} tasks</span>
      <h2 className="text-xl font-semibold">{name}</h2>
      <span className="mt-4 mb-2">
        <Line
          percent={percent}
          strokeWidth="3"
          strokeColor={stroke}
          trailWidth={3}
          trailColor="#142863"
        />
      </span>
    </StyledContainer>
  );
};

export default CategoryListItem;
