import SidebarComponent from "@/components/Sidebar";
import HeaderComponent from "@/components/Header";

export default function LayoutComponent({ children }) {
  return (
    <>
      <SidebarComponent />
      <div className="p-4 sm:ml-64 relative">
        <HeaderComponent type="investigation" />
        {children}
      </div>
    </>
  );
}
