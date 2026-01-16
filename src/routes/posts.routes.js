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

// 3) Get Post by ID: GET /post/:postId
router.get("/:postId", async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);
    if (!post) return res.status(404).json({ error: "not_found" });
    return res.json(post);
  } catch (err) {
    return res.status(400).json({ error: "invalid_id" });
  }
});

// 4) Get Posts by Sender: GET /post?sender=<senderId>
router.get("/", async (req, res) => {
  try {
    const { sender } = req.query;

    const filter = sender ? { sender: String(sender) } : {};
    const posts = await Post.find(filter).sort({ createdAt: -1 });

    return res.json(posts);
  } catch (err) {
    return res.status(500).json({ error: "internal_error" });
  }
});

// 5) Update Post: PUT /post/:postId
router.put("/:postId", async (req, res) => {
  try {
    const { sender, title, content } = req.body;
    if (!sender || !title || !content) {
      return res.status(400).json({ error: "sender, title, content are required" });
    }

    const updated = await Post.findByIdAndUpdate(
      req.params.postId,
      { sender, title, content },
      { new: true, runValidators: true }
    );

    if (!updated) return res.status(404).json({ error: "not_found" });
    return res.json(updated);
  } catch (err) {
    return res.status(400).json({ error: "invalid_id" });
  }
});

module.exports = router;
