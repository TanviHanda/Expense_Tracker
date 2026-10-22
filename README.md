# Expense Tracker

A full-stack Expense Tracker built to manage daily expenses, income, and monthly budgets in one place.

## Live Demo

[View Live Project](https://expense-tracker-beta-nine-31.vercel.app)

## Features

- User authentication with email verification
- Add, edit, and delete expenses
- Track and manage income
- Create and manage monthly budgets
- User-specific data protection with Supabase Row Level Security (RLS)
- Dashboard to view financial information
- Persistent data storage
- Responsive user interface

## Tech Stack

**Frontend**
- React.js
- Vite
- Tailwind CSS
- React Router DOM
- Axios

**Backend**
- Node.js
- Express.js
- REST APIs

**Database & Authentication**
- Supabase
- PostgreSQL
- Supabase Auth
- Row Level Security (RLS)

**Deployment**
- Vercel — Frontend
- Render — Backend

## Security

- Email verification for user accounts
- Protected frontend routes
- Authenticated API requests
- User-specific database access through RLS policies
- Environment variables for configuration and secrets

## Run Locally

### 1. Clone the repository

```bash
git clone https://github.com/TanviHanda/Expense_Tracker.git
cd Expense_Tracker
```

### 2. Setup the Backend

```bash
cd Backend
npm install
```

Create a `.env` file inside `Backend/`:

```env
SUPABASE_URL=your_supabase_url
SUPABASE_SECRET_KEY=your_supabase_secret_key
PORT=5000
```

Start the backend:

```bash
npm run dev
```

### 3. Setup the Frontend

Open another terminal:

```bash
cd frontend
npm install
```

Create a `.env` file inside `frontend/`:

```env
VITE_API_URL=http://localhost:5000
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_PUBLISHABLE_KEY=your_supabase_publishable_key
```

Start the frontend:

```bash
npm run dev
```

## Project Structure

```text
Expense_Tracker/
├── Backend/
│   ├── src/
│   ├── package.json
│   └── .env
├── frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── .env
└── README.md
```

## What I Learned

- Building REST APIs with Node.js and Express
- Connecting a React frontend to a deployed backend
- Implementing authentication and protected routes
- Managing relational data with Supabase and PostgreSQL
- Securing user data with Row Level Security
- Deploying a full-stack application

## Author

**Tanvi Handa**

- GitHub: [@TanviHanda](https://github.com/TanviHanda)
- X: [@T_dev02](https://x.com/T_dev02)

---

Built while learning and building full-stack applications.
