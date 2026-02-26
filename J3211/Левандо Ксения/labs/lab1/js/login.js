document.getElementById("loginForm").addEventListener("submit", function(e){
    e.preventDefault();

    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;

    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (!storedUser) {
        alert("User not found");
        return;
    }

    if (email === storedUser.email && password === storedUser.password) {
        localStorage.setItem("auth", "true");
        window.location.href = "index.html";
    } else {
        alert("Wrong email or password");
    }
});