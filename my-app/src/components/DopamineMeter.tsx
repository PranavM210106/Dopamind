import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from "chart.js"
import { Doughnut } from "react-chartjs-2"

ChartJS.register(ArcElement, Tooltip, Legend)

function DopamineMeter({ score = 78 }) {
  const data = {
    labels: ["Score", "Remaining"],
    datasets: [{
      data: [score, 100 - score],
      backgroundColor: ["#22c55e", "#1e293b"],
      borderWidth: 0
    }]
  }

  const options = {
    cutout: "75%",
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false }
    }
  }

  return (
    <div className="card">
      <h3>Dopamine Balance</h3>
      <div style={{ position: "relative", height: "250px", marginTop: "16px" }}>
        <Doughnut data={data} options={options} />
      </div>
      <h2 style={{ textAlign: "center", marginTop: "12px" }}>{score}%</h2>
    </div>
  )
}

export default DopamineMeter