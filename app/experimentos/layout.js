import SidebarComponent from "@/components/Sidebar";
import HeaderComponent from "@/components/Header";
import { ExperimentsProvider } from "@/contexts";

export default function LayoutPage({ children }) {
  return (
    <ExperimentsProvider>
      <SidebarComponent />
      <div className="p-8 sm:ml-64 relative">
        <HeaderComponent type="experiment" />
        {children}
      </div>
    </ExperimentsProvider>
  );
}
