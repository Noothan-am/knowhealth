import { Button } from "@/components/ui/button";
import Image from "next/image";

const AboutUs = () => {
  return (
    <div className="flex flex-col px-3 bg-white max-w-screen-xl my-5 m-auto min-h-screen">
      <main className="flex-grow">
        <section className="relative bg-blue-600 text-white py-20">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              About HealthCare Partners
            </h1>
            <p className="text-xl mb-8">
              Committed to Your Health and Well-being
            </p>
          </div>
          <div
            className="absolute bottom-0 left-0 right-0 h-16 bg-white"
            style={{ clipPath: "polygon(0 100%, 100% 0, 100% 100%)" }}
          ></div>
        </section>

        <section className="bg-white py-16">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 mb-8 md:mb-0">
                <Image
                  src="/placeholder.svg?height=400&width=600"
                  alt="Medical team"
                  width={600}
                  height={400}
                  className="rounded-lg shadow-lg"
                />
              </div>
              <div className="md:w-1/2 md:pl-8">
                <h2 className="text-3xl font-semibold mb-4">
                  Welcome to HealthCare Partners
                </h2>
                <p className="text-gray-600 mb-4">
                  For over 25 years, HealthCare Partners has been providing
                  exceptional medical care to our community. Our team of
                  experienced doctors, nurses, and staff are dedicated to
                  delivering personalized, compassionate care to every patient.
                </p>
                <p className="text-gray-600 mb-4">
                  We combine cutting-edge medical technology with a warm,
                  patient-centered approach to ensure the best possible outcomes
                  for our patients.
                </p>
                <Button>Learn More About Our Services</Button>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-gray-100 bg-white py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-semibold mb-8 text-center">
              Our Key Staff
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  name: "Dr. Emily Chen",
                  role: "Chief Medical Officer",
                  image: "/placeholder.svg?height=300&width=300",
                },
                {
                  name: "Dr. Michael Johnson",
                  role: "Head of Pediatrics",
                  image: "/placeholder.svg?height=300&width=300",
                },
                {
                  name: "Dr. Sarah Thompson",
                  role: "Lead Surgeon",
                  image: "/placeholder.svg?height=300&width=300",
                },
              ].map((staff, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg shadow-md overflow-hidden"
                >
                  <Image
                    src={staff.image}
                    alt={staff.name}
                    width={300}
                    height={300}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="text-xl font-semibold mb-2">{staff.name}</h3>
                    <p className="text-gray-600">{staff.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="pb-7">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-semibold mb-8 text-center">
              Our Mission and Values
            </h2>
            <div className="bg-blue-50 rounded-lg p-8 shadow-md">
              <h3 className="text-2xl font-semibold mb-4">Our Mission</h3>
              <p className="text-gray-700 mb-6">
                To provide exceptional, patient-centered healthcare that
                improves the quality of life for our community members,
                delivered with compassion, integrity, and excellence.
              </p>
              <h3 className="text-2xl font-semibold mb-4">Our Values</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Patient-Centered Care</li>
                <li>Integrity and Transparency</li>
                <li>Continuous Learning and Innovation</li>
                <li>Teamwork and Collaboration</li>
                <li>Community Engagement</li>
              </ul>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default AboutUs;
