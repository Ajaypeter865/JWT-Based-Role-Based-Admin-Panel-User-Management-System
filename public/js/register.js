// @ts-nocheck

// Form validation on submit
// document.getElementById("registerForm").addEventListener("submit", function (e) {
//     let isValid = true;
//     document.querySelectorAll(".error-text").forEach(err => err.style.display = "none");

//     ["username", "email", "password", "confirmPassword"].forEach(id => {
//         const input = document.getElementById(id);
//         if (input.value.trim() === "") {
//             input.nextElementSibling.style.display = "block";
//             isValid = false;
//         }
//     });

//     if (!isValid) e.preventDefault();
// });

// // Hide server error when user starts typing in any field
// ["username", "email", "password", "confirmPassword"].forEach(id => {
//     const input = document.getElementById(id);
//     if (input) {
//         input.addEventListener("input", function () {
//             const serverError = document.getElementById("serverError");
//             if (serverError) {
//                 serverError.style.display = "none";
//             }
//         });
//     }
// });


// version 2

// @ts-nocheck

// Form validation on submit
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

// Hide server error when user starts typing in any field
["username", "email", "password", "confirmPassword"].forEach(id => {
    const input = document.getElementById(id);
    if (input) {
        input.addEventListener("input", function () {
            const serverError = document.getElementById("serverError");
            if (serverError) {
                serverError.style.display = "none";
            }
        });
    }
});

// Real-time validation for each field
document.getElementById("username").addEventListener("input", function () {
    const username = this.value.trim();
    const errorElement = this.nextElementSibling;
    
    if (username.length > 0 && username.length < 3) {
        errorElement.textContent = "Username must contain at least 3 characters";
        errorElement.style.display = "block";
    } else {
        errorElement.style.display = "none";
    }
});

document.getElementById("email").addEventListener("input", function () {
    const email = this.value.trim();
    const errorElement = this.nextElementSibling;
    
    if (email.length > 0 && !email.includes("@")) {
        errorElement.textContent = "Email should be proper (must contain @)";
        errorElement.style.display = "block";
    } else {
        errorElement.style.display = "none";
    }
});

document.getElementById("password").addEventListener("input", function () {
    const password = this.value.trim();
    const errorElement = this.nextElementSibling;
    
    if (password.length > 0 && password.length < 5) {
        errorElement.textContent = "Password must contain at least 5 characters";
        errorElement.style.display = "block";
    } else {
        errorElement.style.display = "none";
    }
});

document.getElementById("confirmPassword").addEventListener("input", function () {
    const confirmPassword = this.value.trim();
    const password = document.getElementById("password").value.trim();
    const errorElement = this.nextElementSibling;
    
    if (confirmPassword.length > 0 && confirmPassword !== password) {
        errorElement.textContent = "Passwords do not match";
        errorElement.style.display = "block";
    } else {
        errorElement.style.display = "none";
    }
});