import SidebarComponent from "@/components/Sidebar";
import HeaderComponent from "@/components/Header";

export default function LayoutPage({ children }) {
  return (
    <>
      <SidebarComponent />
      <div className="p-8 sm:ml-64 relative">
        <HeaderComponent />
        {children}
      </div>
    </>
  );
}
