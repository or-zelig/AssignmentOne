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


module.exports = router;
