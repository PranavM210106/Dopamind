import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from "chart.js"
import { Pie } from "react-chartjs-2"

ChartJS.register(ArcElement, Tooltip, Legend)

function HabitChart() {
  const data = {
    labels: ["Exercise", "Study", "Meditation", "Social Media"],
    datasets: [{
      data: [25, 40, 15, 20],
      backgroundColor: ["#38bdf8", "#22c55e", "#facc15", "#ef4444"]
    }]
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false
  }

  return (
    <div className="card">
      <h3>Habit Distribution</h3>
      <div style={{ position: "relative", height: "250px", marginTop: "16px" }}>
        <Pie data={data} options={options} />
      </div>
    </div>
  )
}

export default HabitChart