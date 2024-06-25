import axios from "axios";
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { store } from "./app/store";
import CreateHiasEmployee from "./components/Pages/CreateHiasEmployee";
import "./index.css";
import IndexPage from "./pages";
import CreateEmployeeAdminPage from "./pages/Admin/CreateEmployeeAdmin";
import DashboardAdminPage from "./pages/Admin/DashboardAdmin";
import DetailEmployeeAdminPage from "./pages/Admin/DetailEmployeeAdmin";
import DetailHiasAdminPage from "./pages/Admin/DetailHiasAdmin";
import EmployeeAdminPage from "./pages/Admin/EmployeeAdmin";
import HiasAdminPage from "./pages/Admin/HiasAdmin";
import LoginPage from "./pages/Auth/Login";
import HomeEmployeePage from "./pages/Employee/HomeEmployee";
import TesPage from "./pages/Tes";

axios.defaults.withCredentials = true;

const router = createBrowserRouter([
  {
    path: "/index",
    element: <IndexPage />,
  },
  {
    path: "/tes",
    element: <TesPage />,
  },
  {
    path: "/",
    element: <HomeEmployeePage />,
  },
  {
    path: "/hias",
    element: <CreateHiasEmployee />,
  },
  {
    path: "/auth/login",
    element: <LoginPage />,
  },
  {
    path: "/admin",
    element: <DashboardAdminPage />,
  },
  {
    path: "/admin/employee",
    element: <EmployeeAdminPage />,
  },
  {
    path: "/admin/employee/:uuid",
    element: <DetailEmployeeAdminPage />,
  },
  {
    path: "/admin/employee/create",
    element: <CreateEmployeeAdminPage />,
  },
  {
    path: "/admin/hias",
    element: <HiasAdminPage />,
  },
  {
    path: "/admin/hias/:uuid",
    element: <DetailHiasAdminPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
