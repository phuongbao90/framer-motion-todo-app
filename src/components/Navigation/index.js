import styled from "styled-components";
import React, { useContext } from "react";
import { FiUser, FiSearch, FiMoon, FiSun } from "react-icons/fi";

import { HiOutlineMenuAlt4 } from "react-icons/hi";
import { ThemeContext } from "contexts/Theme";
import { useSidebar } from "contexts/Sidebar";

const StyledNav = styled.nav`
  color: ${({ theme }) => theme.iconColor};
  background: ${({ theme }) => theme.background};
  z-index: 3;
`;

export default function Navigation() {
  const { theme, switchTheme } = useContext(ThemeContext);
  const { isSidebarOpen, toggleIsSidebarOpen } = useSidebar();

  return (
    <StyledNav className="pt-14 pb-2 px-8 w-full">
      <ul className="flex flex-row  ">
        <li className="mr-auto">
          <HiOutlineMenuAlt4
            className="text-xl cursor-pointer"
            {...(!isSidebarOpen && {
              onClick: () => toggleIsSidebarOpen(),
            })}
            size={26}
          />
        </li>

        <li className="mr-6">
          <FiSearch className="text-xl cursor-pointer" />
        </li>
        <li className="mr-6">
          <FiUser className="text-xl cursor-pointer" />
        </li>
        <li>
          <span>
            {theme === "dark" ? (
              <FiSun
                className="text-xl cursor-pointer"
                onClick={() => switchTheme("light")}
              />
            ) : (
              <FiMoon
                className="text-xl cursor-pointer"
                onClick={() => switchTheme("dark")}
              />
            )}
          </span>
        </li>
      </ul>
    </StyledNav>
  );
}
