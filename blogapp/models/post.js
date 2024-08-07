const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
    id: { type: Number, unique: true },
    title: String,
    content: String,
    author: String,
    date: { type: Date, default: Date.now }
  });
  
const Post = mongoose.model('Post', postSchema);

module.exports = Post;