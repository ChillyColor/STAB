export default function Hero() {
    return (
      <section id="home" className="h-screen pt-16 w-full bg-gradient-to-r from-blue-600 to-indigo-700 text-white flex items-center justify-center px-4">
        <div className="text-center max-w-3xl">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Book Appointments Effortlessly
          </h1>
          <p className="text-lg md:text-xl mb-8">
            Seamlessly connect students and teachers with a single click.
          </p>
          <div className="flex justify-center gap-4">
            <button className="bg-white text-blue-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition">
              Get Started
            </button>
            <button className="border border-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-700 transition">
              Learn More
            </button>
          </div>
        </div>
      </section>
    );
  }
  