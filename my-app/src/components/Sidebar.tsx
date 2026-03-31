import { Link, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"

import {
FaChartLine,
FaFire,
FaBrain,
FaTasks,
FaSignOutAlt,
FaMoon,
FaSun,
FaUsers,
FaChartBar
} from "react-icons/fa"

type Props = {
open: boolean
}

function Sidebar({open}:Props){

const navigate = useNavigate()

/* -------- USER -------- */

const user = JSON.parse(localStorage.getItem("user") || "{}")
const role = user.role || "user"

/* -------- THEME -------- */

const [darkMode,setDarkMode] = useState(
localStorage.getItem("theme") !== "light"
)

useEffect(()=>{

if(darkMode){
document.documentElement.classList.remove("light")
localStorage.setItem("theme","dark")
}else{
document.documentElement.classList.add("light")
localStorage.setItem("theme","light")
}

},[darkMode])

/* -------- LOGOUT -------- */

const logout = ()=>{
localStorage.removeItem("user")
navigate("/")
}

return(

<div className={`sidebar ${open ? "" : "closed"}`}>

<h1>Dopamind</h1>

{/* ---------- USER SIDEBAR ---------- */}

{role === "user" && (

<>

<Link to="/client/dashboard">
<FaChartLine/>
<span>Dashboard</span>
</Link>

<Link to="/client/tasks">
<FaTasks/>
<span>Tasks</span>
</Link>

<Link to="/client/habits">
<FaFire/>
<span>Habits</span>
</Link>

<Link to="/client/recommendations">
<FaBrain/>
<span>Recommendations</span>
</Link>

</>

)}

{/* ---------- ADMIN SIDEBAR ---------- */}

{role === "admin" && (

<>

<Link to="/admin/dashboard">
<FaChartBar/>
<span>Dashboard</span>
</Link>

<Link to="/admin/users">
<FaUsers/>
<span>Users</span>
</Link>

<Link to="/admin/analytics">
<FaChartLine/>
<span>Analytics</span>
</Link>

</>

)}

{/* ---------- BOTTOM CONTROLS ---------- */}

<div style={{marginTop:"auto"}}>

<button onClick={()=>setDarkMode(!darkMode)}>

{darkMode ? <FaSun/> : <FaMoon/>}

<span>
{darkMode ? "Light Mode" : "Dark Mode"}
</span>

</button>

<button onClick={logout}>

<FaSignOutAlt/>

<span>Logout</span>

</button>

</div>

</div>

)

}

export default Sidebar