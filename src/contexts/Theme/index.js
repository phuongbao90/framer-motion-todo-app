import { createContext, useState } from "react";

export const ThemeContext = createContext();

export function ThemeStore({ children }) {
  const [theme, setTheme] = useState("light");

  const switchTheme = (theme) => setTheme(theme);

  return (
    <ThemeContext.Provider value={{ switchTheme, theme }}>
      {children}
    </ThemeContext.Provider>
  );
}
