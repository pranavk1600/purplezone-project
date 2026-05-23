# Grammar Error Correction System

A full-stack MERN application with React, Tailwind CSS, Express, MongoDB, and JWT authentication.

## Project Structure

- `client/` — React + Vite frontend
- `server/` — Node.js + Express backend
- `server/.env.example` — backend environment variables
- `client/.env.example` — frontend environment variables

## Setup Instructions

### 1. Install dependencies

Open two terminals.

Backend:
```bash
cd "c:\Users\Pranav Kondhalkar\Desktop\Interview Project\server"
npm install
```

Frontend:
```bash
cd "c:\Users\Pranav Kondhalkar\Desktop\Interview Project\client"
npm install
```

### 2. Configure MongoDB

1. Open MongoDB Compass.
2. Connect to `mongodb://localhost:27017/grammar_checker`.
3. Create the database if it does not already exist.

### 3. Create environment files

Backend:
- Copy `server/.env.example` to `server/.env`
- Add a secure `JWT_SECRET`

Frontend:
- Copy `client/.env.example` to `client/.env`
- Leave API URL as needed.

### 4. Run the application

Backend:
```bash
cd "c:\Users\Pranav Kondhalkar\Desktop\Interview Project\server"
npm run dev
```

Frontend:
```bash
cd "c:\Users\Pranav Kondhalkar\Desktop\Interview Project\client"
npm run dev
```

### 5. Test the app

- Visit `http://localhost:5173`
- Register a new user
- Edit the grammar statements on the dashboard
- Submit answers and review your score on the results page

## API Endpoints

- `POST /api/auth/register` — register a user
- `POST /api/auth/login` — login
- `GET /api/statements` — load grammar statements
- `PUT /api/statements/:id/submission` — save corrected answer
- `POST /api/results/submit` — submit answers for scoring
- `GET /api/results/my` — fetch user results

## Notes

- Sample statements are seeded automatically on backend startup.
- The backend stores users, statements, submissions, and results in MongoDB.
- Protected routes require a valid JWT token.
