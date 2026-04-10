const dotenv = require("dotenv")
const connectDB = require("../config/db")
const User = require("../models/User")

dotenv.config()

const makeAdmin = async () => {
  await connectDB()

  const email = "youremail@example.com" // change this

  const user = await User.findOneAndUpdate(
    { email },
    { $set: { role: "admin" } },
    { new: true }
  )

  if (!user) {
    console.log("User not found")
  } else {
    console.log(`${user.name} is now an admin`)
  }

  process.exit()
}

makeAdmin()