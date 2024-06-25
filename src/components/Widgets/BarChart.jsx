import React from "react";
import { Bar } from "react-chartjs-2";

const BarChart = ({ title, chartData }) => {
  if (!Array.isArray(chartData)) {
    console.error("chartData is not an array");
    return null;
  }

  return (
    <div className="chart-container">
      <h2 className="text-lg text-yellow-500 font-semibold mb-5">{title}</h2>
      <Bar
        data={{
          labels: chartData.map((data) => data.month),
          datasets: [
            {
              label: "Users Gained",
              data: chartData.map((data) => data.total),
              backgroundColor: [
                "#FFFF00", // Kuning cerah
                "#FFEE58", // Kuning oranye
                "#FFEB3B", // Kuning keemasan
                "#FFD740", // Kuning agak tua
                "#FFC400", // Kuning kejinggaan
                "#FFAB00", // Kuning tua
                "#FF8F00", // Oranye tua
                "#FF6F00", // Oranye gelap
                "#FF5722", // Oranye kecoklatan
                "#FF3D00", // Merah
              ],
              // borderColor: "black",
              borderWidth: 2,
              animation: {
                duration: 1000,
                easing: "linear",
              },
            },
          ],
        }}
        options={{
          plugins: {
            // title: {
            //   display: true,
            //   text: "Users Gained between 2016-2020",
            // },
            legend: {
              display: false,
            },
          },
        }}
      />
    </div>
  );
};

export default BarChart;
