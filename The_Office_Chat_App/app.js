const express = require("express");
const db = require("./pkg/db/index");
const jwt = require("express-jwt");
const cookieParser = require("cookie-parser");

const app = express();

const authHandler = require("./handlers/authHandler");
const viewHandler = require("./handlers/viewHandler");
// const posts = require("./handlers/posts");

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static("public"));

db.init();

app.use(jwt.expressjwt({
  algorithms: ["HS256"],
  secret: process.env.JWT_SECRET,
  getToken: (req) => {
    if (
      req.headers.authorization &&
      req.headers.authorization.split(" ")[0] === "Bearer"
    ) {
      return req.headers.authorization.split(" ")[1];
    }
    if (req.cookies.jwt) {
      return req.cookies.jwt;
    }
    return null;
  },
})
  .unless({
    path: ["/register-page", "/login-page", "/login", "/default", "/register"],
  })
);

app.post("/register-page", authHandler.register);
app.post("/login-page", authHandler.login);

//view ruti
app.get("/default", viewHandler.defaultpage);
app.get("/viewposts", viewHandler.viewPosts);
app.get("/login", viewHandler.getLoginForm);
app.get("/register", viewHandler.getRegisterForm);


app.listen(process.env.PORT, (err) => {
  if (err) {
    return console.log("Server can not start");
  }
  console.log(`Server started successfully on port ${process.env.PORT}`);
});