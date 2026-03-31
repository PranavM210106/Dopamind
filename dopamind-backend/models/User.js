const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["user", "admin"], default: "user" },
    dopamineScore: { type: Number, default: 0 },
    isBlocked: { type: Boolean, default: false },

    // New profile fields
    phone: { type: String, default: "" },
    height: { type: String, default: "" },
    weight: { type: String, default: "" },
    profession: { type: String, default: "" },
    status: { type: String, enum: ["working", "non-working", "student"], default: "student" },
    bio: { type: String, default: "" },
    dob: { type: String, default: "" },
    motivation: { type: String, default: "" },
    profilePhoto: { type: String, default: "" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);