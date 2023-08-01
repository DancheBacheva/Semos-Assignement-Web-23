const register = async (name, email, password) => {
  try {
    const res = await axios ({
      method: "POST",
      url: "/register-page",
      data: {
        name,
        email,
        password
      },
    });
    
    console.log(res);
    window.location.href="/myprofile";
  }catch (err) {
    console.log(err);
  }
};

document.querySelector("form").addEventListener("submit", (e) =>{
  e.preventDefault();
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  register(name, email, password);
});