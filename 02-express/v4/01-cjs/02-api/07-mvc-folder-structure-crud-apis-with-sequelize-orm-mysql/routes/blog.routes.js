const { Router } = require("express");
const { getAllBlogs, getBlog, createBlog, updateBlog, deleteBlog } = require("../controllers/blog.controller");

const router = Router();

router.get("/", getAllBlogs);
router.get("/:id", getBlog);
router.post("/", createBlog);
router.put("/:id", updateBlog);
router.delete("/:id", deleteBlog);

module.exports = router;