import LayoutComponent from "@/components/Layout";
import { InvestigationsProvider } from "@/contexts";

export default function LayoutPage({ children }: any) {
  return (
    <InvestigationsProvider>
      <LayoutComponent>{children}</LayoutComponent>;
    </InvestigationsProvider>
  );
}
