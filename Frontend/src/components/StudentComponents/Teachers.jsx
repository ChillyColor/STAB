import React from "react";
import { Filter } from "bad-words";
import { useUser } from "../../pages/sDashboard";
import axios from 'axios';

export default function Teachers() {
  const user = useUser();
  const [teachers, setTeachers] = React.useState([]);
  const [selectedTeacher, setSelectedTeacher] = React.useState(null);
  const [message, setMessage] = React.useState("");
  const [date, setDate] = React.useState("");
  const [time, setTime] = React.useState("");

  const filter = new Filter();

  React.useEffect(() => {
    fetch("http://localhost:5000/api/teacher", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => setTeachers(data));
  }, []);

  function openModal(teacher) {
    setSelectedTeacher(teacher);
    setMessage("");
    setDate("");
    setTime("");
  }

  function closeModal() {
    setSelectedTeacher(null);
  }

  async function  handleSubmit(){
    if (filter.isProfane(message)) {
      alert("Your message contains inappropriate words.");
      return;
    }

    const appointmentDateTime = new Date(`${date}T${time}`);

    // Simulate sending request to backend
    var data=({
      teacher_id: selectedTeacher.id,
      appointment_time: appointmentDateTime,
      message: message,
      student_id: user.id,
    });
    try{
      const response=await axios.post("http://localhost:5000/api/bookings",data,{
        headers:{
          'Content-Type':'application/json'
        }
      });
      console.log("Success",response.data);
    }catch(error){
      console.error("Error",error)
    }

    alert(`Request sent to ${selectedTeacher.name}`);
    closeModal();
  };

  return (
    <main className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">All Teachers</h1>
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
        {teachers.map((teacher) => (
          <div
            key={teacher.id}
            className="bg-white p-6 rounded-xl shadow text-center"
          >
            <h2 className="text-xl font-semibold">{teacher.name}</h2>
            <p className="text-sm text-gray-600">{teacher.email}</p>
            <button
              onClick={() => openModal(teacher)}
              className="mt-5 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Book Appointment
            </button>
          </div>
        ))}
      </div>

      {/* Modal */}
      {selectedTeacher && (
        <div className="fixed inset-0 backdrop-blur-sm bg-black/30 flex justify-center items-center z-50">
          <form
            className="bg-white p-6 rounded-lg shadow-md w-full max-w-md"
            onSubmit={handleSubmit}
          >
            <h2 className="text-lg font-bold mb-4">
              Book Appointment with {selectedTeacher.name}
            </h2>

            <label className="block mb-2">Date:</label>
            <input
              required
              type="date"
              className="w-full p-2 border rounded mb-4"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />

            <label className="block mb-2">Time:</label>
            <input
              required
              type="time"
              className="w-full p-2 border rounded mb-4"
              value={time}
              onChange={(e) => setTime(e.target.value)}
            />

            <label className="block mb-2">Message:</label>
            <textarea
              className="w-full p-2 border rounded mb-4"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows="4"
              required
            />

            <div className="flex justify-end space-x-4">
              <button
                className="bg-gray-300 px-4 py-2 rounded"
                onClick={closeModal}
              >
                Cancel
              </button>
              <button
                type="submit"
                className=" bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      )}
    </main>
  );
}
