import { Line } from "rc-progress";
import styled from "styled-components";

const StyledContainer = styled.div`
  min-width: 180px;
  background: ${({ theme }) => theme.listBackground};

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
    <StyledContainer className="wrapper rounded-2xl ml-1 mr-3 my-2 shadow-sm">
      <div className="flex flex-col px-3 pt-5 pb-3">
        <span className="text-sm font-semibold">{count} tasks</span>
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
      </div>
    </StyledContainer>
  );
};

export default CategoryListItem;
