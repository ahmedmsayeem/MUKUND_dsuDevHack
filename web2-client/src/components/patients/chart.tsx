  import React, { useState } from "react";
  import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler,
  } from "chart.js";
  import { Line } from "react-chartjs-2";
  import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "~/components/ui/select";

  import { extractMedicalData } from './helpers';
  import { MedicalRecord } from "./constant";

  ChartJS.register(CategoryScale, LineElement, LinearScale, PointElement, Title, Tooltip, Legend, Filler);

  // Type for test name options
  type TestType = "BP" | "BS" | "CHOL" | "LDL" | "HDL";

  // Props interface for MyLineChart component
  interface MyLineChartProps {
    medicalRecords: MedicalRecord[]; // Array of medical records
  }

  // X - axis labels
  const labels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"];

  const MyLineChart: React.FC<MyLineChartProps> = ({ medicalRecords }) => {
    const [timeRange, setTimeRange] = useState<"90d" | "30d" | "7d">("90d");
    const [testName, setTestName] = useState<TestType>("BP");

    // Function to return health data based on selected test type
    const getHealthData = (type: TestType): number[] => {
      const { latestBloodPressure, totalCholesterol, lowDensityLipid, highDensityLipid } = extractMedicalData(medicalRecords);

      switch (type) {
        case "BP":
          return latestBloodPressure.map(bp => parseFloat(bp)); // Assuming latestBloodPressure is string, convert to number
        case "BS":
          return []; // Add logic if needed for blood sugar
        case "CHOL":
          return totalCholesterol;
        case "LDL":
          return lowDensityLipid;
        case "HDL":
          return highDensityLipid;
        default:
          return [];
      }
    };

    // Function to return Y-axis min and max values based on selected test type
    const getYAxisRange = (type: TestType) => {
      switch (type) {
        case "BP":
          return { min: 100, max: 140 }; // Example range for blood pressure
        case "BS":
          return { min: 70, max: 150 }; // Example range for blood sugar
        case "CHOL":
          return { min: 150, max: 250 }; // Example range for cholesterol
        case "LDL":
          return { min: 50, max: 200 }; // Example range for LDL
        case "HDL":
          return { min: 10, max: 150 }; // Example range for HDL
        default:
          return { min: 0, max: 100 };
      }
    };

    const data = {
      labels,
      datasets: [
        {
          label: `${testName} Data`,
          data: getHealthData(testName),
          fill: false,
          borderColor: "rgb(75, 192, 192)",
          tension: 0.1,
        },
      ],
    };

    const options = {
      scales: {
        y: {
          title: {
            display: true,
            text: `${testName} Values`,
          },
          min: getYAxisRange(testName).min,
          max: getYAxisRange(testName).max,
        },
        x: {
          title: {
            display: true,
            text: "Months",
          },
        },
      },
    };

    return (
      <div>
        <div className="flex gap-3 justify-between w-fit ml-12">
          <Select value={testName} onValueChange={(newValue) => setTestName(newValue as TestType)}>
            <SelectTrigger className="w-[160px] rounded-lg sm:ml-auto" aria-label="Select a test">
              <SelectValue placeholder="Select Test" />
            </SelectTrigger>
            <SelectContent className="rounded-xl">
              <SelectItem value="BP">Blood Pressure</SelectItem>
              {/* <SelectItem value="BS">Blood Sugar</SelectItem> */}
              <SelectItem value="CHOL">Cholesterol</SelectItem>
              <SelectItem value="LDL">LDL</SelectItem>
              <SelectItem value="HDL">HDL</SelectItem>
            </SelectContent>
          </Select>

          <Select value={timeRange} onValueChange={(newValue) => setTimeRange(newValue as "90d" | "30d" | "7d")}>
            <SelectTrigger className="w-[160px] rounded-lg sm:ml-auto" aria-label="Select time range">
              <SelectValue placeholder="Select Time Range" />
            </SelectTrigger>
            <SelectContent className="rounded-xl">
              <SelectItem value="90d">Last 3 months</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="7d">Last 7 days</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Line data={data} options={options} />
      </div>
    );
  };

  export default MyLineChart;
