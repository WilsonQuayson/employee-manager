import { createBrowserRouter } from "react-router-dom";

import RootLayout from "../layouts/RootLayout";
import Home from "../pages/Home";
import Employees from "../pages/Employees";
import NotFound from "../pages/NotFound";

export const router = createBrowserRouter([
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
    ],
  },
]);