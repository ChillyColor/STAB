import React from "react";
import { useUser } from "../../pages/tDashboard";
import axios from "axios";

export default function Sessions() {
  const [sessions, setSessions] = React.useState([]);
  const user = useUser();

  const startSession = (sessionId) => {
    axios
      .post("http://localhost:5000/api/startSession", { sessionId }, { withCredentials: true })
      .then(() => alert("Session started!"))
      .catch((err) => console.error("Error starting session:", err));
  };

  const postponeSession = (sessionId) => {
    axios
      .post("http://localhost:5000/api/postponeSession", { sessionId }, { withCredentials: true })
      .then(() => alert("Session postponed."))
      .catch((err) => console.error("Error postponing session:", err));
  };

  React.useEffect(() => {
    if (!user?.id) return;

    axios
      .get("http://localhost:5000/api/getSessions", {
        withCredentials: true,
        headers: {
          teacher_id: user.id,
        },
      })
      .then((response) => setSessions(response.data))
      .catch((error) => console.error("Error fetching sessions:", error));
  }, [user?.id]);

  return (
    <main className="flex-1 p-6 bg-gray-50 min-h-screen">
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
        {sessions.map((session, index) => {
          const appointmentDate = new Date(session.appointment_time);
          const localDate = appointmentDate.toLocaleDateString();
          const localTime = appointmentDate.toLocaleTimeString();

          return (
            <div
              key={index}
              className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out text-center"
            >
              <h2 className="text-2xl font-semibold text-gray-800">{session.name}</h2>
              <p className="text-sm text-gray-500">{session.email}</p>
              <p className="mt-2 text-gray-600 italic">{session.message}</p>

              <div className="mt-4 text-gray-700 space-y-1">
                <p className="font-semibold">
                  Appointment Date: <span className="text-blue-600">{localDate}</span>
                </p>
                <p className="font-semibold">
                  Appointment Time: <span className="text-blue-600">{localTime}</span>
                </p>
              </div>

              <div className="mt-6 flex justify-center gap-4">
                <button
                  className="px-4 py-2 bg-blue-600 text-white rounded-md shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
                  onClick={() => startSession(session.id)}
                >
                  ▶ Start Session
                </button>

                <button
                  className="px-4 py-2 bg-yellow-500 text-white rounded-md shadow hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-300"
                  onClick={() => postponeSession(session.id)}
                >
                  ⏳ Postpone
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
}
