import React, { createContext, useContext } from "react";
import Sidebar from "../components/TeacherComponents/Sidebar";
import { Outlet } from "react-router-dom";
import RequireAuth from "../components/RequireAuth";
import { useNavigate } from "react-router-dom";

export const UserContext = createContext();
export const useUser = () => useContext(UserContext);
export default function Teacher() {
  const navigate=useNavigate();
  const [userData, setUserData] = React.useState({});
  function onAuthenticated(user) {
    if (JSON.stringify(userData) !== JSON.stringify(user)) {
      setUserData(user);
    }
  }
    React.useEffect(() => {
      if (userData?.role && userData.role !== "Teacher") {
        navigate("/login");
      }
    }, [userData, navigate]);
  return (
    <RequireAuth getData={onAuthenticated}>
      <UserContext.Provider value={userData}>
        <div className="min-h-screen bg-gray-50 text-gray-800">
          <div className="flex">
            <Sidebar />
            <Outlet />
          </div>
        </div>
      </UserContext.Provider>
    </RequireAuth>
  );
}
