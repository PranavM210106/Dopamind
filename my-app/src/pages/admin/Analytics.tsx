import Sidebar from "../../components/Sidebar"
import Navbar from "../../components/Navbar"
import { useState, useEffect } from "react"
import { getGlobalStats } from "../../api/api"

function Analytics(){

const [sidebarOpen, setSidebarOpen] = useState(true)
const [stats, setStats] = useState<any>(null)
const [loading, setLoading] = useState(true)

const toggleSidebar = () => {
  setSidebarOpen(!sidebarOpen)
}

/* ---------- FETCH GLOBAL STATS ---------- */

useEffect(() => {
  const fetchStats = async () => {
    try {
      const { data } = await getGlobalStats()
      setStats(data)
    } catch (err) {
      console.error("Failed to fetch stats", err)
    } finally {
      setLoading(false)
    }
  }
  fetchStats()
}, [])

return(

<div className="dashboard-wrapper">

<Sidebar open={sidebarOpen}/>

<div className="dashboard-content">

<Navbar toggleSidebar={toggleSidebar}/>

<div className="page-content">

<h1>Platform Analytics</h1>

{/* STATS */}

<div className="dashboard-grid">

<div className="card">
<h3>Total Tasks Completed</h3>
<h1>{loading ? "..." : stats?.completedTasks ?? 0}</h1>
</div>

<div className="card">
<h3>Total Habits</h3>
<h1>{loading ? "..." : stats?.totalHabits ?? 0}</h1>
</div>

<div className="card">
<h3>Average Dopamine Score</h3>
<h1>{loading ? "..." : stats?.avgDopamineScore ?? 0}</h1>
</div>

<div className="card">
<h3>Total Users</h3>
<h1>{loading ? "..." : stats?.totalUsers ?? 0}</h1>
</div>

</div>

{/* PLATFORM INSIGHTS */}

<div className="analytics-grid">

<div className="card">

<h3>Habit Distribution</h3>

<ul style={{marginTop:"10px",lineHeight:"28px"}}>
  <li>Exercise – 40%</li>
  <li>Study – 30%</li>
  <li>Meditation – 20%</li>
  <li>Reading – 10%</li>
</ul>

</div>

<div className="card">

<h3>Productivity Insights</h3>

<ul style={{marginTop:"10px",lineHeight:"28px"}}>
  <li>Users complete most tasks in the morning</li>
  <li>Average focus time is 3.8 hours</li>
  <li>Exercise habits improve dopamine score by 15%</li>
  <li>Meditation improves streak consistency</li>
</ul>

</div>

<div className="card">

<h3>Platform Activity</h3>

{loading ? (
  <p style={{marginTop:"10px",opacity:0.6}}>Loading...</p>
) : (
  <ul style={{marginTop:"10px",lineHeight:"28px"}}>
    <li>{stats?.totalUsers ?? 0} total users</li>
    <li>{stats?.blockedUsers ?? 0} blocked users</li>
    <li>{stats?.completedTasks ?? 0} tasks completed</li>
    <li>{stats?.totalHabits ?? 0} total habits tracked</li>
  </ul>
)}

</div>

</div>

</div>

</div>

</div>

)

}

export default Analytics