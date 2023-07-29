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
});

const Post = mongoose.model("Post", postSchema);
module.exports = Post;