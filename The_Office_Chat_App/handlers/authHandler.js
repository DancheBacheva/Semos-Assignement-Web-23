const User = require("../pkg/user/userSchema");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const multer = require ("multer");
const uuid = require ("uuid");
const sendEmail = require("./emailHandler");
const sendMailGun = require("./mailgun");

exports.register = async (req, res) => {
  try{
    const newUser = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });

    const token = jwt.sign(
      { id: newUser._id, name: newUser.name },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRES,
      }
    );

    res.cookie("jwt", token, {
      expires: new Date(
        Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000
      ),
      secure: false,
      httpOnly: true,
    });

    await sendEmail({
      email: newUser.email,
      subject: "Thank you!",
      message: "Thank you for registering on The office chat app."
    });

    await sendMailGun({
      email: newUser.email,
      subject: "Thank you!",
      message: "Thank you for registering on The office chat app."
    });

    res.status(200).json({
      status: "success",
      token,
      data: {
        user: newUser,
      },
    });

  }catch (err) {
    return res.status(500).send(err);
  }
};

exports.login = async (req, res) =>{
  try{
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).send("Please enter email and password");
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).send("User with this email does not exist in the database");
    }

    const isPasswordValid = bcrypt.compareSync(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).send("Invalid password!");
    }
    
    const token = jwt.sign(
      { id: user._id, name: user.name },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRES,
      }
    );

    res.cookie("jwt", token, {
      expires: new Date(
        Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000
      ),
      secure: false,
      httpOnly: true,
    });

    res.status(200).json({
      status: "success",
      token,
    });

  }catch (err) {
    return res.status(500).send("Internal server error");
  }
};

const imageId = uuid.v4();

const multerStorage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "public/images/logos")
  },
  filename: (req, file, callback) => {
    const ext = file.mimetype.split("/")[1];
    callback(null, `post-${imageId}-${Date.now()}.${ext}`);
  },
});

const multerFilter = (req, file, callback) => {
  if(file.mimetype.startsWith("image")) {
    callback(null, true);
  } else {
    callback(new Error("file type not supported"), false);
  }
};

const upload = multer ({
  storage: multerStorage,
  fileFilter: multerFilter,
});

exports.uploadProfilePicture = upload.single("profilepicture"); 

exports.updateUser = async (req, res) => {
  try {
    // if(req.file) {
    //   const filename = req.file.filename;
    //   req.body.profilepicture = filename;
    // }

    const user = await user.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      status: "success",
      data: {
        user,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};   //Da se proveri
