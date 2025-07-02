📋 Task Manager - MERN Stack Project
A collaborative task management system built using the MERN stack (MongoDB, Express.js, React.js, Node.js). The application helps teams create, assign, manage, and track tasks with robust role-based access control and a responsive, user-friendly interface.

🚀 Features
🔐 User Authentication (Register/Login)

🔑 Role-Based Access Control (Admin, Team Lead, User)

📝 Create, Read, Update, Delete (CRUD) Tasks

👥 Assign Tasks to Multiple Team Members

📊 Track Task Status: To Do, In Progress, Done

🔍 Filter Tasks by Status and Assignee

📱 Fully Responsive UI (Built with Tailwind CSS)

🛠 Tech Stack
Frontend
⚛️ React.js

🎨 Tailwind CSS

🔁 Axios (for API requests)

🌐 React Router (for routing)

Backend
🟢 Node.js
🚂 Express.js
🍃 MongoDB + Mongoose
🔐 JSON Web Tokens (JWT) for Authentication

📦 Installation & Setup
npm or yarn
# 1. Clone the repository
git clone https://github.com/imhritiktf/TASK-MANAGER.git
cd task-manager

# 2. Install server dependencies
cd backend
npm install

# 3. Install client dependencies
cd ../frontend
npm install

🌍 Environment Variables
Create .env files in both the server and client directories.
backend .env
PORT=5000
MONGO_URI=your_mongo_connection_string
JWT_SECRET=your_jwt_secret

▶️ Running the App
In two terminal windows:
# Terminal 1 - Start the backend
cd server
npm run dev

# Terminal 2 - Start the frontend
cd client
npm start

📡 API Endpoints
🔐 Authentication
POST /api/auth/register - Register new user

POST /api/auth/login - Login user

GET /api/auth/me - Get current user info

✅ Tasks
GET /api/tasks - Get all tasks (filterable by status and assignee)

POST /api/tasks - Create new task (Admin/Team Lead only)

PUT /api/tasks/:id/status - Update task status

PUT /api/tasks/:id/reassign - Reassign task (Admin/Team Lead only)

DELETE /api/tasks/:id - Delete task (Admin/creator only)

👤 Users
GET /api/users - Get all users (Admin/Team Lead only)

