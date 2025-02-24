# Task-Management-Application


A full-stack Task Management application built with React, TypeScript, Node.js, and PostgreSQL.

## Database Setup

1. Install PostgreSQL
2. Create database:
```sql
CREATE DATABASE task_management;
```

3. Set up environment variables:
Create `.env` in backend directory:
```env
PORT=5000
DB_HOST=localhost
DB_USER=
DB_PASS=
DB_NAME=task_management
JWT_SECRET=
```

## Backend Setup

```bash
cd backend
npm install
npm run dev
```

The server will run on http://localhost:5000

## Frontend Setup

```bash
cd frontend
npm install
npm start
```

The application will run on http://localhost:3000

## Testing

### Backend Tests
```bash
cd backend
npm test
```

### Frontend Tests
```bash
cd frontend
npm test
```

## API Documentation

### Authentication
- POST `/auth/register` - Register new user
- POST `/auth/login` - Login user

### Tasks (Protected Routes)
- GET `/api/tasks` - Get all tasks
- POST `/api/tasks` - Create task
- PUT `/api/tasks/:id` - Update task
- DELETE `/api/tasks/:id` - Delete task

## Demo Video

[https://drive.google.com/file/d/1zROcakyvrsMJCZ01PcW9trGDtXVHLxgh/view?usp=sharing]

## Expected Monthly Salary: $1300-2400/month

## Tech Stack

### Frontend
- React with TypeScript
- Material-UI
- React Router
- Axios
- Context API for state management

### Backend
- Node.js with Express
- TypeScript
- PostgreSQL with Sequelize
- JWT Authentication
- CORS enabled
