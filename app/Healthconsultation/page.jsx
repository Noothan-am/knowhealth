import Banner from "@/app/Healthconsultation/Banner";
import SpecialistsSection from "@/app/Healthconsultation/SpecialistsSection";
import HealthConcernsSection from "@/app/Healthconsultation/HealthConcernsSection";

export default function Page() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Banner />
      <SpecialistsSection />
      <HealthConcernsSection />
    </div>
  );
}
