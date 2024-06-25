import React from "react";
import { Line } from "react-chartjs-2";
function LineChart({ title, chartData }) {
  if (!Array.isArray(chartData)) {
    console.error("chartData is not an array");
    return null;
  }

  return (
    <div className="chart-container">
      <h2 className="text-lg text-yellow-500 font-semibold mb-5">{title}</h2>
      <Line
        data={{
          labels: chartData.map((data) => data.month),
          datasets: [
            {
              label: "Users Gained",
              data: chartData.map((data) => data.total),
              borderColor: "black",
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
}
export default LineChart;
