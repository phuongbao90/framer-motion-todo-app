import { ThemeStore } from "contexts/Theme";
import { TodoProvider } from "contexts/Todo";
import { SidebarProvider } from "contexts/Sidebar";
import Theme from "hooks/Theme";

function AppProvider({ children }) {
  return (
    <ThemeStore>
      <Theme>
        <SidebarProvider>
          <TodoProvider>{children}</TodoProvider>
        </SidebarProvider>
      </Theme>
    </ThemeStore>
  );
}

export default AppProvider;
