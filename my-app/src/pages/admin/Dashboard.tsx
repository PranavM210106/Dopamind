import Sidebar from "../../components/Sidebar"
import Navbar from "../../components/Navbar"
import { useState, useEffect } from "react"
import { getGlobalStats } from "../../api/api"

function AdminDashboard(){

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

<h1>Admin Dashboard</h1>

<div className="dashboard-grid">

<div className="card">
<h3>Total Users</h3>
<h1>{loading ? "..." : stats?.totalUsers ?? 0}</h1>
</div>

<div className="card">
<h3>Blocked Users</h3>
<h1>{loading ? "..." : stats?.blockedUsers ?? 0}</h1>
</div>

<div className="card">
<h3>Total Tasks Completed</h3>
<h1>{loading ? "..." : stats?.completedTasks ?? 0}</h1>
</div>

<div className="card">
<h3>Average Dopamine Score</h3>
<h1>{loading ? "..." : stats?.avgDopamineScore ?? 0}</h1>
</div>

<div className="card">
<h3>Total Habits</h3>
<h1>{loading ? "..." : stats?.totalHabits ?? 0}</h1>
</div>

<div className="card">
<h3>Total Tasks</h3>
<h1>{loading ? "..." : stats?.totalTasks ?? 0}</h1>
</div>

</div>

</div>

</div>

</div>

)

}

export default AdminDashboard