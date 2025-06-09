import React from "react";
import { useUser } from "../../pages/sDashboard";

export default function Home() {
  const user=useUser();
 
  const today = new Date().toISOString().slice(0, 10);
  const stats = [
    { count: 1, label: "Today's Sessions" },
    { count: 2, label: "Available Teachers" },
    { count: 1, label: "Pending Approvals" },
    { count: 0, label: "Confirmed Bookings" },
  ];

  return (
    
    <main className="flex-1 p-6 flex flex-col items-center justify-start">
      {/* Header */}

      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4 w-full max-w-6xl ">
        <h1 className="text-2xl font-bold text-gray-800">Home</h1>
        <div className="text-sm sm:text-right text-gray-500">
          <p>Today's Date</p>
          <p className="text-lg font-medium text-gray-700">{today}</p>
        </div>
      </div>
      {/* Welcome Section (Centered) */}
      <section className="mb-8 flex justify-center w-full">
        <div className="relative w-full max-w-4xl rounded-lg shadow">
          <div className="absolute inset-0 bg-[url('https://i.pinimg.com/736x/88/3e/db/883edbf1a50e79deec66b7b492c69419.jpg')] bg-cover bg-center rounded-lg" />
          <div className="relative z-10 bg-white/70 p-8 rounded-lg">
            <h2 className="text-2xl font-semibold mb-1">
              Welcome, <span className="text-blue-600">{user.name}</span>!
            </h2>
            <p className="text-gray-700 max-w-xl mb-4">
              Don’t know which teacher to approach? Explore the{" "}
              <span className="font-semibold">"All Teachers"</span> section or check your{" "}
              <span className="font-semibold">"Scheduled Sessions"</span>.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 w-full max-w-2xl justify-center">
              <input
                type="text"
                placeholder="Search for a teacher or session"
                className="p-2 border border-gray-300 rounded flex-1 min-w-[200px] focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded transition">
                Search
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Status Boxes */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10 w-full max-w-6xl">
        {stats.map(({ count, label }, idx) => (
          <div
            key={idx}
            className="bg-white shadow rounded-lg p-4 text-center hover:shadow-xl transform hover:scale-105 transition-transform flex items-center justify-center flex-col"
          >
            <p className="text-3xl font-bold text-blue-600">{count}</p>
            <p className="text-gray-600">{label}</p>
          </div>
        ))}
      </section>

      {/* Upcoming Bookings */}
      <section className="bg-white shadow rounded-lg p-6 overflow-x-auto w-full max-w-6xl">
        <h2 className="text-xl font-semibold mb-4">Your Upcoming Booking</h2>
        <table className="min-w-[600px] w-full text-left border-t border-gray-200">
          <thead className="bg-gray-100 text-sm text-gray-700">
            <tr>
              {["Appoint. Number", "Session Title", "Teacher", "Scheduled Date & Time"].map(
                (header, i) => (
                  <th key={i} className="py-3 px-4 border-b font-medium">
                    {header}
                  </th>
                )
              )}
            </tr>
          </thead>
          <tbody className="text-sm text-gray-800">
            <tr className="hover:bg-gray-50">
              <td className="py-3 px-4 border-b">1</td>
              <td className="py-3 px-4 border-b">Doubt Clarification</td>
              <td className="py-3 px-4 border-b">Prof. Smith</td>
              <td className="py-3 px-4 border-b">2050-01-01 18:00</td>
            </tr>
          </tbody>
        </table>
      </section>
    </main>
  );
}
