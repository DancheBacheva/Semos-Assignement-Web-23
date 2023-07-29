const Post = require ("../pkg/posts/postSchema");

exports.defaultpage = (req, res) => {
  try{
    res.status(200).render("default", {
      appname: "Welcome to The Office Chat App",
    })
  }catch (err) {
    res.status(500).send(err);
  }
}

exports.getLoginForm = async (req, res) => {
  try{
    res.status(200).render("login", {
      appname: "The Office Chat App",
    })
  }catch (err) {
    res.status(500).send(err);
  }
};

exports.getRegisterForm = async (req, res) => {
  try{
    res.status(200).render("register", {
      appname: "The Office Chat App",
    })
  }catch (err) {
    res.status(500).send(err);
  }
};

exports.viewPosts = async (req, res) => {
  try{
    const posts = await Post.find();
    res.status(200).render("home-page", {
      status: "success",
      posts,
    });
  }catch (err) {
    res.status(500).send(err);
  }
};