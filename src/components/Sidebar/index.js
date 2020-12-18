import styled from "styled-components";
import {
  FiBookmark,
  FiArchive,
  FiBarChart2,
  FiChevronLeft,
} from "react-icons/fi";
import Chart from "components/Sidebar/Chart";
import { useSidebar } from "contexts/Sidebar";
import ProgressCircle from "components/UI/ProgressCircle";

const StyledSidebar = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background: ${(props) => props.theme.sidebarBackground};
  color: ${(props) => props.theme.sidebarTextColor};
  z-index: 1;
  .icon {
    color: ${(props) => props.theme.sidebarIconColor};
  }
  .rating {
    color: ${(props) => props.theme.textColorSecondaryDark};
  }
`;

const StyledButton = styled.button`
  position: absolute;
  top: 8%;
  right: 35%;
  padding: 9px;
  border-radius: 50%;
  border: 1.5px solid ${({ theme }) => theme.sidebarIconColor};
  cursor: pointer;
  outline: none;

  &:focus,
  &:active {
    outline: none;
  }
`;

const StyledName = styled.h2`
  max-width: 200px;
`;

const Sidebar = () => {
  const { isSidebarOpen, toggleIsSidebarOpen } = useSidebar();

  return (
    <StyledSidebar className="sidebar">
      <div className="wrapper h-full pt-24 pb-16 pl-10">
        <StyledButton>
          <FiChevronLeft
            className="text-2xl"
            // onClick={() => setIsSidebarOpen((prev) => !prev)}
            onClick={() => toggleIsSidebarOpen()}
          />
        </StyledButton>
        <div className="flex flex-col h-full">
          <div className="mb-auto">
            <div className="w-32 h-32 mb-6">
              <ProgressCircle
                stroke="#d53f8c"
                percents="65"
                isSidebarOpen={isSidebarOpen}
              />
            </div>
            <div className="mb-6">
              <StyledName className="text-4xl font-semibold leading-10">
                Olivia Mitchell
              </StyledName>
            </div>
            <div>
              <nav>
                <ul className="space-y-3">
                  <li className="flex items-center space-x-4 text-lg">
                    <div>
                      <FiBookmark className="icon" />
                    </div>
                    <div>Templates</div>
                  </li>
                  <li className="flex items-center space-x-4 text-lg">
                    <div>
                      <FiArchive className="icon" />
                    </div>
                    <div>Categories</div>
                  </li>
                  <li className="flex items-center space-x-4 text-lg">
                    <div>
                      <FiBarChart2 className="icon" />
                    </div>
                    <div>Analytics</div>
                  </li>
                </ul>
              </nav>
            </div>
          </div>

          <div>
            <div>
              <Chart isSidebarOpen={isSidebarOpen} />
            </div>
            <div className="text-sm font-semibold rating">Good</div>
            <div>
              <h5 className="text-xl font-semibold">Consistancy</h5>
            </div>
          </div>
        </div>
      </div>
    </StyledSidebar>
  );
};

export default Sidebar;
