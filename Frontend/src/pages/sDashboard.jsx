import React, { createContext, useContext,  } from "react";
import Sidebar from "../components/StudentComponents/Sidebar";
import { Outlet } from "react-router-dom";
import RequireAuth from "../components/RequireAuth";
import { useNavigate } from "react-router-dom";


export const UserContext=createContext();
export const useUser=()=>(
  useContext(UserContext)
)
export default function StudentDashboard() {
   const navigate = useNavigate();
  const [userData,setUserData]=React.useState({});
  function onAuthenticated(user){
    if (JSON.stringify(userData) !== JSON.stringify(user)) {
      setUserData(user);
    }
  }
  React.useEffect(() => {
    if (userData?.role && userData.role !== "Student") {
      navigate("/login");
    }
  }, [userData, navigate]);

  return (
    <RequireAuth getData={onAuthenticated}>
    <UserContext.Provider value={userData}>
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-50">
      <Sidebar data={userData}/>
      <Outlet />
    </div>
    </UserContext.Provider>
    </RequireAuth>
  );
}
