import { SecurityFeatures } from "../components/SecurityFeatures";
import { ComparisonMatrix } from "../components/ComparisonMatrix";

export function Platform() {
  return (
    <div className="py-24">
      <section className="relative z-10 w-full">
        <SecurityFeatures />
      </section>
      <section className="relative z-10 w-full mt-32">
        <ComparisonMatrix />
      </section>
    </div>
  );
}
