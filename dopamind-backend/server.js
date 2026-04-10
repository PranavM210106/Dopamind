const express = require("express")
const dotenv = require("dotenv")
const cors = require("cors")
const connectDB = require("./config/db")

dotenv.config()
connectDB()

const app = express()

app.use(cors())
app.use(express.json())

const { protect, adminOnly, userOnly } = require("./middleware/authMiddleware")

// Public
app.use("/api/auth", require("./routes/authRoutes"))

// User routes — only logged in users with role "user"
app.use("/api/tasks",     protect, userOnly,  require("./routes/taskRoutes"))
app.use("/api/habits",    protect, userOnly,  require("./routes/habitRoutes"))
app.use("/api/analytics", protect,            require("./routes/analyticsRoutes"))
app.use("/api/profile",   protect,            require("./routes/profileRoutes"))

// Admin routes — only admins
app.use("/api/admin",     protect, adminOnly, require("./routes/adminRoutes"))

app.get("/", (req, res) => res.send("Dopamind API Running ✅"))

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))