import React, { useRef, useState, useEffect } from "react"
import { Button } from "~/components/ui/button"
import { Slider } from "~/components/ui/slider"
import { PrinterIcon } from "lucide-react"

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  type ChartOptions,
  type ChartData,
} from "chart.js"
import { Line } from "react-chartjs-2"
import { useRouter } from "next/router"

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

type ECGChartOptions = ChartOptions<'line'>
type ECGChartData = ChartData<'line'>

interface ECGHeartRateProps {}

const ECGHeartRate: React.FC<ECGHeartRateProps> = () => {
  const chartRef = useRef<ChartJS<"line"> | null>(null)
  const [heartRate, setHeartRate] = useState<number>(60)
  const [ecgData, setEcgData] = useState<number[]>([])
  const dataPoints = 500

  const [BPM, setBPM] = useState<number>(60);
  
  const [isUnconscious, setIsUnconscious] = useState<boolean>(false);

  const router = useRouter();

  async function postData() {
    if (BPM <= 40 || BPM >= 110) {
      setIsUnconscious(true);
      
      try {

        alert("sending request to data");
        const response = await fetch('http://localhost:5000/api/patient/unconscious', {

          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            account: "0x37D26956508c15945D65be33b61fEdC720D67D4E",
            status: true,

          }),
        });
        
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }
        
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const data = await response.json();
        console.log(data);
        
        setBPM(100);
        window.location.href = '/patient';
  
        // Redirect to /patient page
      } catch (error) {
        console.error('POST request failed:', error);
      }
    }
  }
  
  useEffect(() => {
    const generateECGData = (): void => {
      const frequency: number = heartRate / 60
      const newData: number[] = []

      for (let i = 0; i < dataPoints; i++) {
        const t: number = i / dataPoints
        let y = 0

        y += Math.sin(2 * Math.PI * frequency * t) * 0.15

        if (t % (1 / frequency) < 0.05) {
          y += Math.sin(2 * Math.PI * frequency * t * 10) * 2.5
        }

        if (t % (1 / frequency) > 0.3 && t % (1 / frequency) < 0.4) {
          y += Math.sin(2 * Math.PI * frequency * t * 5) * 0.7
        }

        newData.push(y)
      }

      setEcgData(newData)
    }

    generateECGData()
    const interval: NodeJS.Timeout = setInterval(generateECGData, 1000 / heartRate)

    return () => clearInterval(interval)
  }, [heartRate, dataPoints])

  const data: ECGChartData = {
    labels: Array.from({ length: ecgData.length }, (_, i) => i.toString()),
    datasets: [
      {
        label: "ECG",
        data: ecgData,
        borderColor: "rgb(75, 192, 192)",
        borderWidth: 2,
        tension: 0.2,
        pointRadius: 0,
      },
    ],
  }

  const options: ECGChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      duration: 200,
    },
    scales: {
      x: {
        display: false,
      },
      y: {
        display: false,
        min: -3,
        max: 3,
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: false,
      },
    },
  }

  const handlePrint = (): void => {
    const canvas = chartRef.current?.canvas
    if (!canvas) return

    const dataUrl: string = canvas.toDataURL("image/png")
    const windowContent = `
      <!DOCTYPE html>
      <html>
      <head><title>Print ECG</title></head>
      <body><img src="${dataUrl}" /></body>
      </html>`

    const printWindow: Window | null = window.open("", "", "width=800,height=600")
    if (printWindow) {
      printWindow.document.open()
      printWindow.document.write(windowContent)
      printWindow.document.close()
      printWindow.focus()
      printWindow.print()
      printWindow.close()
    }
  }

  return (
    <div className="flex flex-col items-center space-y-6 p-6 bg-white rounded-lg shadow-lg max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-800">ECG Heart Rate Simulator</h2>
      <div className="relative w-full h-[400px]">
        <div className="absolute top-2 left-2 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-lg font-bold z-10">
          {heartRate} BPM
        </div>
        <Line ref={chartRef} data={data} options={options} />
      </div>
      <div className="w-full space-y-2">
        <label htmlFor="heartRate" className="text-sm font-medium text-gray-700 block">
          Heart Rate (bpm)
        </label>
        <Slider
          id="heartRate"
          min={30}
          max={120}
          step={1}
          value={[heartRate]}
          onValueChange={(value: number[]) => {
            setHeartRate(value[0]!); 
            setBPM(value[0]!);
            void postData()
          }}
          className="w-full"
        />
      </div>
      <Button onClick={handlePrint} className="w-full">
        <PrinterIcon className="mr-2 h-4 w-4" /> Print ECG
      </Button>
    </div>
  )
}

export default ECGHeartRate