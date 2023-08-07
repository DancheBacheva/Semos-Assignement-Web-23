const mongoose = require ("mongoose");

const postSchema = new mongoose.Schema({
  username: {
    type: String,
  },

  mypost: {
    type: String,
  },

  time: {
    type: Date,
    default: Date.now,
    },

  author: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
  },  
});

const Post = mongoose.model("Post", postSchema);
module.exports = Post;