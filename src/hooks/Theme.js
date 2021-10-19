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
    boxShadow: `
    1px 2px 2px hsl(var(--shadow-color) / 0.333),
    2px 4px 4px hsl(var(--shadow-color) / 0.333),
    3px 6px 6px hsl(var(--shadow-color) / 0.333)`,
    shadowColor: `234deg 4% 61%`,
    editIconBorderColor: "#ebedf9",
    closeIconColor: "black",
    editIconColor: "black",
    checkedBgColor: "#cbd8fc",
    lineThrough: "black",
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
    boxShadow: `1px 2px 2px hsl(var(--shadow-color) / 0.2),
    2px 4px 4px hsl(var(--shadow-color) / 0.2),
    4px 8px 8px hsl(var(--shadow-color) / 0.2),
    8px 16px 16px hsl(var(--shadow-color) / 0.2)`,
    shadowColor: `240deg 64% 21%`,
    editIconBorderColor: "#152b66",
    closeIconColor: "#d7def9",
    editIconColor: "#fafeff",
    checkedBgColor: "#173689",
    lineThrough: "white",
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
