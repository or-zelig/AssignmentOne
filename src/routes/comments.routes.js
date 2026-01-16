const express = require("express");
const Comment = require("../models/Comment");
const Post = require("../models/Post");

const router = express.Router();

// 6) Create Comment: POST /comment
router.post("/", async (req, res) => {
  try {
    const { postId, sender, message } = req.body;
    if (!postId || !sender || !message) {
      return res.status(400).json({ error: "postId, sender, message are required" });
    }

    const postExists = await Post.exists({ _id: postId });
    if (!postExists) return res.status(404).json({ error: "post_not_found" });

    const comment = await Comment.create({ postId, sender, message });
    return res.status(201).json(comment);
  } catch (err) {
    return res.status(400).json({ error: "invalid_id" });
  }
});


// 7) Get Comment by ID: GET /comment/:commentId
router.get("/:commentId", async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.commentId);
    if (!comment) return res.status(404).json({ error: "not_found" });
    return res.json(comment);
  } catch (err) {
    return res.status(400).json({ error: "invalid_id" });
  }
});

// 8) Update Comment: PUT /comment/:commentId
router.put("/:commentId", async (req, res) => {
  try {
    const { sender, message } = req.body;
    if (!sender || !message) {
      return res.status(400).json({ error: "sender, message are required" });
    }

    const updated = await Comment.findByIdAndUpdate(
      req.params.commentId,
      { sender, message },
      { new: true, runValidators: true }
    );

    if (!updated) return res.status(404).json({ error: "not_found" });
    return res.json(updated);
  } catch (err) {
    return res.status(400).json({ error: "invalid_id" });
  }
});

// 9) Delete Comment: DELETE /comment/:commentId
router.delete("/:commentId", async (req, res) => {
  try {
    const deleted = await Comment.findByIdAndDelete(req.params.commentId);
    if (!deleted) return res.status(404).json({ error: "not_found" });
    return res.json({ ok: true });
  } catch (err) {
    return res.status(400).json({ error: "invalid_id" });
  }
});

// 10) Get Comments by Post: GET /comment?post=<postId>
router.get("/", async (req, res) => {
  try {
    const { post } = req.query;
    if (!post) return res.status(400).json({ error: "post query param is required" });

    const comments = await Comment.find({ postId: String(post) }).sort({ createdAt: -1 });
    return res.json(comments);
  } catch (err) {
    return res.status(400).json({ error: "invalid_id" });
  }
});


module.exports = router;
