// app.js — shared for index.html + profile.html
// Simple vanilla JS single-file frontend for auth demo

const API_ROOT = ""; // same origin

// UTIL: show toast using SweetAlert2
function toastSuccess(title){
  Swal.fire({ icon: "success", title, toast:true, position:"top-end", timer:2000, showConfirmButton:false });
}
function toastError(title){
  Swal.fire({ icon: "error", title, toast:true, position:"top-end", timer:2500, showConfirmButton:false });
}

// ---------- INDEX (Login / Register) ----------
if (document.getElementById("login-form")) {
  const loginForm = document.getElementById("login-form");
  const registerForm = document.getElementById("register-form");
  const showLogin = document.getElementById("show-login");
  const showRegister = document.getElementById("show-register");

  showLogin.addEventListener("click", () => {
    showLogin.classList.add("active"); showRegister.classList.remove("active");
    loginForm.classList.remove("hidden"); registerForm.classList.add("hidden");
  });
  showRegister.addEventListener("click", () => {
    showRegister.classList.add("active"); showLogin.classList.remove("active");
    registerForm.classList.remove("hidden"); loginForm.classList.add("hidden");
  });

  // Register
  registerForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const username = document.getElementById("reg-username").value.trim();
    const password = document.getElementById("reg-password").value;

    try {
      const res = await fetch(`${API_ROOT}/register`, {
        method: "POST",
        headers: { "Content-Type":"application/json" },
        body: JSON.stringify({ username, password })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Registration failed");
      toastSuccess("Registered! Please login.");
      // auto-switch to login
      showLogin.click();
      document.getElementById("login-username").value = username;
    } catch (err) {
      toastError(err.message);
    }
  });

  // Login
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const username = document.getElementById("login-username").value.trim();
    const password = document.getElementById("login-password").value;

    try {
      const res = await fetch(`${API_ROOT}/login`, {
        method: "POST",
        headers: { "Content-Type":"application/json" },
        body: JSON.stringify({ username, password })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Login failed");
      // Save token
      localStorage.setItem("token", data.token);
      toastSuccess("Login successful! Redirecting...");
      setTimeout(() => window.location.href = "/profile.html", 700);
    } catch (err) {
      toastError(err.message);
    }
  });
}

// ---------- PROFILE PAGE ----------
if (document.getElementById("profile-username")) {
  const token = localStorage.getItem("token");
  if (!token) {
    Swal.fire({ icon:"info", title:"Not logged in", text:"Redirecting to login...", timer:1500, showConfirmButton:false });
    setTimeout(() => window.location.href = "/", 1000);
  } else {
    // Fetch profile
    (async function loadProfile(){
      try {
        const res = await fetch(`${API_ROOT}/profile`, {
          headers: { "Authorization": `Bearer ${token}` }
        });
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.error || "Unable to fetch profile");
        }

        const u = data.user;
        document.getElementById("profile-username").textContent = u.username;
        document.getElementById("profile-created").textContent = `Member since ${new Date(u.created_at).toLocaleString()}`;
        const avatarImg = document.getElementById("avatar-img");
        avatarImg.src = u.avatar || "/placeholder-avatar.png";

        // populate logs
        const tbody = document.querySelector("#logs-table tbody");
        tbody.innerHTML = "";
        (data.recentLogins || []).forEach(l => {
          const tr = document.createElement("tr");
          const ip = document.createElement("td"); ip.textContent = l.ip || "-";
          const ua = document.createElement("td"); ua.textContent = l.user_agent || "-";
          const t = document.createElement("td"); t.textContent = new Date(l.logged_at).toLocaleString();
          tr.appendChild(ip); tr.appendChild(ua); tr.appendChild(t);
          tbody.appendChild(tr);
        });
      } catch (err) {
        toastError(err.message);
        // maybe invalid token → force logout
        localStorage.removeItem("token");
        setTimeout(()=> window.location.href = "/", 1200);
      }
    })();
  }

  // Logout
  document.getElementById("logout-btn").addEventListener("click", () => {
    localStorage.removeItem("token");
    toastSuccess("Logged out");
    setTimeout(()=> window.location.href = "/", 600);
  });

  // Update profile (username/password)
  document.getElementById("update-form").addEventListener("submit", async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const username = document.getElementById("update-username").value.trim();
    const password = document.getElementById("update-password").value;

    if (!username && !password) return toastError("No changes provided");

    try {
      const res = await fetch(`${API_ROOT}/profile`, {
        method: "PATCH",
        headers: {
          "Content-Type":"application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ username: username || undefined, password: password || undefined })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Update failed");

      // If token returned, replace it
      if (data.token) localStorage.setItem("token", data.token);
      toastSuccess("Profile updated");
      // reload profile data
      setTimeout(()=> location.reload(), 900);
    } catch (err) {
      toastError(err.message);
    }
  });

  // Avatar upload + preview
  const avatarFile = document.getElementById("avatar-file");
  const previewImg = document.getElementById("preview-img");
  avatarFile.addEventListener("change", (e) => {
    const f = e.target.files[0];
    if (!f) return;
    const url = URL.createObjectURL(f);
    previewImg.src = url;
  });

  document.getElementById("avatar-form").addEventListener("submit", async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const f = avatarFile.files[0];
    if (!f) return toastError("Choose a file first");
    const fd = new FormData();
    fd.append("avatar", f);

    try {
      const res = await fetch(`${API_ROOT}/upload-avatar`, {
        method: "POST",
        headers: { "Authorization": `Bearer ${token}` },
        body: fd
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Upload failed");

      toastSuccess("Avatar uploaded");
      // update avatar on page
      document.getElementById("avatar-img").src = data.avatar;
      // reset preview
      avatarFile.value = "";
      previewImg.src = data.avatar;
    } catch (err) {
      toastError(err.message);
    }
  });
}
