import { useState } from "react"
import { FaBars, FaUserCircle } from "react-icons/fa"
import { useNavigate } from "react-router-dom"

type Props = {
  toggleSidebar: () => void
}

function Navbar({ toggleSidebar }: Props) {

const user = JSON.parse(localStorage.getItem("user") || "{}")
const [open, setOpen] = useState(false)
const navigate = useNavigate()

return (

<div className="navbar">

  <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
    <FaBars size={20} style={{ cursor: "pointer" }} onClick={toggleSidebar} />
    <h3>Dopamind</h3>
  </div>

  <div style={{ position: "relative" }}>

    <div
      style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer" }}
      onClick={() => setOpen(!open)}
    >
      <FaUserCircle size={26} />
      <span>{user.name}</span>
    </div>

    {open && (
      <div style={{
        position: "absolute",
        right: 0,
        top: "40px",
        background: "#020617",
        padding: "15px",
        borderRadius: "8px",
        width: "200px",
        zIndex: 999
      }}>
        <p><b>{user.name}</b></p>
        <p style={{ fontSize: "13px" }}>{user.email}</p>
        <hr style={{ margin: "10px 0", borderColor: "#334155" }} />
        <p
          style={{ cursor: "pointer", color: "#a78bfa", fontSize: "14px" }}
          onClick={() => { setOpen(false); navigate("/client/profile") }}
        >
          View Profile
        </p>
      </div>
    )}

  </div>

</div>

)
}

export default Navbar