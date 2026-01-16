require("dotenv").config();

const express = require("express");
const app = express();

const mongoose = require("./db"); // חשוב! מפעיל את החיבור

app.use(express.json());

app.use("/post", require("./routes/posts.routes"));
app.use("/comment", require("./routes/comments.routes"));

const port = process.env.PORT || 3000;

mongoose.connection.once("open", () => {
  console.log("Mongo connected");
  app.listen(port, () => console.log(`Server running on ${port}`));
});

mongoose.connection.on("error", (err) => {
  console.error("Mongo connection error:", err);
});
