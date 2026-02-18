# Chaind

A full-stack web application built with Node.js, Vue.js, PrimeVue, Vite, and MySQL.

## Technology Stack

- **Backend**: Node.js with Express
- **Frontend**: Vue.js 3 with Vite
- **UI Library**: PrimeVue
- **Database**: MySQL
- **Build Tool**: Vite

## Project Structure

```
chaind/
├── backend/          # Node.js Express API server
│   ├── server.js     # Main server file
│   ├── package.json
│   └── .env.example  # Environment variables template
├── frontend/         # Vue.js + PrimeVue application
│   ├── src/
│   │   ├── App.vue   # Main application component
│   │   └── main.js   # Application entry point
│   ├── package.json
│   └── vite.config.js
└── README.md
```

## Prerequisites

Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v18 or higher)
- [MySQL](https://www.mysql.com/) (v8.0 or higher)
- npm (comes with Node.js)

## Setup Instructions

### 1. Clone the Repository

```bash
git clone <repository-url>
cd chaind
```

### 2. Database Setup

1. Start your MySQL server
2. Create a database for the application:

```sql
CREATE DATABASE chaind_db;
```

### 3. Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file from the example:
```bash
cp .env.example .env
```

4. Update the `.env` file with your MySQL credentials:
```
PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=chaind_db
```

5. Start the backend server:
```bash
npm start
```

The backend server will run on `http://localhost:3000`

### 4. Frontend Setup

1. Open a new terminal and navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The frontend application will run on `http://localhost:5173`

## Running the Application

1. Start the MySQL server
2. Start the backend server (in the `backend` directory):
   ```bash
   npm start
   ```
3. Start the frontend server (in the `frontend` directory):
   ```bash
   npm run dev
   ```
4. Open your browser and navigate to `http://localhost:5173`

## API Endpoints

- `GET /` - Welcome message
- `GET /api/health` - Health check endpoint
- `GET /api/data` - Sample data endpoint with database query

## Development

### Backend Development

The backend uses:
- **Express** for the web server
- **mysql2** for database connections
- **cors** for Cross-Origin Resource Sharing
- **dotenv** for environment variables

### Frontend Development

The frontend uses:
- **Vue.js 3** with Composition API
- **PrimeVue** for UI components
- **Vite** for fast development and building
- **PrimeIcons** for icons

## Building for Production

### Backend
```bash
cd backend
npm start
```

### Frontend
```bash
cd frontend
npm run build
npm run preview
```

## Troubleshooting

### Backend won't start
- Ensure MySQL is running
- Check that the database credentials in `.env` are correct
- Verify the database exists

### Frontend can't connect to backend
- Ensure the backend server is running on port 3000
- Check browser console for CORS errors
- Verify the proxy configuration in `vite.config.js`

### Database connection errors
- Verify MySQL is running: `mysql -u root -p`
- Check that the database exists: `SHOW DATABASES;`
- Confirm credentials in `.env` match your MySQL setup

## License

ISC
