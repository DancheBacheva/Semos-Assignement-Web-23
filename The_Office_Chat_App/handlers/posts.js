const Post = require("../pkg/posts/postSchema");

exports.getAll = async (req, res) => {
      try {
        let posts = await Post.find().populate("author");
        res.status(200).json({
          status: "success",
          data: {
            posts,
          },
        });
      } catch (err) {
        res.status(404).json({
          status: "fail",
          message: err,
        });
      }
    };

exports.getOne = async (req, res) => {
      try {
        const post = await Post.findById(req.params.id);
        res.status(200).json({
          status: "success",
          data: {
            post,
          },
        });
      } catch (err) {
        res.status(404).json({
          status: "fail",
          message: err,
        });
      }
    };

exports.create = async (req, res, next) => {
  try {
    const userId = req.auth.id;
    const post = await Post.create({
      username: req.body.username,
      mypost: req.body.mypost,
      time: req.body.time,
      author: userId,
    });
    res.status(201).json(post);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

exports.update = async (req, res) => {
  try {
    const post = await Post.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      status: "success",
      data: {
        post,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

    exports.createByUser = async (req, res, next) => {
      try {
        const userId = req.auth.id;
        const post = await Post.create({
          username: req.body.username,
          mypost: req.body.mypost,
          time: req.body.time,
          author: userId,
        });
        res.status(201).json(post);
      } catch (err) {
        res.status(500).json({ error: err });
      }
    };
    
    exports.getByUser = async (req, res) => {
      try {
        const userId = req.auth.id;
        const myposts = await Post.find({ author: userId });
        res.status(201).json(myposts);
      } catch (err) {
        res.status(500).json({ error: err });
      }
    };