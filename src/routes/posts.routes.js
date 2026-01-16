const express = require("express");
const Post = require("../models/Post");

const router = express.Router();

// 1) Add New Post: POST /post
router.post("/", async (req, res) => {
  try {
    const { sender, title, content } = req.body;
    if (!sender || !title || !content) {
      return res.status(400).json({ error: "sender, title, content are required" });
    }

    const post = await Post.create({ sender, title, content });
    return res.status(201).json(post);
  } catch (err) {
    return res.status(500).json({ error: "internal_error" });
  }
});

// 2) Get All Posts: GET /post
router.get("/", async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    return res.json(posts);
  } catch (err) {
    return res.status(500).json({ error: "internal_error" });
  }
});

module.exports = router;
