import LayoutComponent from "@/components/layout";
import { InvestigationsProvider } from "@/contexts";

export default function LayoutPage({ children }) {
  return (
    <InvestigationsProvider>
      <LayoutComponent>{children}</LayoutComponent>;
    </InvestigationsProvider>
  );
}
