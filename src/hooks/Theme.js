import React, { useContext } from "react";
import { ThemeProvider, createGlobalStyle } from "styled-components";
import { ThemeContext } from "contexts/Theme";

const themes = {
  light: {
    foreground: "#d9dff9",
    background: "#f9faff",
    sidebarBackground: "#0e1f55",
    sidebarIconColor: "#48598c",
    sidebarTextColor: "#fdfffe",
    listBackground: "#ffffff",
    textColorPrimary: "#343d5d",
    textColorSecondaryDark: "#9b9eb7",
    textColorSecondaryLight: "#b9c1dc",
    iconColor: "#a5aaca",
    buttonBackground: "#066aff",
    checkboxBackground: "#cad8fd",
  },
  dark: {
    foreground: "#97b5fe",
    background: "#3450a1",
    sidebarBackground: "#051956",
    sidebarIconColor: "#2d4181",
    sidebarTextColor: "#fdfffe",
    listBackground: "#051956",
    textColorPrimary: "#eef1fb",
    textColorSecondaryDark: "#6073a9",
    textColorSecondaryLight: "#83a1ed",
    iconColor: "#87a5f2",
    buttonBackground: "#eb06ff",
    checkboxBackground: "#193587",
  },
};

const GlobalStyle = createGlobalStyle`
  
`;

const Theme = ({ children }) => {
  const { theme } = useContext(ThemeContext); // get the current theme ('light' or 'dark')
  return (
    <ThemeProvider theme={themes[theme]}>
      <GlobalStyle />
      {children}
    </ThemeProvider>
  );
};

export default Theme;
