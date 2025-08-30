// @ts-nocheck


document.getElementById("loginForm").addEventListener("submit", function (e) {
  
  let isValid = true;
  
  document.querySelectorAll(".error-text").forEach(err => {
    err.style.display = "none";
  });
  
  ["username", "password"].forEach(id => {
    const input = document.getElementById(id);
    if (input.value.trim() === "") {
      input.nextElementSibling.style.display = "block";
      isValid = false;
    }
  });
  
  
  if (!isValid) {
    e.preventDefault();
  }
}); 

["username", "password"].forEach(id => {
    const input = document.getElementById(id);
    if (input) {
        input.addEventListener("input", function () {
            const serverError = document.getElementById("loginError");
            if (serverError) {
                serverError.style.display = "none";
            }
        });
    }
});
