Live Application
You can view the live demo of the Node.js Authentication System here:

Live Demo: https://auth-system-zfxi.onrender.com/


# Node.js Authentication System

A **full-stack Authentication System** built with **Node.js, Express, SQLite, JWT, and Multer** for profile uploads.  
This project is designed to be **portfolio-ready**, showcasing a modern, secure, and responsive user authentication workflow.



## 🖥️ Screenshots

**Login Page**  
![Login](https://github.com/aglucazgeorgeann-ship-it/nodejs-auth-system/blob/main/login.jpg?raw=true)

**Register Page**  
![Register](https://github.com/aglucazgeorgeann-ship-it/nodejs-auth-system/blob/main/register.jpg?raw=true)

**Profile / Update Profile Page**  
![Profile](https://github.com/aglucazgeorgeann-ship-it/nodejs-auth-system/blob/main/updateprofile.jpg?raw=true)

Node.js Authentication System - Full-Stack Secure Auth App
Introduction
The Node.js Authentication System is a robust and comprehensive full-stack web application designed to showcase advanced skills in user management and data security. It utilizes modern technologies to provide secure user registration, login, and profile management.

This project is ideal for anyone looking to understand how to build a secure authentication system from scratch, using a vanilla JavaScript frontend and a robust Node.js Express backend.

Features
User Registration: Secure user registration with password hashing.

User Login: Secure user authentication using JWT (JSON Web Tokens) for session management.

Password Hashing: Employs bcrypt for strong password hashing, ensuring the security of user credentials.

Profile Management: Ability to upload and update user profile pictures (avatars) using Multer.

Login History: Records user login history for auditing and security purposes.

Secure API Endpoints: API endpoints are protected with middleware, and login attempts are limited using express-rate-limit to prevent brute-force attacks.

Responsive Frontend: A clean and responsive user interface built with HTML5, CSS3, and Vanilla JavaScript, providing intuitive interaction.

Clear User Feedback: Provides clear user feedback using SweetAlert2 pop-ups for various operations.

Technologies Used
Backend (Node.js & Express.js)

Node.js: JavaScript runtime environment.

Express.js: Minimalist web framework for Node.js, used for building the RESTful API.

SQLite: A lightweight and file-based relational database for storing user data and logs.

JWT (JSON Web Tokens): For secure, stateless authentication.

bcrypt: Cryptographic library for password hashing.

Multer: Node.js middleware for handling multipart/form-data, primarily used for file uploads.

dotenv: For managing environment variables (e.g., database credentials, JWT secret).

express-rate-limit: Middleware for rate limiting requests to prevent abuse.

CORS: Middleware for enabling Cross-Origin Resource Sharing.

Frontend (Vanilla HTML, CSS, JavaScript)

HTML5: For the structure of web pages.

CSS3: For styling and responsive design.

Vanilla JavaScript (ES6+): For interactivity, DOM manipulation, and frontend logic.

SweetAlert2: For attractive and interactive alert/confirmation pop-ups.

Development Tools

Git: Version control system.

GitHub: For source code hosting.

Postman: For testing API endpoints.

Nodemon: For automatic server restarts during development.

Login Page:

Registration Page:

User Profile Page:

Login History/Dashboard (If Available):

How to Run Locally
Follow these steps to set up and run the project on your local machine.

Prerequisites
Node.js (LTS version recommended)

npm (Node Package Manager)

Installation
Clone the repository:

git clone https://github.com/aglucazgeorgeann-ship-it/nodejs-auth-system.git
cd nodejs-auth-system

Install dependencies:

npm install

Set up the database:

The project uses SQLite, so a separate database server is not needed.

Ensure there is an ecommerce.db file in the backend/ directory. If it doesn't exist, it will be automatically created by the database.js file on first run.

Create a .env file:

Create a new file named .env in the root directory of the project.

Add a secret key for JWT (example):

JWT_SECRET=your_super_secret_jwt_key

Replace your_super_secret_jwt_key with a strong and random string.

Running the Application
Start the server:

npm start
# Or, for development with auto-restart:
# npm run dev

The server will run on http://localhost:3001 (or whatever port you've specified via process.env.PORT).

Open the Frontend:

After the server starts, open your web browser and navigate to:

http://localhost:3001/index.html

Since the Node.js server also serves as a static file host for the HTML files in the public folder, you can directly access the frontend via the backend's URL.

Usage
After setting up the project:

Register: Go to the register page (register.html) and create a new account.

Login: Use your credentials to log in on the login page (login.html).

Manage Profile: After logging in, explore the profile page (profile.html) to update information or upload a profile picture.

View Login History: Check your login activity logs (if available on the profile/dashboard).

Future Enhancements
Email Verification: Add email confirmation for account registration.

Password Reset: Implement "forgot password" functionality with an email link.

Social Login: Integrate login via Google, Facebook, etc.

Role-Based Access Control: Add different roles for users (e.g., admin, regular user).

Two-Factor Authentication (2FA): Add an extra layer of security.

Frontend Framework Integration: Migrate the frontend to a modern framework like React, Vue, or Angular for a more complex UI/UX.

Database Migration: Replace SQLite with a production-grade database like PostgreSQL or MySQL.

License
This project is open-source and licensed under the MIT License.
