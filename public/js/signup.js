const signupFormHandler = async (event) => {
    event.preventDefault();
  
    const username = document.querySelector("#username").value.trim();
    const email = document.querySelector("#email").value.trim();
    const password = document.querySelector("#password").value.trim();
  
    if (email && password && username) {
      const response = await fetch("/api/user", {
        method: "POST",
        body: JSON.stringify({ email, username, password }),
        headers: { "Content-Type": "application/json" },
      });
  
      if (response.ok) {
        document.location.replace("/");
      } else {
        alert(response.statusText);
      }
    }
  };
  
  document
    .querySelector("#signup-form")
    .addEventListener("submit", signupFormHandler);