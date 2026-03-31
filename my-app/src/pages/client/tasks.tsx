import { useState, useEffect } from "react"
import Sidebar from "../../components/Sidebar"
import Navbar from "../../components/Navbar"
import { getTasks, createTask, updateTask, deleteTask } from "../../api/api"

function Tasks(){

const [sidebarOpen, setSidebarOpen] = useState(true)
const [tasks, setTasks] = useState<any[]>([])
const [taskInput, setTaskInput] = useState("")
const [loading, setLoading] = useState(true)

const toggleSidebar = () => {
  setSidebarOpen(!sidebarOpen)
}

/* ---------- FETCH TASKS ---------- */

useEffect(() => {
  const fetchTasks = async () => {
    try {
      const { data } = await getTasks()
      setTasks(data)
    } catch (err) {
      console.error("Failed to fetch tasks", err)
    } finally {
      setLoading(false)
    }
  }
  fetchTasks()
}, [])

/* ---------- ADD TASK ---------- */

const addTask = async () => {
  if(taskInput.trim() === "") return
  try {
    const { data } = await createTask({
      title: taskInput,
      category: "General"
    })
    setTasks([...tasks, data])
    setTaskInput("")
  } catch (err) {
    console.error("Failed to add task", err)
  }
}

/* ---------- TOGGLE TASK ---------- */

const toggleTask = async (id: string, done: boolean) => {
  try {
    const { data } = await updateTask(id, {
      completed: !done,
    })
    setTasks(tasks.map(t => t._id === id ? data : t))
  } catch (err) {
    console.error("Failed to update task", err)
  }
}

/* ---------- DELETE TASK ---------- */

const handleDelete = async (id: string) => {
  try {
    await deleteTask(id)
    setTasks(tasks.filter(t => t._id !== id))
  } catch (err) {
    console.error("Failed to delete task", err)
  }
}

const completed = tasks.filter(t => t.completed).length
const total = tasks.length
const remaining = total - completed
const progress = total === 0 ? 0 : Math.round((completed / total) * 100)

return(

<div className="dashboard-wrapper">

<Sidebar open={sidebarOpen}/>

<div className="dashboard-content">

<Navbar toggleSidebar={toggleSidebar}/>

<div className="page-content">

<h1>Tasks</h1>

{/* TASK STATS */}

<div className="dashboard-grid">

<div className="card">
<h3>Tasks Completed</h3>
<h2>{completed}</h2>
</div>

<div className="card">
<h3>Tasks Remaining</h3>
<h2>{remaining}</h2>
</div>

<div className="card">
<h3>Total Tasks</h3>
<h2>{total}</h2>
</div>

</div>

{/* PROGRESS BAR */}

<div className="card" style={{marginTop:"25px"}}>

<h3>Daily Task Progress</h3>

<div style={{height:"12px",background:"#1e293b",borderRadius:"8px",marginTop:"10px"}}>

<div style={{
  width:`${progress}%`,
  height:"100%",
  background:"#38bdf8",
  borderRadius:"8px"
}}></div>

</div>

<p style={{marginTop:"10px"}}>
{completed} / {total} tasks completed
</p>

</div>

{/* ADD TASK */}

<div className="card" style={{marginTop:"25px"}}>

<h3>Add New Task</h3>

<div style={{display:"flex",gap:"10px",marginTop:"10px"}}>

<input
  value={taskInput}
  onChange={(e) => setTaskInput(e.target.value)}
  onKeyDown={(e) => e.key === "Enter" && addTask()}
  placeholder="Enter new task"
  style={{padding:"10px",flex:1,borderRadius:"6px",border:"1px solid #ccc"}}
/>

<button onClick={addTask}>Add</button>

</div>

</div>

{/* TASK LIST */}

<div className="card" style={{marginTop:"25px"}}>

<h3>Today's Tasks</h3>

{loading ? (
  <p style={{marginTop:"12px",opacity:0.6}}>Loading tasks...</p>
) : tasks.length === 0 ? (
  <p style={{marginTop:"12px",opacity:0.6}}>No tasks yet. Add one above!</p>
) : (
  tasks.map(task => (

    <div
      key={task._id}
      style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginTop:"12px"}}
    >

      <div>

        <span style={{
          textDecoration: task.completed ? "line-through" : "none",
          fontWeight:"500"
        }}>
          {task.title}
        </span>

        <span style={{fontSize:"12px",marginLeft:"8px",opacity:0.6}}>
          ({task.priority || "General"})
        </span>

      </div>

      <div style={{display:"flex",gap:"10px"}}>

        <button onClick={() => toggleTask(task._id, task.completed)}>
          {task.completed ? "Undo" : "Done"}
        </button>

        <button onClick={() => handleDelete(task._id)}>
          Delete
        </button>

      </div>

    </div>
  ))
)}

</div>

{/* ACHIEVEMENTS */}

<div className="card" style={{marginTop:"25px"}}>

<h3>Task Achievements</h3>

<div style={{display:"flex",gap:"25px",marginTop:"15px"}}>

<div style={{textAlign:"center",opacity:completed>=1?1:0.3}}>
🥉
<p>First Task</p>
</div>

<div style={{textAlign:"center",opacity:completed>=3?1:0.3}}>
🥈
<p>3 Tasks Done</p>
</div>

<div style={{textAlign:"center",opacity:completed===total && total>0?1:0.3}}>
🥇
<p>All Tasks Completed</p>
</div>

</div>

</div>

</div>

</div>

</div>

)

}

export default Tasks