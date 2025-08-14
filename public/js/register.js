document.getElementById("registerForm").addEventListener("submit", function (e) {
    let isValid = true;
    document.querySelectorAll(".error-text").forEach(err => err.style.display = "none");

    ["username", "email", "password", "confirmPassword"].forEach(id => {
        const input = document.getElementById(id);
        if (input.value.trim() === "") {
            input.nextElementSibling.style.display = "block";
            isValid = false;
        }
    });

    if (!isValid) e.preventDefault();
});
