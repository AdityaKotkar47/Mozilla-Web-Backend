const express = require("express");
const router = express.Router();

const {
    getAllBlogs,
    getBlogById,
    createBlog,
} = require("../controllers/blogController");

const { verifyToken } = require("../middleware/authMiddleware");

router.get("/", getAllBlogs);
router.get("/:id", getBlogById);

router.post("/", verifyToken, createBlog);

module.exports = router;
