export default function Features() {
    const features = [
      {
        title: "Easy Booking",
        description: "Students can quickly schedule appointments without back-and-forth emails.",
        icon: "📅",
      },
      {
        title: "Real-Time Updates",
        description: "Appointments are updated live so both parties always see the latest schedule.",
        icon: "⚡",
      },
      {
        title: "Messaging Support",
        description: "Students can include the purpose of the meeting while booking.",
        icon: "💬",
      },
      {
        title:"Video Sessions",
        description:"Students can request for video sessions for doubt clearing",
        icon:"📽️"
      },
      {
        title: "Responsive Design",
        description: "Access the platform on desktop, tablet, or phone — fully optimized.",
        icon: "📱",
      },

      {
        title:" Secure login & role-based access",
        description:"Ensure only authorized users can access the system with secure authentication and role-specific permissions for students and teachers.",
        icon:"🔐"
      }
    ];
  
    return (
      <section id="features" className="py-20 bg-gray-50 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-gray-800">Platform Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {features.map((feature, index) => (
              <div key={index} className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2 text-blue-700">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }
  