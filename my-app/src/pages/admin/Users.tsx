import Sidebar from "../../components/Sidebar"
import Navbar from "../../components/Navbar"
import { useState, useEffect } from "react"
import { getAllUsers, blockUser, unblockUser, deleteUser } from "../../api/api"

function Users(){

const [sidebarOpen, setSidebarOpen] = useState(true)
const [search, setSearch] = useState("")
const [users, setUsers] = useState<any[]>([])
const [loading, setLoading] = useState(true)

const toggleSidebar = () => {
  setSidebarOpen(!sidebarOpen)
}

/* ---------- FETCH USERS ---------- */

useEffect(() => {
  const fetchUsers = async () => {
    try {
      const { data } = await getAllUsers()
      setUsers(data)
    } catch (err) {
      console.error("Failed to fetch users", err)
    } finally {
      setLoading(false)
    }
  }
  fetchUsers()
}, [])

/* ---------- BLOCK / UNBLOCK ---------- */

const handleBlock = async (id: string, isBlocked: boolean) => {
  try {
    if(isBlocked){
      await unblockUser(id)
    } else {
      await blockUser(id)
    }
    setUsers(users.map(u =>
      u._id === id ? { ...u, isBlocked: !isBlocked } : u
    ))
  } catch (err) {
    console.error("Failed to block/unblock user", err)
  }
}

/* ---------- DELETE ---------- */

const handleDelete = async (id: string) => {
  try {
    await deleteUser(id)
    setUsers(users.filter(u => u._id !== id))
  } catch (err) {
    console.error("Failed to delete user", err)
  }
}

const filteredUsers = users.filter(user =>
  user.name.toLowerCase().includes(search.toLowerCase())
)

const activeUsers = users.filter(u => !u.isBlocked).length
const avgScore = users.length
  ? Math.round(users.reduce((sum, u) => sum + (u.dopamineScore || 0), 0) / users.length)
  : 0

return(

<div className="dashboard-wrapper">

<Sidebar open={sidebarOpen}/>

<div className="dashboard-content">

<Navbar toggleSidebar={toggleSidebar}/>

<div className="page-content">

<h1>Users</h1>

{/* USER STATS */}

<div className="dashboard-grid">

<div className="card">
<h3>Total Users</h3>
<h1>{users.length}</h1>
</div>

<div className="card">
<h3>Active Users</h3>
<h1>{activeUsers}</h1>
</div>

<div className="card">
<h3>Average Score</h3>
<h1>{avgScore}</h1>
</div>

</div>

{/* SEARCH */}

<div className="card" style={{marginTop:"25px"}}>

<input
  value={search}
  onChange={(e) => setSearch(e.target.value)}
  placeholder="Search users..."
  style={{
    padding:"10px",
    width:"100%",
    borderRadius:"6px",
    border:"1px solid #ccc"
  }}
/>

</div>

{/* USER TABLE */}

<div className="card" style={{marginTop:"25px"}}>

<h3>User List</h3>

{loading ? (
  <p style={{marginTop:"12px",opacity:0.6}}>Loading users...</p>
) : filteredUsers.length === 0 ? (
  <p style={{marginTop:"12px",opacity:0.6}}>No users found</p>
) : (

<table style={{width:"100%",marginTop:"10px"}}>

<thead>
<tr>
<th>Name</th>
<th>Email</th>
<th>Dopamine Score</th>
<th>Status</th>
<th>Action</th>
</tr>
</thead>

<tbody>

{filteredUsers.map(user => (

<tr key={user._id}>

<td>{user.name}</td>
<td>{user.email}</td>
<td>{user.dopamineScore ?? 0}</td>

<td style={{color: user.isBlocked ? "#f87171" : "#22c55e"}}>
  {user.isBlocked ? "Blocked" : "Active"}
</td>

<td>
<div style={{display:"flex",gap:"8px"}}>

<button
  onClick={() => handleBlock(user._id, user.isBlocked)}
  style={{
    background: user.isBlocked ? "#22c55e" : "#f59e0b",
    border:"none",
    padding:"4px 8px",
    cursor:"pointer",
    borderRadius:"4px"
  }}
>
  {user.isBlocked ? "Unblock" : "Block"}
</button>

<button
  onClick={() => handleDelete(user._id)}
  style={{
    background:"#ef4444",
    border:"none",
    padding:"4px 8px",
    cursor:"pointer",
    borderRadius:"4px",
    color:"white"
  }}
>
  Delete
</button>

</div>
</td>

</tr>

))}

</tbody>

</table>

)}

</div>

</div>

</div>

</div>

)

}

export default Users