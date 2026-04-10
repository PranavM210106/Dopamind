const User = require("../models/User")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

// role is now included in the token
const generateToken = (id, role) =>
  jwt.sign({ id, role }, process.env.JWT_SECRET, { expiresIn: "7d" })

// @POST /api/auth/register
const register = async (req, res) => {
  try {
    const { name, email, password } = req.body  // role is NOT accepted from client

    if (!name || !email || !password)
      return res.status(400).json({ message: "All fields are required" })

    const exists = await User.findOne({ email })
    if (exists)
      return res.status(400).json({ message: "Email already registered" })

    const hashed = await bcrypt.hash(password, 10)
    const user = await User.create({
      name,
      email,
      password: hashed,
      role: "user"  // always forced to "user", never from request
    })

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      dopamineScore: user.dopamineScore,
      token: generateToken(user._id, user.role),
    })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

// @POST /api/auth/login
const login = async (req, res) => {
  try {
    const { email, password } = req.body

    if (!email || !password)
      return res.status(400).json({ message: "All fields are required" })

    const user = await User.findOne({ email })
    if (!user)
      return res.status(400).json({ message: "Invalid credentials" })

    if (user.isBlocked)
      return res.status(403).json({ message: "Account blocked. Contact support." })

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" })

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      dopamineScore: user.dopamineScore,
      token: generateToken(user._id, user.role),
    })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

// @GET /api/auth/me
const getMe = async (req, res) => {
  res.json(req.user)
}

module.exports = { register, login, getMe }