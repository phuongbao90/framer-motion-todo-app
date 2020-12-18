import styled from "styled-components";
import React, { useContext } from "react";
import { FiMenu, FiUser, FiSearch, FiMoon, FiSun } from "react-icons/fi";
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
    <StyledNav className="py-6 px-6 fixed w-full">
      <ul className="flex flex-row  ">
        <li className="mr-auto">
          <FiMenu
            className="text-xl cursor-pointer"
            {...(!isSidebarOpen && {
              onClick: () => toggleIsSidebarOpen(),
            })}
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
