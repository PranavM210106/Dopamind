import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"

import Login from "./pages/Login"

import ClientDashboard from "./pages/client/Dashboard"
import Habits from "./pages/client/Habits"
import AdminDashboard from "./pages/admin/Dashboard"
import Users from "./pages/admin/Users"
import Analytics from "./pages/admin/Analytics"
import Recommendations from "./pages/client/Recommendations"
import Tasks from "./pages/client/Tasks"
import Profile from "./pages/client/Profile"

/* ---------- PROTECTED ROUTE ---------- */

const ProtectedRoute = ({ children, requiredRole }: { children: any, requiredRole?: string }) => {
  const stored = localStorage.getItem("user")
  if (!stored) return <Navigate to="/" />
  
  const user = JSON.parse(stored)
  if (requiredRole && user.role !== requiredRole) return <Navigate to="/" />
  
  return children
}

/* ---------- APP ---------- */

function App(){

return(

<BrowserRouter>

<Routes>

{/* Public */}
<Route path="/" element={<Login/>}/>

{/* Client Routes */}
<Route path="/client/dashboard" element={
  <ProtectedRoute requiredRole="user">
    <ClientDashboard/>
  </ProtectedRoute>
}/>

<Route path="/client/habits" element={
  <ProtectedRoute requiredRole="user">
    <Habits/>
  </ProtectedRoute>
}/>

<Route path="/client/tasks" element={
  <ProtectedRoute requiredRole="user">
    <Tasks/>
  </ProtectedRoute>
}/>

<Route path="/client/recommendations" element={
  <ProtectedRoute requiredRole="user">
    <Recommendations/>
  </ProtectedRoute>
}/>

{/* Admin Routes */}
<Route path="/admin/dashboard" element={
  <ProtectedRoute requiredRole="admin">
    <AdminDashboard/>
  </ProtectedRoute>
}/>

<Route path="/admin/users" element={
  <ProtectedRoute requiredRole="admin">
    <Users/>
  </ProtectedRoute>
}/>

<Route path="/admin/analytics" element={
  <ProtectedRoute requiredRole="admin">
    <Analytics/>
  </ProtectedRoute>
}/>
<Route path="/client/profile" element={<Profile />} />
{/* Catch all */}
<Route path="*" element={<Navigate to="/"/>}/>

</Routes>

</BrowserRouter>

)

}

export default App