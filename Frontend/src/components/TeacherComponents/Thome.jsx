import React from "react";
import Teacher, { useUser } from "../../pages/tDashboard";
import axios from "axios";


export default function Thome() {
  const user=useUser();
  const [teacherData,setTeacherData]=React.useState({})
    React.useEffect(() => {
    axios
      .get("http://localhost:5000/api/getTeacherData", {
        withCredentials: true,
        headers: {
          teacher_id: user.id,
        },
      })
      .then((res) => setTeacherData(res.data))
      .catch((err) => console.log(err));
      console.log("Teacher Data:", teacherData);
  }, []);
  return (
    <main className="flex-1 p-6 bg-gray-50 min-h-screen">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800">Home</h1>
        <div className="text-sm sm:text-right text-gray-600 mt-2 sm:mt-0">
          <p className="text-base">Today's Date</p>
          <p className="text-lg font-semibold text-gray-700">
            {new Date().toISOString().slice(0, 10)}
          </p>
        </div>
      </div>
      {/* Welcome Section */}
      <section className="mb-10 flex justify-center px-4">
        <div className="relative w-full max-w-5xl rounded-xl shadow-xl overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://i.pinimg.com/736x/0e/07/fb/0e07fb21aa6e7b57be035a1821b5606b.jpg')] bg-cover bg-center" />
          <div className="relative z-10 bg-white/80  p-8 sm:p-10">
            <h2 className="text-2xl font-semibold mb-3 text-gray-800">
              Welcome, <span className="text-blue-600">{user.name}</span>!
            </h2>
            <p className="text-gray-700 max-w-2xl mb-6">
              Not sure which student needs your help? Review your{" "}
              <span className="font-semibold">"Booking Requests"</span> section or
              check your <span className="font-semibold">"My Sessions"</span> to stay updated.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="text"
                placeholder="Search for a student or session"
                className="p-3 border border-gray-300 rounded-lg flex-1 min-w-[200px] focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                aria-label="Search Session"
              />
              <button className="px-5 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition shadow">
                🔍 Search
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Status Boxes */}
      <div className="flex justify-center mb-10 px-4">
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
          {[
            { count: teacherData.current, label: "Today's Sessions" },
            { count: teacherData.pending, label: "Pending Approvals" },
            { count: teacherData.accepted, label: "Total Bookings" },
          ].map((item, idx) => (
            <div
              key={idx}
              className="bg-white shadow-md rounded-xl p-6 text-center hover:shadow-xl transition-transform transform hover:scale-105 border border-gray-100"
            >
              <p className="text-4xl font-extrabold text-blue-600">{item.count}</p>
              <p className="text-gray-700 font-medium mt-2">{item.label}</p>
            </div>
          ))}
        </section>
      </div>

      {/* Upcoming Bookings */}
      <div className="flex justify-center px-4">
        <section className="bg-white shadow-md rounded-xl p-6 overflow-x-auto w-full max-w-6xl border border-gray-100">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Your Upcoming Sessions</h2>
          <table className="min-w-[600px] w-full text-left border-t border-gray-200">
            <thead className="bg-gray-100 text-sm text-gray-700">
              <tr>
                {[
                  "Appoint Number",
                  "Session Title",
                  "Student",
                  "Scheduled Date & Time",
                ].map((header, i) => (
                  <th
                    key={i}
                    className="py-3 px-4 border-b border-gray-200 font-medium"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="text-sm text-gray-800">
              {teacherData.appointments?.map((app,index)=>(
                <tr key={index} className="hover:bg-gray-50 transition">
                  <td className="py-3 px-4 border-b">{app.id}</td>
                  <td className="py-3 px-4 border-b">{app.message}</td>
                  <td className="py-3 px-4 border-b">{app.student_id}</td>
                  <td className="py-3 px-4 border-b">
                    {new Date(app.appointment_time).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </div>
    </main>
  );
}
