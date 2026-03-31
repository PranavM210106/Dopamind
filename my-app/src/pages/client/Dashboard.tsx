import { useState, useEffect } from "react"

import Sidebar from "../../components/Sidebar"
import Navbar from "../../components/Navbar"
import StatCard from "../../components/StatCard"

import DopamineChart from "../../components/DopamineChart"
import ProductivityChart from "../../components/ProductivityChart"
import HabitChart from "../../components/HabitChart"
import DopamineMeter from "../../components/DopamineMeter"

import { FaBrain, FaFire, FaClock, FaChartLine } from "react-icons/fa"
import { FaCheckCircle, FaList } from "react-icons/fa"

import { getAnalytics } from "../../api/api"

function Dashboard(){

const user = JSON.parse(localStorage.getItem("user") || "{}")

const [sidebarOpen, setSidebarOpen] = useState(true)
const [analytics, setAnalytics] = useState<any>(null)
const [loading, setLoading] = useState(true)

const toggleSidebar = () => {
  setSidebarOpen(!sidebarOpen)
}

/* ---------- FETCH ANALYTICS ---------- */

useEffect(() => {
  const fetchAnalytics = async () => {
    try {
      const { data } = await getAnalytics()
      setAnalytics(data)
    } catch (err) {
      console.error("Failed to fetch analytics", err)
    } finally {
      setLoading(false)
    }
  }
  fetchAnalytics()
}, [])

return(

<div className="dashboard-wrapper">

<Sidebar open={sidebarOpen}/>

<div className="dashboard-content">

<Navbar toggleSidebar={toggleSidebar}/>

<div className="page-content">

<h1>Welcome, {user?.name || "User"} 👋</h1>

{/* STAT CARDS */}

<div className="dashboard-grid">

<StatCard
  title="Dopamine Score"
  value={loading ? "..." : analytics?.dopamineScore ?? 0}
  icon={FaBrain}
/>
<StatCard
  title="Habit Streak"
  value={loading ? "..." : `${analytics?.avgStreak ?? 0} Days`}
  icon={FaFire}
/>
<StatCard
  title="Focus Hours"
  value="5.5h"
  icon={FaClock}
/>
<StatCard
  title="Productivity"
  value={loading ? "..." : analytics?.completedTasks > 5 ? "High" : analytics?.completedTasks > 2 ? "Medium" : "Low"}
  icon={FaChartLine}
/>
<StatCard
  title="Tasks Completed"
  value={loading ? "..." : analytics?.completedTasks ?? 0}
  icon={FaCheckCircle}
/>
<StatCard
  title="Tasks Remaining"
  value={loading ? "..." : analytics?.pendingTasks ?? 0}
  icon={FaList}
/>

</div>

{/* CHARTS */}

<div className="analytics-grid">

<DopamineChart/>
<ProductivityChart/>
<HabitChart/>
<DopamineMeter score={analytics?.dopamineScore ?? 0}/>

</div>

{/* INSIGHTS */}

<div style={{marginTop:"30px"}} className="card">

<h3>Insights</h3>

<ul style={{marginTop:"10px",lineHeight:"28px"}}>

{loading ? (
  <li>Loading insights...</li>
) : (
  <>
    <li>Your dopamine score is currently <strong>{analytics?.dopamineScore ?? 0}</strong></li>
    <li>You have completed <strong>{analytics?.completedTasks ?? 0}</strong> tasks total</li>
    <li>You have <strong>{analytics?.totalHabits ?? 0}</strong> active habits</li>
    <li>Average habit streak: <strong>{analytics?.avgStreak ?? 0} days</strong></li>
    <li>Tasks completed in last 7 days: <strong>{analytics?.recentCompletions ?? 0}</strong></li>
  </>
)}

</ul>

</div>

</div>

</div>

</div>

)

}

export default Dashboard