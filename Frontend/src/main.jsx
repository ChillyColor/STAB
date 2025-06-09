import React from "react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import NotFoundPage from "./components/NofFoundPage.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Teacher from "./pages/tDashboard.jsx";
import Student from "./pages/sDashboard.jsx";
import Home from "./components/StudentComponents/Home.jsx";
import Card from "./components/StudentComponents/Teachers.jsx";
import Thome from "./components/TeacherComponents/Thome.jsx";
import Booking from "./components/TeacherComponents/Tbookings.jsx";
import Sessions from "./components/TeacherComponents/TSessions.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
  {
    path: "/teacher",
    element: <Teacher />,
    children: [
      {
        index: true,
        element: <Thome />,
      },
      {
        path: "booking",
        element: <Booking />,
      },
      {
        path:"sessions",
        element: <Sessions/>
      },
    ],
  },
  {
    path: "/student",
    element: <Student />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "teachers",
        element: <Card />,
      },
    ],
  },
]);
createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
