import SidebarComponent from "@/components/Sidebar";
import HeaderComponent from "@/components/Header";
import { ExperimentsContext } from "@/contexts";

export default function LayoutPage({ children }) {
  return (
    <>
      {/* <ExperimentsContext> */}
      <SidebarComponent />
      <div className="p-8 sm:ml-64 relative">
        <HeaderComponent />
        {children}
      </div>
      {/* </ExperimentsContext> */}
    </>
  );
}
