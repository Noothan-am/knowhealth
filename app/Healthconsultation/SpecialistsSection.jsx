'use client'
import { useRef } from 'react'
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

const specialists = [
  { name: "Ayurvedic Specialist", description: "Uses natural treatments and herbal medicine based on Ayurveda principles for holistic health." },
  { name: "Cardiologist", description: "Treats heart and blood vessel diseases, managing cardiovascular health." },
  { name: "Dermatologist", description: "Manages skin, hair, and nail health, including conditions and cosmetic treatments." },
  { name: "Endocrinologist", description: "Treats hormonal imbalances and gland disorders like diabetes and thyroid issues." },
  { name: "Gastroenterologist", description: "Focuses on digestive system disorders, from the stomach to the liver." },
  { name: "Neurologist", description: "Diagnoses and treats nervous system disorders, including the brain and spinal cord." },
  { name: "Oncologist", description: "Specializes in diagnosing and treating various types of cancer." },
  { name: "Orthopedic Specialist", description: "Treats bones, joints, and muscular issues, including fractures and arthritis." },
  { name: "Pediatrician", description: "Provides medical care specifically for infants, children, and adolescents." },
  { name: "Psychiatrist", description: "Manages mental health disorders, providing therapy and prescribing medications." },
  { name: "Pulmonologist", description: "Treats lung and respiratory system issues, like asthma and COPD." },
  { name: "Nephrologist", description: "Specializes in kidney health, managing diseases like chronic kidney disease." },
  { name: "Hematologist", description: "Focuses on blood-related conditions, such as anemia and blood cancers." },
  { name: "Immunologist", description: "Treats immune system disorders, including allergies and autoimmune diseases." },
  { name: "Rheumatologist", description: "Manages autoimmune and inflammatory diseases affecting joints and muscles." },
  { name: "Urologist", description: "Treats urinary tract issues and male reproductive health concerns." },
  { name: "Ophthalmologist", description: "Specializes in eye health, performing eye exams, surgery, and treating eye diseases." },
  { name: "Obstetrician", description: "Cares for pregnant women, handling childbirth and prenatal health." },
  { name: "Gynecologist", description: "Focuses on female reproductive health, including menstrual, hormonal, and fertility issues." },
  { name: "ENT Specialist", description: "Treats ear, nose, and throat issues, including hearing loss and sinusitis." },
  { name: "Sexologist", description: "Addresses sexual health concerns, including dysfunction, intimacy issues, and sexual well-being." },
]

export default function SpecialistsSection() {
  const scrollContainerRef = useRef(null)

  const handleScroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === 'left' ? -300 : 300
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' })
    }
  }

  return (
    <div className="py-12 px-4 md:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold mb-2">20+ Specialities</h2>
            <p className="text-gray-600">Consult with top doctors across specialities</p>
          </div>
          <Button variant="outline">See all specialists</Button>
        </div>
        <div className="relative">
          <Button 
            variant="outline" 
            className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10"
            onClick={() => handleScroll('left')}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <div 
          ref={scrollContainerRef}
          className="flex overflow-x-auto space-x-4 scrollbar-hide overflow-x-hidden"
          >

            {specialists.map((specialist, index) => (
              <div key={index} className="flex-none w-64 bg-gray-100 rounded-lg p-4">
                <div className="w-16 h-16 bg-gray-300 rounded-full mb-4"></div>
                <h3 className="font-semibold mb-2">{specialist.name}</h3>
                <p className="text-sm text-gray-600">{specialist.description}</p>
              </div>
            ))}
          </div>
          <Button 
            variant="outline" 
            className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10"
            onClick={() => handleScroll('right')}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}