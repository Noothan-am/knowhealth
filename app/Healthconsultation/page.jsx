import Banner from './Banner'
import SpecialistsSection from './SpecialistsSection'
import HealthConcernsSection from './HealthConcernsSection'

export default function Page() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Banner />
      <SpecialistsSection />
      <HealthConcernsSection />
    </div>
  )
}