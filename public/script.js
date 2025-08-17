require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("./database");
const path = require("path"); // Mahalaga: Idagdag ito para sa path utilities

const app = express();
app.use(bodyParser.json());
app.use(cors());

// ✅ Secret key para sa JWT
const JWT_SECRET = process.env.JWT_SECRET || "defaultsecret";

// ✅ Serve static frontend files from public/
// Gamitin ang path.join(__dirname, 'public') para masiguro na tama ang path resolution
app.use(express.static(path.join(__dirname, 'public'))); 

// ================= REGISTER =================
app.post("/register", async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ error: "Username and password are required" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        db.prepare("INSERT INTO users (username, password) VALUES (?, ?)").run(username, hashedPassword);
        res.json({ message: "User registered successfully" });
    } catch (err) {
        if (err.code === "SQLITE_CONSTRAINT_UNIQUE") {
            return res.status(400).json({ error: "Username already exists" });
        }
        res.status(500).json({ error: "Database error" });
    }
});

// ================= LOGIN =================
app.post("/login", async (req, res) => {
    const { username, password } = req.body;
    const user = db.prepare("SELECT * FROM users WHERE username = ?").get(username);

    if (!user) {
        return res.status(400).json({ error: "Invalid username or password" });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
        return res.status(400).json({ error: "Invalid username or password" });
    }

    const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, { expiresIn: "1h" });
    res.json({ message: "Login successful", token });
});

// ================= PROFILE (Protected) =================
app.get("/profile", (req, res) => {
    const authHeader = req.headers["authorization"];
    if (!authHeader) return res.status(401).json({ error: "No token provided" });

    const token = authHeader.split(" ")[1];
    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) return res.status(403).json({ error: "Invalid token" });
        res.json({ message: "Profile data", user: decoded });
    });
});

// ================= ROOT ROUTE =================
// Ito ang magseserve ng index.html kapag in-access ang root URL
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// ================= START SERVER =================
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`✅ Server running on http://localhost:${PORT}`);
});
