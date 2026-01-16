require("dotenv").config();

const express = require('express');
const app = express();

app.use(express.json());

app.use('/post', require('./routes/posts.routes'));
app.use('/comment', require('./routes/comments.routes'));

app.listen(3000, () => console.log('Server running'));
