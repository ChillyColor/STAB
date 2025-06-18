import React from "react";
import { FaUserGraduate, FaCalendarAlt, FaBook, FaCog } from "react-icons/fa";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function Sidebar({data}) {
  const location = useLocation();
  const navItems = [
    { label: "Home", icon: <FaUserGraduate />, href: "/student", active: true },
    {
      label: "All Teachers",
      icon: <FaBook />,
      href: "/student/teachers",
      active: false,
    },
    {
      label: "Scheduled Sessions",
      icon: <FaCalendarAlt />,
      href: "/student/sessions",
      active: false,
    },
    { label: "My Bookings", icon: <FaBook />, href: "#", active: false },
    { label: "Settings", icon: <FaCog />, href: "#", active: false },
  ];
  const navigate =useNavigate();
 

  return (
    <aside className="w-full md:w-64 bg-white shadow-lg p-6 flex flex-col justify-between min-h-screen">
      {/* Profile Section */}
      <div>
        <div className="flex items-center gap-4 mb-6 border-b border-gray-200 pb-6">

          <div>
            <h2 className="text-lg font-semibold text-gray-800">
              {data.name}
            </h2>
            <p className="text-sm text-gray-500">{data.email}</p>
          </div>
        </div>

        {navItems.map((item, index) => {
          const isActive = location.pathname === item.href;

          return (
            <a
              key={index}
              href={item.href}
              className={`flex items-center px-3 py-2 rounded-md transition-colors ${
                isActive
                  ? "bg-blue-50 text-blue-600 font-semibold"
                  : "text-gray-600 hover:bg-blue-50 hover:text-blue-600"
              }`}
              aria-current={isActive ? "page" : undefined}
            >
              <span className="mr-3 text-lg">{item.icon}</span>
              {item.label}
            </a>
          );
        })}
      </div>

      {/* Logout Button */}
      <button
        className="mt-10 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded transition w-full"
        onClick={() => {
          fetch("http://localhost:5000/logout", {
            method: "POST",
            credentials: "include",
          })
          
            .then((response) => {
              if (response.ok) {
                console.log("Logged out successfully");
                navigate("/")
              } else {
                console.log("Logout Failed");
              }
            })
            .catch((error) => {
              console.error("Erro during logout", error);
            });
        }}
      >
        Log Out
      </button>
    </aside>
  );
}
