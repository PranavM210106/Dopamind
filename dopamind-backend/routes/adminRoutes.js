const express = require("express");
const router = express.Router();
const { getAllUsers, blockUser, unblockUser, deleteUser, getGlobalStats } = require("../controllers/adminController");
const { protect, adminOnly } = require("../middleware/authMiddleware");

router.use(protect, adminOnly);
router.get("/users", getAllUsers);
router.get("/stats", getGlobalStats);
router.put("/users/:id/block", blockUser);
router.put("/users/:id/unblock", unblockUser);
router.delete("/users/:id", deleteUser);

module.exports = router;