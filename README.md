### Task Manager API

A simple Node.js + Express + Sequelize based API for managing tasks with user authentication (JWT).

### Features

User Registration & Login (with hashed passwords)

JWT Authentication & Authorization

CRUD operations for tasks (Create, Read, Update, Delete)

Filtering by priority & status

Sorting tasks by dueDate, priority, or status

Relational DB (User ↔ Tasks)

### Tech Stack

Node.js + Express

Sequelize ORM

MySQL

JWT Authentication

bcrypt.js for password hashing

### Folder Structure

task-manager/
│── config/          # Database configuration
│── controllers/     # Route controllers (auth, tasks)
│── middleware/      # JWT auth middleware
│── models/          # Sequelize models (User, Task)
│── routes/          # Express route definitions
│── services/        # Business logic for tasks & users
│── .env             # Environment variables
│── server.js        # App entry point

### Installation

#### Clone the repository:

git clone https://gitlab.com/tharunkimar/task-manager-api-tharun.git

cd task-manager


#### Install dependencies:

npm install


#### Create a .env file:

PORT=portnumber
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=task_manager
JWT_SECRET=your_jwt_secret


#### Start the server:

npm start