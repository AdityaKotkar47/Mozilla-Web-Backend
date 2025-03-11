const Blog = require("../models/blog");

const getAllBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find().sort({ createdAt: -1 });
        res.status(200).json({ success: true, data: blogs });
    } catch (error) {
        console.error("Error fetching blogs: ", error);
        res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message,
        });
    }
};

const getBlogById = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);

        if (!blog) {
            return res.status(404).json({
                success: false,
                message: "Blog not found",
            });
        }

        res.status(200).json({ success: true, data: blog });
    } catch (error) {
        console.error("Error fetching blogs: ", error);
        res.status(500).json({
            success: false,
            message: "Server Error",
            error: error.message,
        });
    }
};

const createBlog = async (req, res) => {
    try {
        const { title, content, author, images } = req.body;
        console.log(req.body);
        if (!title || !content || !author) {
            return res.status(400).json({
                success: false,
                message:
                    "Please provide all required fields: title, content, author",
            });
        }

        const newBlog = new Blog({
            title,
            content,
            author,
            images: images || [],
            createdAt: Date.now(),
            updatedAt: Date.now(),
        });

        const savedBlog = newBlog.save();

        res.status(201).json({
            success: true,
            message: "Blog created successfully",
            data: savedBlog,
        });
    } catch (error) {
        console.error("Error creating blog: ", error);
        res.status(500).json({
            success: false,
            message: "Server Error",
            error: error.message,
        });
    }
};

module.exports = {
    getAllBlogs,
    getBlogById,
    createBlog,
};
