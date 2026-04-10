import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from "chart.js"
import { Bar } from "react-chartjs-2"

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

function ProductivityChart() {
  const data = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [{
      label: "Focus Hours",
      data: [3, 4, 5, 4, 6, 5, 7],
      backgroundColor: "#38bdf8"
    }]
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false
  }

  return (
    <div className="card">
      <h3>Weekly Productivity</h3>
      <div style={{ position: "relative", height: "250px", marginTop: "16px" }}>
        <Bar data={data} options={options} />
      </div>
    </div>
  )
}

export default ProductivityChart