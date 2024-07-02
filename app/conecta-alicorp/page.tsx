import Hero from '@/components/hero';
import HowPart from '@/components/how-part';
import FrequentQuestions from '@/components/frequent-questions';
import Benefits from '@/components/benefits';

export default function CostumersPage() {
  return (
    <>
      <Hero />
      <HowPart />
      <Benefits />
      <FrequentQuestions />

      <footer className="bg-red-400 text-white p-6 text-base text-center xl:text-xl">
        © 2024 Made with <span>&#9829;</span> by the Design & Experience Team
      </footer>
    </>
  );
}
