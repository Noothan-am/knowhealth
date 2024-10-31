import { Button } from "@/components/ui/button"

export default function Banner() {
  return (
    <div className="relative h-[400px] bg-cover bg-center" style={{backgroundImage: "url('/placeholder.svg?height=500&width=1000')"}}>
      <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-start p-8 md:p-16">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Skip the travel!</h1>
        <h2 className="text-2xl md:text-3xl font-semibold text-white mb-4">Take Online Doctor Consultation</h2>
        <p className="text-xl text-white mb-6">Private consultation + Audio call · Starts at just ₹199</p>
        <p className="text-lg text-white mb-6">+112 Doctors are online</p>
        <Button size="lg" className="bg-primary text-white">Consult Now</Button>
      </div>
    </div>
  )
}