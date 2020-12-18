import { createContext, useState } from "react";

export const ThemeContext = createContext();

export function ThemeStore({ children }) {
  const [theme, setTheme] = useState("dark");

  const switchTheme = (theme) => setTheme(theme);

  return (
    <ThemeContext.Provider value={{ switchTheme, theme }}>
      {children}
    </ThemeContext.Provider>
  );
}
