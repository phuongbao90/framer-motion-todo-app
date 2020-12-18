import { createContext, useContext, useState } from "react";

const SidebarContext = createContext();

function SidebarProvider({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleIsSidebarOpen = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (
    <SidebarContext.Provider value={{ isSidebarOpen, toggleIsSidebarOpen }}>
      {children}
    </SidebarContext.Provider>
  );
}

function useSidebar() {
  const context = useContext(SidebarContext);
  if (context === undefined) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }
  return context;
}

export { SidebarProvider, useSidebar };
