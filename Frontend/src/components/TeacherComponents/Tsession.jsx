import React from "react";
import { useUser } from "../../pages/tDashboard";
import axios from "axios";
export default function Session() {
  const [students, setStudents] = React.useState([]);
  const user = useUser();
  React.useEffect(() => {
    axios
      .get("http://localhost:5000/api/getbooking", {
        withCredentials: true,
        headers: {
          teacher_id: user.id,
        },
      })
      .then((res) => setStudents(res.data))
      .catch((err) => console.log(err));
  }, []);
  function handleClick(status, id) {
   
    axios
      .put("http://localhost:5000/api/updateStatus", {
        sid: id,
        tid: user.id,
        status: status
      })
      .then(() => {
        setStudents((prevStudents) =>
          prevStudents.filter((student) => student.id !== id)
        );
         status==='approved'?alert("Request Approved"):alert("Request Rejected")
      })
      .catch((err) => {
        console.error("Update error:", err);
      });
  }

  return (
    <main className="flex-1 p-6 bg-gray-50 min-h-screen">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800">Sessions</h1>
        <div className="text-sm sm:text-right text-gray-600 mt-2 sm:mt-0">
          <p className="text-base">Today's Date</p>
          <p className="text-lg font-semibold text-gray-700">
            {new Date().toISOString().slice(0, 10)}
          </p>
        </div>
      </div>
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {students.map((student, index) => {
          const appointmentDate = new Date(student.appointment_time);

          const localDate = appointmentDate.toLocaleDateString();
          const localTime = appointmentDate.toLocaleTimeString();

          return (
            <div
              key={index}
              className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out "
            >
              <h2 className="text-2xl font-semibold text-gray-800">
                {student.name}
              </h2>
              <p className="text-sm text-gray-500">{student.email}</p>
              <p className="mt-2 text-gray-600 italic">{student.message}</p>

              <div className="mt-4 text-gray-700">
                <p className="font-semibold">
                  Appointment Date:{" "}
                  <span className="text-blue-600">{localDate}</span>
                </p>
                <p className="font-semibold">
                  Appointment Time:{" "}
                  <span className="text-blue-600">{localTime}</span>
                </p>
              </div>

              <div className="mt-6 flex justify-center gap-4">
                <button
                  className="px-4 py-2 bg-green-600 text-white rounded-md shadow hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-300"
                  onClick={() => {
                    handleClick("approved", student.id);
                  }}
                >
                  <span className="mr-2">✓</span>Approve
                </button>
                <button
                  className="px-4 py-2 bg-red-600 text-white rounded-md shadow hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-300"
                  onClick={() => {
                    handleClick("rejected", student.id);
                  }}
                >
                  <span className="mr-2">✗</span>Reject
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
}
