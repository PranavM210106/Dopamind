const jwt = require("jsonwebtoken")
const User = require("../models/User")

// verifies token and attaches user to req
const protect = async (req, res, next) => {
  let token

  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    try {
      token = req.headers.authorization.split(" ")[1]
      const decoded = jwt.verify(token, process.env.JWT_SECRET)

      req.user = await User.findById(decoded.id).select("-password")

      if (!req.user)
        return res.status(401).json({ message: "User not found" })

      if (req.user.isBlocked)
        return res.status(403).json({ message: "Your account has been blocked." })

      next()
    } catch (error) {
      return res.status(401).json({ message: "Not authorized, token failed" })
    }
  }

  if (!token)
    return res.status(401).json({ message: "Not authorized, no token" })
}

// only admins
const adminOnly = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next()
  } else {
    res.status(403).json({ message: "Admin access only" })
  }
}

// only regular users — prevents admins from hitting user routes
const userOnly = (req, res, next) => {
  if (req.user && req.user.role === "user") {
    next()
  } else {
    res.status(403).json({ message: "User access only" })
  }
}

module.exports = { protect, adminOnly, userOnly }