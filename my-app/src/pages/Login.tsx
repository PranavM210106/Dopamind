import { useState } from "react"
import { useNavigate } from "react-router-dom"
import "../styles/login.css"
import { loginUser, registerUser } from "../api/api"
import { useAuth } from "../context/AuthContext"

function Login(){

const navigate = useNavigate()
const { login } = useAuth()

const [email, setEmail] = useState("")
const [password, setPassword] = useState("")
const [name, setName] = useState("")
const [isLogin, setIsLogin] = useState(true)

const [emailError, setEmailError] = useState("")
const [passwordError, setPasswordError] = useState("")
const [serverError, setServerError] = useState("")

/* ---------- EMAIL VALIDATION ---------- */

const validateEmail = (email: string) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

/* ---------- LOGIN HANDLER ---------- */

const handleLogin = async (e: React.FormEvent) => {
  e.preventDefault()

  let valid = true
  setServerError("")

  if(!validateEmail(email)){
    setEmailError("Enter a valid email address")
    valid = false
  } else {
    setEmailError("")
  }

  if(password.length < 6){
    setPasswordError("Password must be at least 6 characters")
    valid = false
  } else {
    setPasswordError("")
  }

  if(!valid) return

  try {
    const { data } = isLogin
      ? await loginUser({ email, password })
      : await registerUser({ name, email, password, role: "user" })

    login(data)

    if(data.role === "admin"){
      navigate("/admin/dashboard")
    } else {
      navigate("/client/dashboard")
    }

  } catch (err: any) {
    setServerError(err.response?.data?.message || "Something went wrong")
  }
}

return(

<div className="login-page">

<div className="brand-section">

<div className="brand-logo">
Dopamind
</div>

<p className="brand-tagline">
Track habits, improve productivity, and optimize your dopamine balance.
</p>

</div>

<div className="login-section">

<div className="login-card">

<h2 className="login-title">
{isLogin ? "Login to your account" : "Create your account"}
</h2>

{serverError && <p className="error">{serverError}</p>}

<form onSubmit={handleLogin}>

{!isLogin && (
<div className="form-group">
<label>Name</label>
<input
  type="text"
  value={name}
  onChange={(e) => setName(e.target.value)}
  placeholder="Your full name"
/>
</div>
)}

<div className="form-group">

<label>Email</label>

<input
type="text"
value={email}
onChange={(e) => setEmail(e.target.value)}
placeholder="you@example.com"
/>

{emailError && <p className="error">{emailError}</p>}

</div>

<div className="form-group">

<label>Password</label>

<input
type="password"
value={password}
onChange={(e) => setPassword(e.target.value)}
placeholder="Enter password"
/>

{passwordError && <p className="error">{passwordError}</p>}

</div>

<button className="login-btn">
{isLogin ? "Login" : "Register"}
</button>

</form>

<div className="login-footer">
{isLogin ? "Don't have an account?" : "Already have an account?"}
<span
  onClick={() => setIsLogin(!isLogin)}
  style={{ color: "#a78bfa", cursor: "pointer", marginLeft: "6px" }}
>
  {isLogin ? "Register" : "Login"}
</span>
</div>

<div className="login-footer">
Dopamind © 2026
</div>

</div>

</div>

</div>

)

}

export default Login