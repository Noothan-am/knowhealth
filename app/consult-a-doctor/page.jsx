import { Video, Building } from 'lucide-react'
import Image from 'next/image'

export default function ConsultDoctor() {
  return (
    <div className="bg-gray-100">
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">Consult a Doctor</h1>

        <div className="flex flex-col md:flex-row gap-8 mb-12">
          <div className="flex-1 bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6">
              <div className="flex items-center justify-center mb-4">
                <Video className="w-12 h-12 text-[#98c964]" />
              </div>
              <h2 className="text-2xl font-semibold text-center mb-4">Online Consultation</h2>
              <p className="text-gray-600 text-center mb-6">
                Connect with our expert doctors from the comfort of your home. Get medical advice, prescriptions, and follow-ups online.
              </p>
              <button className="w-full bg-[#98c964] text-white py-3 rounded-md hover:bg-[#7ab94e] transition duration-300">
                Book Online Consultation
              </button>
            </div>
          </div>

          <div className="flex-1 bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6">
              <div className="flex items-center justify-center mb-4">
                <Building className="w-12 h-12 text-[#336666]" />
              </div>
              <h2 className="text-2xl font-semibold text-center mb-4">In-Clinic Consultation</h2>
              <p className="text-gray-600 text-center mb-6">
                Visit our state-of-the-art clinics for a face-to-face consultation with our experienced doctors.
              </p>
              <button className="w-full bg-[#336666] text-white py-3 rounded-md hover:bg-[#264d4d] transition duration-300">
                Book In-Clinic Appointment
              </button>
            </div>
          </div>
        </div>

        <section className="mb-12 relative">
          <h2 className="text-2xl font-semibold mb-6 text-center">Our Top Specialists</h2>
          <div className="overflow-hidden">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((index) => (
                <div key={index} className="w-full flex-shrink-0">
                  <Image
                    src={`/placeholder.svg?height=300&width=800&text=Doctor+${index}`}
                    alt={`Doctor ${index}`}
                    width={800}
                    height={300}
                    className="w-full object-cover rounded-lg"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}