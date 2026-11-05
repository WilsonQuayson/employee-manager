import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../layouts/RootLayout";
import ProtectedRoute from "../components/ProtectedRoute";
import Home from "../pages/Home";
import Employees from "../pages/Employees";
import NotFound from "../pages/NotFound";
import Departments from "../pages/Departments";
import EmployeeDetails from "../pages/EmployeeDetails";
import Login from "../pages/Login";
import Register from "../pages/Register";

export const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: "/",
        element: <RootLayout />,
        errorElement: <NotFound />,
        children: [
          {
            index: true,
            element: <Home />,
          },
          {
            path: "employees",
            element: <Employees />,
          },
          {
            path: "departments",
            element: <Departments />,
          },
          {
            path: "employees/:id",
            element: <EmployeeDetails />,
          },
        ],
      },
    ],
  },
]);
