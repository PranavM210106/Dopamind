import { useState, useEffect } from "react"
import Sidebar from "../../components/Sidebar"
import Navbar from "../../components/Navbar"
import { getHabits, createHabit, completeHabit, deleteHabit } from "../../api/api"

function Habits(){

const [sidebarOpen, setSidebarOpen] = useState(true)
const [habits, setHabits] = useState<any[]>([])
const [habitInput, setHabitInput] = useState("")
const [loading, setLoading] = useState(true)
const [error, setError] = useState("")

const toggleSidebar = () => {
  setSidebarOpen(!sidebarOpen)
}

/* ---------- FETCH HABITS ---------- */

useEffect(() => {
  const fetchHabits = async () => {
    try {
      const { data } = await getHabits()
      setHabits(data)
    } catch (err) {
      console.error("Failed to fetch habits", err)
    } finally {
      setLoading(false)
    }
  }
  fetchHabits()
}, [])

/* ---------- ADD HABIT ---------- */

const addHabit = async () => {
  if(habitInput.trim() === "") return
  try {
    const { data } = await createHabit({
      habitName: habitInput,
      frequency: "daily"
    })
    setHabits([...habits, data])
    setHabitInput("")
  } catch (err) {
    console.error("Failed to add habit", err)
  }
}

/* ---------- COMPLETE HABIT ---------- */

const handleComplete = async (id: string) => {
  setError("")
  try {
    const { data } = await completeHabit(id)
    setHabits(habits.map(h => h._id === id ? data.habit : h))
  } catch (err: any) {
    setError(err.response?.data?.message || "Already completed recently")
  }
}

/* ---------- DELETE HABIT ---------- */

const handleDelete = async (id: string) => {
  try {
    await deleteHabit(id)
    setHabits(habits.filter(h => h._id !== id))
  } catch (err) {
    console.error("Failed to delete habit", err)
  }
}

/* ---------- STATS ---------- */

const completed = habits.filter(h => {
  if(!h.lastCompleted) return false
  const last = new Date(h.lastCompleted)
  const now = new Date()
  const hoursDiff = (now.getTime() - last.getTime()) / (1000 * 60 * 60)
  return hoursDiff < 24
}).length

const total = habits.length
const progress = total === 0 ? 0 : Math.round((completed / total) * 100)
const maxStreak = habits.reduce((max, h) => Math.max(max, h.streak || 0), 0)

return(

<div className="dashboard-wrapper">

<Sidebar open={sidebarOpen}/>

<div className="dashboard-content">

<Navbar toggleSidebar={toggleSidebar}/>

<div className="page-content">

<h1>Habits</h1>

{/* STREAK CARD */}

<div className="card" style={{marginBottom:"20px"}}>
<h3>Current Streak</h3>
<h2>{maxStreak} Days 🔥</h2>
</div>

{/* PROGRESS CARD */}

<div className="card" style={{marginBottom:"25px"}}>

<h3>Daily Habit Progress</h3>

<div style={{height:"12px",background:"#1e293b",borderRadius:"8px",marginTop:"10px"}}>
<div style={{
  width:`${progress}%`,
  height:"100%",
  background:"#22c55e",
  borderRadius:"8px"
}}></div>
</div>

<p style={{marginTop:"10px"}}>
{completed} / {total} habits completed today
</p>

</div>

{/* ADD HABIT */}

<div className="card" style={{marginBottom:"25px"}}>

<h3>Add New Habit</h3>

<div style={{display:"flex",gap:"10px",marginTop:"10px"}}>

<input
  value={habitInput}
  onChange={(e) => setHabitInput(e.target.value)}
  onKeyDown={(e) => e.key === "Enter" && addHabit()}
  placeholder="Enter new habit"
  style={{padding:"10px",flex:1,borderRadius:"6px",border:"1px solid #ccc"}}
/>

<button onClick={addHabit}>Add</button>

</div>

</div>

{/* HABITS LIST */}

<div className="card" style={{marginBottom:"25px"}}>

<h3>Today's Habits</h3>

{error && <p style={{color:"#f87171",marginTop:"8px"}}>{error}</p>}

{loading ? (
  <p style={{marginTop:"12px",opacity:0.6}}>Loading habits...</p>
) : habits.length === 0 ? (
  <p style={{marginTop:"12px",opacity:0.6}}>No habits yet. Add one above!</p>
) : (
  habits.map(habit => {

    const isCompletedToday = habit.lastCompleted
      ? (new Date().getTime() - new Date(habit.lastCompleted).getTime()) / (1000*60*60) < 24
      : false

    return (
      <div
        key={habit._id}
        style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginTop:"12px"}}
      >

        <div>
          <span style={{
            textDecoration: isCompletedToday ? "line-through" : "none",
            fontWeight:"500"
          }}>
            {habit.habitName}
          </span>
          <span style={{fontSize:"12px",marginLeft:"8px",opacity:0.6}}>
            🔥 {habit.streak} day streak
          </span>
        </div>

        <div style={{display:"flex",gap:"10px"}}>

          <button
            onClick={() => handleComplete(habit._id)}
            disabled={isCompletedToday}
            style={{
              padding:"6px 10px",
              background: isCompletedToday ? "#334155" : "#38bdf8",
              border:"none",
              cursor: isCompletedToday ? "not-allowed" : "pointer"
            }}
          >
            {isCompletedToday ? "Done ✓" : "Complete"}
          </button>

          <button onClick={() => handleDelete(habit._id)}>
            Delete
          </button>

        </div>

      </div>
    )
  })
)}

</div>

{/* WEEKLY TRACKER */}

<div className="card" style={{marginBottom:"25px"}}>

<h3>Weekly Habit Tracker</h3>

<div style={{display:"flex",gap:"12px",marginTop:"15px"}}>

{["Mon","Tue","Wed","Thu","Fri","Sat","Sun"].map((day, i) => {

  const today = new Date().getDay()
  const todayIndex = today === 0 ? 6 : today - 1
  const isPast = i < todayIndex
  const isToday = i === todayIndex

  const hasCompletion = habits.some(h => {
    if(!h.lastCompleted) return false
    const completedDay = new Date(h.lastCompleted).getDay()
    const completedIndex = completedDay === 0 ? 6 : completedDay - 1
    return completedIndex === i
  })

  return (
    <div key={day} style={{textAlign:"center", opacity: isPast && !hasCompletion ? 0.4 : 1}}>
      {day} {isToday && completed > 0 ? "✔" : hasCompletion ? "✔" : isPast ? "✖" : "–"}
    </div>
  )

})}

</div>

</div>

{/* MEDALS */}

<div className="card">

<h3>Achievements</h3>

<div style={{display:"flex",gap:"25px",marginTop:"15px"}}>

<div style={{textAlign:"center",opacity:completed>=1?1:0.3}}>
🥉
<p>First Habit</p>
</div>

<div style={{textAlign:"center",opacity:completed>=3?1:0.3}}>
🥈
<p>Productive</p>
</div>

<div style={{textAlign:"center",opacity:completed===total && total>0?1:0.3}}>
🥇
<p>Perfect Day</p>
</div>

</div>

</div>

</div>

</div>

</div>

)

}

export default Habits