const Blog = require("../models/blog.model");
const User = require("../models/user.model");

const getAllBlogs = async (req, res) => {
  try {
    const userId = req.user ? req.user.id : null;
    const blogs = await Blog.findAll({
      include: [
        {
          model: User,
          as: 'author',
        }
      ],
      where: userId ? { userId } : {}
    });
    res.json(blogs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

const getBlog = async (req, res) => {
  const { id } = req.params;
  try {
    const blog = await Blog.findByPk(id);
    if (!blog) return res.status(404).json({ message: "Blog not found" });
    res.json(blog);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createBlog = async (req, res) => {
  const { title, content } = req.body;
  try {
    // const newBlog = await Blog.create({ title, content, userId: 1 });
    // const newBlog = await Blog.create({ title, content, userId: 1 }, { returning: true });
    const newBlog = await Blog.create({ title, content, userId: 7 }, { raw: true, returning: true });
    res.json(newBlog);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateBlog = async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;
  try {
    const rowsAffected = await Blog.update({ title, content }, { where: { id } });
    if (rowsAffected[0] === 0) {
      res.status(404).json({ message: "Blog not found" });
    } else {
      res.json({ message: "Blog updated successfully" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteBlog = async (req, res) => {
  const { id } = req.params;
  try {
    const rowsAffected = await Blog.destroy({ where: { id } });
    if (rowsAffected === 0) {
      res.status(404).json({ message: "Blog not found" });
    } else {
      res.json({ message: "Blog deleted successfully" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllBlogs,
  getBlog,
  createBlog,
  updateBlog,
  deleteBlog
}