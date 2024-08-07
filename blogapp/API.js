const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const Post = require("./models/post");
require("dotenv").config();

const app = express();
const port = 9000;

mongoose.connect(process.env.MONGODB_URI);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


async function getNextId() {
  const post = await Post.findOne().sort({ id: -1 });
  return post ? post.id + 1 : 1;
}


app.get('/posts', async (req, res) => {
  try {
    const posts = await Post.find();
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


app.get('/posts/:id', async (req, res) => {
  try {
    const post = await Post.findOne({ id: parseInt(req.params.id) });
    if (!post) return res.status(404).json({ message: 'Post not found' });
    res.json(post);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


app.post('/posts', async (req, res) => {
  const nextId = await getNextId();
  const post = new Post({
      id: nextId, 
      title: req.body.title,
      content: req.body.content,
      author: req.body.author,
  });
  try {
      const newPost = await post.save();
      res.status(201).json(newPost);
  } catch (err) {
      res.status(400).json({ message: err.message });
  }
});

app.patch('/posts/:id', async (req, res) => {
  try {
    const post = await Post.findOne({ id: parseInt(req.params.id) });
    if (!post) return res.status(404).json({ message: 'Post not found' });

    if (req.body.title) post.title = req.body.title;
    if (req.body.content) post.content = req.body.content;
    if (req.body.author) post.author = req.body.author;

    const updatedPost = await post.save();
    res.json(updatedPost);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});


app.delete('/posts/:id', async (req, res) => {
  try {
    const post = await Post.findOne({ id: parseInt(req.params.id) });
    if (!post) return res.status(404).json({ message: 'Post not found' });

    await Post.deleteOne({ id: parseInt(req.params.id) });
    res.json({ message: 'Post deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.listen(port, () => {
  console.log(`API is running at http://localhost:${port}`);
});
