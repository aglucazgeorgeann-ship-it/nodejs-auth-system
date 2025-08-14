const API_URL = "";

// Register
async function registerUser() {
    const username = document.getElementById("regUsername").value.trim();
    const password = document.getElementById("regPassword").value.trim();
    const message = document.getElementById("regMessage");

    if (!username || !password) {
        message.innerHTML = "Please fill in all fields.";
        return;
    }

    const res = await fetch("/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
    });

    const data = await res.json();
    message.innerHTML = data.error || data.message;

    if (!data.error) {
        setTimeout(() => window.location.href = "login.html", 1500);
    }
}

// Login
async function loginUser() {
    const username = document.getElementById("loginUsername").value.trim();
    const password = document.getElementById("loginPassword").value.trim();
    const message = document.getElementById("loginMessage");

    if (!username || !password) {
        message.innerHTML = "Please fill in all fields.";
        return;
    }

    const res = await fetch("/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
    });

    const data = await res.json();
    message.innerHTML = data.error || data.message;

    if (data.token) {
        localStorage.setItem("token", data.token);
        setTimeout(() => window.location.href = "index.html", 1000);
    }
}

// Load profile
async function loadProfile() {
    const token = localStorage.getItem("token");
    if (!token) {
        window.location.href = "login.html";
        return;
    }

    const res = await fetch("/profile", {
        headers: { "Authorization": `Bearer ${token}` }
    });

    const data = await res.json();
    if (data.error) {
        localStorage.removeItem("token");
        window.location.href = "login.html";
    } else {
        document.getElementById("profileData").innerHTML = `
            <p><strong>Username:</strong> ${data.user.username}</p>
            <p><strong>ID:</strong> ${data.user.id}</p>
        `;
    }
}

// Logout
function logout() {
    localStorage.removeItem("token");
    window.location.href = "login.html";
}
