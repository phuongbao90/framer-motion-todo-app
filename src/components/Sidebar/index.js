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
  background: ${(props) => props.theme.sidebarBackground};
  color: ${(props) => props.theme.sidebarTextColor};
  z-index: 0;
  border-radius: 2.5rem;
  border-color: transparent;
  .icon {
    color: ${(props) => props.theme.sidebarIconColor};
  }
  .rating {
    color: ${(props) => props.theme.textColorSecondaryDark};
  }
  grid-area: 1 / 1;
`;

const StyledButton = styled.button`
  position: absolute;
  right: 30%;
  transform: translateX(-50%);
  padding: 9px;
  border-radius: 50%;
  border: 1.5px solid ${({ theme }) => theme.sidebarIconColor};
  cursor: pointer;
  outline: none;
  z-index: 1;
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
      <div className="wrapper h-full pt-20 pb-16 pl-12">
        <StyledButton>
          <FiChevronLeft
            className="text-2xl"
            // onClick={() => setIsSidebarOpen((prev) => !prev)}
            onClick={() => toggleIsSidebarOpen()}
          />
        </StyledButton>
        <div className="flex flex-col h-full pt-10">
          <div className="mb-auto">
            <div className="w-24 h-24 mb-6">
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
                <ul className="space-y-4">
                  <li className="flex items-center space-x-4 text-lg">
                    <div>
                      <FiBookmark className="icon" size="22" />
                    </div>
                    <div>Templates</div>
                  </li>
                  <li className="flex items-center space-x-4 text-lg">
                    <div>
                      <FiArchive className="icon" size="22" />
                    </div>
                    <div>Categories</div>
                  </li>
                  <li className="flex items-center space-x-4 text-lg">
                    <div>
                      <FiBarChart2 className="icon" size="22" />
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
