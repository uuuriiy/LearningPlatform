import Image from "next/image";

export const HeroSection = () => {
  return (
    <section className="flex gap-5 items-center">
          {/* Left Side - Content */}
          <div className="space-y-8 w-full flex flex-col">
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Create, Upload & Learn
              </h1>
              <p className="w-[90%] text-xl text-gray-600 leading-relaxed">
                Turn your knowledge into impactful courses and share them with learners everywhere. Upload your content and enjoy on-demand access anytime.
              </p>
            </div>

            <div>
              <button className="bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-700 transition-colors shadow-lg">
                Get Started
              </button>
            </div>
          </div>

          <div className="w-full h-[400px] relative">
            <Image 
              src="/images/hero-image.png" 
              alt="Hero Image" 
              fill
              style={{ objectFit: "cover" }}
              priority
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"
            />
          </div>
    </section>
  )
}
