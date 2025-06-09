import React from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate=useNavigate();
  const [userData, setUserData] = React.useState({
    name:"",
    email: "",
    password: "",
    role: "",
  });
  const [cPassword, setCPassword] = React.useState("");

  const [error, setError] = React.useState("");

  function handleChange(event) {
    const { name, value } = event.target;

    if (name === "cPassword") {
      setCPassword(value);
    } else {
      setUserData((prevValue) => ({
        ...prevValue,
        [name]: value,
      }));
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const matchPass = userData.password === cPassword;
    if (matchPass) {
      setError("");
      try {
        const response = await fetch("http://localhost:5000/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
          credentials: "include",
        });
        if (!response.ok) {
          if(response.status===409){
            throw new Error("User Already Exists");
          }else{
          throw new Error("Registration failed");
          }
        }
        const data = await response.json();
        console.log("registration Success", data);
        if(userData.role==="Student"){
          navigate("/student");
        }
        else{
          navigate("/teacher");
        }

      } catch (error) {
        setError(error.message);
      }
    } else {
      setError("Passwords do not match");
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-100 to-purple-200">
      <div className="bg-white p-10 rounded-2xl shadow-2xl w-full max-w-md">
        <h1 className="text-center text-3xl font-extrabold text-gray-800 mb-8">
          Register Now
        </h1>
        {error && <p className="text-red-600 text-center mb-4">{error}</p>}
        <form className="flex flex-col space-y-5" onSubmit={handleSubmit}>
        <input
            name="name"
            type="text"
            placeholder="Enter your Name"
            className="px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={userData.name}
            onChange={handleChange}
            required
          />
          <input
            name="email"
            type="email"
            placeholder="Enter your Email"
            className="px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={userData.email}
            onChange={handleChange}
            required
          />

          <select
            name="role"
            className="px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-500"
            value={userData.role}
            onChange={handleChange}
            required
          >
            <option value="" disabled hidden>
              Choose your role
            </option>
            <option value="Student">Student</option>
            <option value="Teacher">Teacher</option>
          </select>

          <input
            name="password"
            type="password"
            placeholder="Create your password"
            className="px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={userData.password}
            onChange={handleChange}
            required
          />

          <input
            name="cPassword"
            type="password"
            placeholder="Confirm password"
            className="px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={cPassword}
            onChange={handleChange}
            required
          />

          <button
            type="submit"
            className="bg-blue-600 text-white py-3 rounded-md font-semibold hover:bg-blue-700 transition duration-300"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
}
