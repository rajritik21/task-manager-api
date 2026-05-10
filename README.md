# Task Manager API - Backend

Backend REST API for the Task Manager Todo Application built with Node.js, Express, and MongoDB.

## 📋 Overview

This is the server-side API that handles:
- User authentication and authorization (JWT)
- Todo/Task CRUD operations
- User management
- Database operations with MongoDB
- Request validation and security

## 🔧 Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT (JSON Web Tokens)
- **Password Security**: bcryptjs
- **Validation**: Zod
- **Development**: Nodemon

## 📦 Installation

```bash
npm install
```

## 🔐 Environment Variables

Create a `.env` file:

```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/taskmanager
JWT_SECRET=your_secret_key_here
PORT=5001
NODE_ENV=development
```

## ▶️ Running

**Development** (with auto-reload):
```bash
npm run dev
```

**Production**:
```bash
npm start
```

Server runs on `http://localhost:5001`

## 📚 API Endpoints

- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/todos` - Get all todos (auth required)
- `POST /api/todos` - Create todo (auth required)
- `PUT /api/todos/:id` - Update todo (auth required)
- `DELETE /api/todos/:id` - Delete todo (auth required)
- `GET /api/tasks` - Get all tasks (auth required)
- `GET /api/users/:id` - Get user info (auth required)

## 📁 Project Structure

```
backend/
├── server.js                 # Express server entry
├── package.json             # Dependencies
├── .env                     # Environment variables
├── middleware/
│   ├── auth.js             # JWT authentication
│   └── todoValidation.js   # Input validation
├── models/
│   ├── User.js             # User schema
│   ├── Todo.js             # Todo schema
│   └── Task.js             # Task schema
└── routes/
    ├── auth.js             # Auth routes
    ├── todos.js            # Todo routes
    ├── tasks.js            # Task routes
    └── users.js            # User routes
```

## 🚀 Deployment

Deploy to [Render](https://render.com):
1. Connect your GitHub repository
2. Set environment variables
3. Build command: `npm install`
4. Start command: `npm start`

## 🔒 Security

- Password hashing with bcryptjs
- JWT-based authentication
- CORS protection
- Input validation with Zod
- Environment variables for sensitive data

## 📝 License

MIT

