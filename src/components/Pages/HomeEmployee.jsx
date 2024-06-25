import React, { useEffect, useState } from "react";
import { HiDocumentPlus } from "react-icons/hi2";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getHiasAnalytics, getMyHias } from "../../features/apiHias";
import Button from "../Elements/Button";
import EmployeeLayout from "../Layouts/EmployeeLayout";
import BarChart from "../Widgets/BarChart";

const HomeEmployee = () => {
  const [myHias, setMyHias] = useState([]);
  const [analyticsHias, setAnalyticsHias] = useState([]);

  const { user } = useSelector((state) => state.auth);

  const navigate = useNavigate();
  useEffect(() => {
    getDataHiasAnalytics();
    getMyDataHias();
  }, []);

  const handleToHias = () => {
    navigate("/hias");
  };

  const getDataHiasAnalytics = async () => {
    try {
      const response = await getHiasAnalytics();
      setAnalyticsHias(response);
    } catch (error) {
      console.log("error: ", error.message);
    }
  };

  const getMyDataHias = async () => {
    try {
      const response = await getMyHias(user?.employee?.employeeId);
      setMyHias(response);
    } catch (error) {
      console.log("error: ", error.message);
    }
  };

  // console.log("id: ", user?.employee?.employeeId);
  // console.log("my hias:", myHias);
  console.log("analyticsHias: ", analyticsHias);

  return (
    <EmployeeLayout>
      <div className="grid grid-cols-2 w-full h-full gap-20">
        <div className="col-span-1 flex flex-col mt-10">
          <Button
            text="Hias Baru"
            type="button"
            onClick={handleToHias}
            classname="bg-yellow-500 text-white mb-10 w-fit flex items-center gap-2"
          >
            <HiDocumentPlus />
            Buat Pelaporan
          </Button>
          <div className="space-y-7">
            {myHias.length > 0 ? (
              myHias.slice(-2).map((hias) => (
                <div
                  className={`relative grid grid-cols-3 gap-10 bg-gray-50 border-2 ${
                    hias.is_confirm ? "border-lime-600" : "border-red-600"
                  } rounded-lg p-5`}
                  key={hias.id}
                >
                  <div
                    className={`absolute -top-4 -right-4 rounded-lg py-1 px-5 text-sm text-white font-bold ${
                      hias.is_confirm ? "bg-lime-600" : "bg-red-600"
                    }`}
                  >
                    <p>{hias.is_confirm ? "Disetujui" : "Belum Disetujui"}</p>
                  </div>

                  <img
                    src={hias.url_image_location}
                    alt=""
                    className="col-span-1 w-36 rounded-xl h-28"
                  />
                  <div className="col-span-2 flex flex-col gap-1">
                    <div className="flex text-sm gap-1 justify-between">
                      <p className="font-semibold text-lg">{hias.location}</p>
                      <p className="italic">
                        {hias.createdAt &&
                          new Date(hias.createdAt).toLocaleDateString("id-ID", {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                          })}
                      </p>
                    </div>
                    <p className="text-sm text-yellow-500 font-bold">
                      {hias.categories_advice}
                    </p>
                    <p className="text-gray-500 text-xs text-justify">
                      {hias.observations.length > 160
                        ? hias.observations.substring(0, 160) + "..."
                        : hias.observations}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p>Data anda belum ada</p>
            )}
          </div>
        </div>
        <div className="my-auto col-span-1 p-4">
          <BarChart
            title={"Analitik Laporan Hias "}
            chartData={analyticsHias.data2024}
          />
        </div>
      </div>
    </EmployeeLayout>
  );
};

export default HomeEmployee;
