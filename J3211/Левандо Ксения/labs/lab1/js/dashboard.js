// page protection
if (localStorage.getItem("auth") !== "true") {
    window.location.href = "index.html";
}

// loading a user
const user = JSON.parse(localStorage.getItem("user"));

document.getElementById("userName").textContent = user.name;
document.getElementById("userEmail").textContent = user.email;