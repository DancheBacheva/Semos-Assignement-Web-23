const login = async (email, password) => {
  try {
    const res = await axios({
      method: "POST",
      url: "/login-page",
      data: {
        email,
        password,
      },
    });

    console.log(res);
    window.location.href = "/viewposts";
  } catch (err) {
    console.log(err);
  }
};

document.querySelector("form").addEventListener("submit", (e) => {
  e.preventDefault();
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  login(email, password);
});