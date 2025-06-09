export default function Footer() {
    return (
      <footer className="bg-gray-900 text-white py-10 ">
        <div className="max-w-6xl mx-auto px-6 flex justify-between md:grid-cols-3 gap-8">
          {/* About */}
          <div className="w-sm">
            <h3 className="text-xl font-semibold mb-4">STAB</h3>
            <p className="text-gray-400">
              A student-teacher appointment booking platform built for seamless communication and scheduling.
            </p>
          </div>
  

  
          {/* Contact */}
          <div >
            <h3 className="text-xl font-semibold mb-4">Contact</h3>
            <p className="text-gray-400">Email: support@stab-platform.com</p>
            <p className="text-gray-400">Phone: +91 98765 43210</p>
          </div>
        </div>
  
        <div className="text-center text-gray-500 mt-10 text-sm">
          &copy; {new Date().getFullYear()} STAB. All rights reserved.
        </div>
      </footer>
    );
  }
  