import { useState, useEffect } from "react"
import Sidebar from "../../components/Sidebar"
import Navbar from "../../components/Navbar"
import { getProfile, updateProfile } from "../../api/api"
import { FaUserCircle } from "react-icons/fa"

function Profile() {

const [sidebarOpen, setSidebarOpen] = useState(true)
const [loading, setLoading] = useState(true)
const [saving, setSaving] = useState(false)
const [success, setSuccess] = useState("")
const [error, setError] = useState("")

const [form, setForm] = useState({
  name: "",
  email: "",
  phone: "",
  height: "",
  weight: "",
  profession: "",
  status: "student",
  bio: "",
  dob: "",
  motivation: "",
  profilePhoto: "",
})

useEffect(() => {
  const fetchProfile = async () => {
    try {
      const { data } = await getProfile()
      setForm({
        name: data.name || "",
        email: data.email || "",
        phone: data.phone || "",
        height: data.height || "",
        weight: data.weight || "",
        profession: data.profession || "",
        status: data.status || "student",
        bio: data.bio || "",
        dob: data.dob || "",
        motivation: data.motivation || "",
        profilePhoto: data.profilePhoto || "",
      })
    } catch (err) {
      setError("Failed to load profile")
    } finally {
      setLoading(false)
    }
  }
  fetchProfile()
}, [])

const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
  setForm({ ...form, [e.target.name]: e.target.value })
}

const handleSave = async () => {
  try {
    setSaving(true)
    setSuccess("")
    setError("")
    await updateProfile(form)
    setSuccess("Profile updated successfully!")
  } catch (err) {
    setError("Failed to update profile")
  } finally {
    setSaving(false)
  }
}

return (

<div className="dashboard-wrapper">

  <Sidebar open={sidebarOpen} />

  <div className="dashboard-content">

    <Navbar toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

    <div className="page-content">

      <h1>My Profile</h1>

      {loading ? <p>Loading...</p> : (

        <div className="card" style={{ maxWidth: "700px", padding: "30px" }}>

          {/* PROFILE PHOTO */}
          <div style={{ display: "flex", alignItems: "center", gap: "20px", marginBottom: "30px" }}>
            {form.profilePhoto
              ? <img src={form.profilePhoto} alt="profile" style={{ width: "80px", height: "80px", borderRadius: "50%", objectFit: "cover" }} />
              : <FaUserCircle size={80} color="#a78bfa" />
            }
            <div>
              <h2>{form.name}</h2>
              <p style={{ color: "#94a3b8", fontSize: "14px" }}>{form.email}</p>
            </div>
          </div>

          {success && <p style={{ color: "#4ade80", marginBottom: "15px" }}>{success}</p>}
          {error && <p style={{ color: "#f87171", marginBottom: "15px" }}>{error}</p>}

          {/* FORM FIELDS */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>

            <div className="form-group">
              <label>Phone Number</label>
              <input name="phone" value={form.phone} onChange={handleChange} placeholder="+91 XXXXX XXXXX" />
            </div>

            <div className="form-group">
              <label>Date of Birth</label>
              <input name="dob" type="date" value={form.dob} onChange={handleChange} />
            </div>

            <div className="form-group">
              <label>Height (cm)</label>
              <input name="height" value={form.height} onChange={handleChange} placeholder="e.g. 175" />
            </div>

            <div className="form-group">
              <label>Weight (kg)</label>
              <input name="weight" value={form.weight} onChange={handleChange} placeholder="e.g. 70" />
            </div>

            <div className="form-group">
              <label>Profession</label>
              <input name="profession" value={form.profession} onChange={handleChange} placeholder="e.g. Software Engineer" />
            </div>

            <div className="form-group">
              <label>Status</label>
              <select name="status" value={form.status} onChange={handleChange}>
                <option value="working">Working</option>
                <option value="non-working">Non-Working</option>
                <option value="student">Student</option>
              </select>
            </div>

            <div className="form-group" style={{ gridColumn: "1 / -1" }}>
              <label>Profile Photo URL</label>
              <input name="profilePhoto" value={form.profilePhoto} onChange={handleChange} placeholder="https://..." />
            </div>

            <div className="form-group" style={{ gridColumn: "1 / -1" }}>
              <label>Bio</label>
              <textarea name="bio" value={form.bio} onChange={handleChange} placeholder="Tell us about yourself..." rows={3} style={{ width: "100%", background: "#0f172a", color: "#fff", border: "1px solid #334155", borderRadius: "8px", padding: "10px" }} />
            </div>

            <div className="form-group" style={{ gridColumn: "1 / -1" }}>
              <label>Motivation to be Fit</label>
              <textarea name="motivation" value={form.motivation} onChange={handleChange} placeholder="What motivates you to stay fit?" rows={3} style={{ width: "100%", background: "#0f172a", color: "#fff", border: "1px solid #334155", borderRadius: "8px", padding: "10px" }} />
            </div>

          </div>

          <button
            className="login-btn"
            style={{ marginTop: "25px", width: "150px" }}
            onClick={handleSave}
            disabled={saving}
          >
            {saving ? "Saving..." : "Save Profile"}
          </button>

        </div>

      )}

    </div>

  </div>

</div>

)
}

export default Profile