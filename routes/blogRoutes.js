const express = require("express");
const router = express.Router();

const {
    getAllBlogs,
    getBlogById,
    createBlog,
    updateBlog,
    deleteBlog
} = require("../controllers/blogController");

const { verifyToken } = require("../middleware/authMiddleware");

router.get("/", getAllBlogs);
router.get("/:id", getBlogById);

router.post("/", verifyToken, createBlog);
router.put("/:id", verifyToken, updateBlog);
router.delete("/:id", verifyToken, deleteBlog);

module.exports = router;
