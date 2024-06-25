import { CategoryScale } from "chart.js";
import Chart from "chart.js/auto";
import React, { useEffect, useState } from "react";
import { FaRegAddressBook, FaUserTie } from "react-icons/fa";
import {
  getEmployees,
  getEmployeesAnalytics,
} from "../../features/apiEmployee";
import { getHias, getHiasAnalytics } from "../../features/apiHias";
import AdminLayout from "../Layouts/AdminLayout";
import BarChart from "../Widgets/BarChart";
import LineChart from "../Widgets/LineChart";

Chart.register(CategoryScale);

const DashboardAdmin = () => {
  const [totalHias, setTotalHias] = useState(0);
  const [totalEmployee, setTotalEmployee] = useState(0);
  const [analyticsEmployee, setAnalyticsEmployee] = useState([]);
  const [analyticsHias, setAnalyticsHias] = useState([]);

  useEffect(() => {
    getDataHias();
    getDataEmployees();
  }, []);

  const getDataHias = async () => {
    try {
      const response = await getHias();
      const responseAnalytics = await getHiasAnalytics();
      setTotalHias(response.totalHias);
      setAnalyticsHias(responseAnalytics);
      console.log("hias :", response);
    } catch (error) {
      console.log("error: ", error.message);
    }
  };

  const getDataEmployees = async () => {
    try {
      const response = await getEmployees();
      const responseAnalytics = await getEmployeesAnalytics();
      setTotalEmployee(response.totalEmployees);
      setAnalyticsEmployee(responseAnalytics);
    } catch (error) {
      console.log("error: ", error.message);
    }
  };

  return (
    <AdminLayout>
      <div className="grid grid-cols-3 gap-20 mb-5 pr-10">
        <div className="col-span-1 flex items-center justify-between gap-2 bg-white border-b-4 border-t-4 border-black rounded-lg p-6">
          <div className="">
            <h3 className="text-3xl font-bold text-yellow-500">
              {totalEmployee}
            </h3>
            <p>Total Karyawan</p>
          </div>
          <FaUserTie className="w-10 h-10 text-yellow-500" />
        </div>
        <div className="col-span-1 flex items-center justify-between gap-2 bg-white border-b-4 border-t-4 border-black rounded-lg p-6">
          <div className="">
            <h3 className="text-3xl font-bold text-yellow-500">{totalHias}</h3>
            <p>Total Laporan Hias</p>
          </div>
          <FaRegAddressBook className="w-10 h-10 text-yellow-500" />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-5">
        <div className="col-span-1 border-2 rounded-xl p-4">
          <BarChart
            title={"Data Karyawan"}
            chartData={analyticsEmployee.data2024}
          />
        </div>
        <div className="col-span-1 border-2 rounded-xl p-4">
          <LineChart
            title={"Data Laporan HIAS"}
            chartData={analyticsHias.data2024}
          />
        </div>
      </div>
    </AdminLayout>
  );
};

export default DashboardAdmin;
