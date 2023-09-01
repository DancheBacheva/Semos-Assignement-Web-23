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
    const userId = req.auth.id;
    const posts = await Post.find();
      res.status(200).render("home", {
      status: "success",
      posts,
      author: userId,
    });
  }catch (err) {
    res.status(500).send(err);
  }
};

exports.createPost = async (req, res, next) => {
  try {
    const userId = req.auth.id;
    await Post.create({
      username: req.auth.name,
      mypost: req.body.mypost,
      time: req.body.time,
      author: userId,
    });
    res.redirect("/viewposts");
  } catch (err) {
    res.status(500).json({ error: err });
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
    const userId = req.auth.id;
    const authorName = req.auth.name;
    // const picture = req.auth.profilepicture;
    const posts = await Post.find({ author: userId });
    res.status(200).render("myprofile", {
      status: "success",
      title: "My profile",
      myname: authorName,
      // profilepicture: picture,
      posts,
    });
  }catch (err) {
    res.status(500).send(err);
  }
};

exports.viewPostDetails = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      res.status(404).send("Post not found.");
    } else {
      res.status(200).render("postdetails", {
        status: "success",
        title: "Edit post",
        post,
      });
    }
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.editPost = async (req, res) => {
  try {
    await Post.findByIdAndUpdate(req.params.id, req.body);
    res.redirect("/viewposts/" + req.params.id);
  } catch (err) {
    res.status(500).send(err);
  }
};
