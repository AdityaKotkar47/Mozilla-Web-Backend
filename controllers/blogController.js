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

        const savedBlog = await newBlog.save();

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

const updateBlog = async (req, res) => {
    try {
        const { title, content, author, images } = req.body;

        const existingBlog = await Blog.findById(req.params.id);

        if (!existingBlog) {
            return res.status(404).json({
                success: false,
                message: "Blog not found",
            });
        }

        if (!title || !content || !author || !images) {
            return res.status(400).json({
                success: false,
                message: "Please provide updated value for any of these: title, content, author, images"
            });
        }

        const updatedData = {};
        if (title) updatedData.title = title;
        if (content) updatedData.content = content;
        if (author) updatedData.author = author;
        if (images) updatedData.images = images;
        updatedData.updatedAt = Date.now();

        const updatedBlog = await Blog.findByIdAndUpdate(
            req.params.id,
            updatedData,
            { new: true, runValidators: true }
        );

        res.status(200).json({
            success: true,
            message: "Blog updated successfully",
            data: updatedBlog,
        });
    } catch (error) {
        console.error("Error updating blog: ", error);
        res.status(500).json({
            success: false,
            message: "Server Error",
            error: error.message,
        });
    }
};

const deleteBlog = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);

        if (!blog) {
            return res.status(404).json({
                success: false,
                message: "Blog not found",
            });
        }

        await Blog.findByIdAndDelete(req.params.id);

        res.status(200).json({
            success: true,
            message: "Blog deleted successfully",
            data: {},
        });
    } catch (error) {
        console.error("Error deleting blog: ", error);
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
    updateBlog,
    deleteBlog,
};
