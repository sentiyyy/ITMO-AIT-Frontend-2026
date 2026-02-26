document.addEventListener("DOMContentLoaded", () => {
    const auth = localStorage.getItem("auth");

    if (auth === "true") {
        showUserUI();
    }
});

function showUserUI() {
    const user = JSON.parse(localStorage.getItem("user"));
    const block = document.getElementById("authButtons");

    block.innerHTML = `
        <a href="dashboard.html" class="btn btn-outline-light me-2">
            My Profile
        </a>
        <button class="btn btn-outline-warning" onclick="logout()">Logout</button>
    `;
}

function logout() {
    localStorage.removeItem("auth");
    location.reload();
}