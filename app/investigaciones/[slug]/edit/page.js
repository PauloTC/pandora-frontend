import { InvestigationForm } from "@/components/Investigations/InvestigationForm";

export default async function EditInvestigationPage({ params }) {
  return (
    <>
      <InvestigationForm title="Editar investigación" params={params} />
    </>
  );
}
