'use client'
import { useRef } from 'react'
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

const healthConcerns = [
  "Experiencing period problems?",
  "Struggling with anxiety issues?",
  "Having trouble sleeping at night?",
  "Dealing with headaches?",
  "Facing skin problems?",
  "Suffering high blood pressure?",
  "Suffering from digestive issues?",
  "Experiencing back pain?",
  "Feeling depressed?",
  "Managing chronic joint pain?",
]

export default function HealthConcernsSection() {
  const scrollContainerRef = useRef(null)

  const handleScroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === 'left' ? -300 : 300
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' })
    }
  }

  return (
    <div className="py-12 px-4 md:px-8 bg-gray-100">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold mb-2">Common Health Concerns</h2>
            <p className="text-gray-600">Consult a doctor online for any health issue</p>
          </div>
          <Button variant="outline">See all symptoms</Button>
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
            {healthConcerns.map((concern, index) => (
              <div key={index} className="flex-none w-72 bg-white rounded-lg shadow-md overflow-hidden flex flex-col">
                <div className="h-40 bg-gray-300"></div>
                <div className="flex flex-col flex-grow p-4"> 
                  <h3 className="font-semibold mb-2 text-center">{concern}</h3> 
                  <p className="text-sm text-gray-600 mb-2 text-center">Starting from ₹199</p> 
                  <Button className="w-full mt-auto">Consult Now</Button>
                </div>
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
