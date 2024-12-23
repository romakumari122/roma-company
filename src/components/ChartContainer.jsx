import React from "react";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  ArcElement, // Required for Pie Chart
} from "chart.js";

// Register required Chart.js components
ChartJS.register(BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend, ArcElement);

const ChartContainer = ({ selectedIndex }) => {
  if (!selectedIndex) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <p className="fs-4 text-secondary">Select a company to view its data.</p>
      </div>
    );
  }

  // Grouping related data
  const primaryDataLabels = [
    "Open Index Value",
    "High Index Value",
    "Low Index Value",
    "Closing Index Value",
  ];
  const primaryDataValues = [
    parseFloat(selectedIndex.open_index_value),
    parseFloat(selectedIndex.high_index_value),
    parseFloat(selectedIndex.low_index_value),
    parseFloat(selectedIndex.closing_index_value),
  ];

  const performanceDataLabels = [
    "Points Change",
    "Change Percent",
    "PE Ratio",
    "PB Ratio",
    "Dividend Yield",
  ];
  const performanceDataValues = [
    parseFloat(selectedIndex.points_change),
    parseFloat(selectedIndex.change_percent),
    parseFloat(selectedIndex.pe_ratio),
    parseFloat(selectedIndex.pb_ratio),
    parseFloat(selectedIndex.div_yield),
  ];

  const largeValuesLabels = ["Volume", "Turnover (Rs Cr)"];
  const largeValues = [
    parseFloat(selectedIndex.volume) / 1000000, // Scaled to millions
    parseFloat(selectedIndex.turnover_rs_cr) / 1000000, // Scaled to millions
  ];

  const createChartData = (labels, values, type = "bar") => ({
    labels,
    datasets: [
      {
        label: `${selectedIndex.index_name} Data`,
        data: values,
        backgroundColor:
          type === "pie"
            ? [
                "rgba(255, 99, 132, 0.6)",
                "rgba(54, 162, 235, 0.6)",
                "rgba(255, 206, 86, 0.6)",
                "rgba(75, 192, 192, 0.6)",
                "rgba(153, 102, 255, 0.6)",
              ]
            : "rgba(54, 162, 235, 0.6)",
        borderColor:
          type === "pie"
            ? [
                "rgba(255, 99, 132, 1)",
                "rgba(54, 162, 235, 1)",
                "rgba(255, 206, 86, 1)",
                "rgba(75, 192, 192, 1)",
                "rgba(153, 102, 255, 1)",
              ]
            : "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
    ],
  });

  // Common options for bar charts
  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
      },
      tooltip: {
        callbacks: {
          title: (tooltipItems) =>
            `${selectedIndex.index_name} (${selectedIndex.index_date})`,
          label: (tooltipItem) => `${tooltipItem.label}: ${tooltipItem.raw}`,
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Values",
        },
      },
      x: {
        title: {
          display: true,
          text: "Metrics",
        },
      },
    },
  };

  // Specific options for the Large Metrics horizontal bar chart
  const horizontalBarOptions = {
    ...options,
    indexAxis: "y", // Makes the bars horizontal
    scales: {
      x: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Values (in Millions)",
        },
        ticks: {
          callback: (value) => `${value}M`, // Add "M" suffix
        },
      },
      y: {
        title: {
          display: true,
          text: "Metrics",
        },
      },
    },
  };

  return (
    <div className="container w-100  d-flex flex-row justify-content-between px-4">
      {/* Primary Values */}
      <div style={{ width: "600px" }} className="d-flex flex-column">
        <div>
          <Bar
            data={createChartData(primaryDataLabels, primaryDataValues)}
            options={options}
          />
        </div>

        {/* Large Metrics */}
        <div style={{ maxHeight: "400px" }} className="w-100">
          {/* <h3 className="text-center mb-4">Large Metrics (Scaled to Millions)</h3> */}
          <Bar
            data={createChartData(largeValuesLabels, largeValues)}
            options={horizontalBarOptions} // Apply horizontal bar options
          />
        </div>
      </div>

      {/* Performance Metrics */}
      <div style={{ width: "500px", maxHeight: "550px" }} className="mb-5">
        <h3 className="text-center">Performance Metrics</h3>
        <Pie
          data={createChartData(performanceDataLabels, performanceDataValues, "pie")}
          options={{
            responsive: true,
            plugins: {
              legend: {
                display: true,
              },
              tooltip: {
                callbacks: {
                  title: (tooltipItems) =>
                    `${selectedIndex.index_name} (${selectedIndex.index_date})`,
                  label: (tooltipItem) => `${tooltipItem.label}: ${tooltipItem.raw}`,
                },
              },
            },
          }}
        />
      </div>
    </div>
  );
};

export default ChartContainer;
