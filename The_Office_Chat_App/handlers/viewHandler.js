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
    console.log(posts);
    res.status(200).render("home", {
      status: "success",
      posts,
    });
  }catch (err) {
    res.status(500).send(err);
  }
};

exports.createPost = async (req, res) =>{
  try{
    await Post.create(req.body);
    res.redirect("/viewposts");
  }catch (err) {
    res.status(500).send(err);
  }
};

exports.deletePost = async (req, res) => {
  try{
    const postId = req.params.id;
    await Post.findByIdAndDelete(postId);
    res.redirect("/myprofile");
  }catch (error) {
    res.status(500).send(error);
  }
};

exports.myProfile = async (req, res) => {
  try{
    const posts = await Post.find();
    res.status(200).render("myprofile", {
      status: "success",
      myname: "Danche Bacheva",
      posts,
    });
  }catch (err) {
    res.status(500).send(err);
  }
};
