# Payroll Management System

A comprehensive full-stack payroll management system built with modern web technologies.

## 🚀 Features

- **Employee Management**: Add, edit, and manage employee records
- **Department Management**: Organize employees by departments
- **Attendance Tracking**: Monitor employee attendance with detailed sheets
- **Salary Management**: Calculate and manage employee salaries
- **Leave Management**: Handle employee leave requests and approvals
- **Role-Based Access**: Admin and Employee dashboards with different permissions
- **Authentication**: Secure login system with JWT tokens
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## 🛠 Tech Stack

### Frontend
- **React 19** - Modern React with latest features
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **React Router DOM** - Client-side routing
- **Axios** - HTTP client for API calls
- **React Icons** - Icon library
- **React Data Table Component** - Advanced data tables

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - ODM for MongoDB
- **JWT** - JSON Web Tokens for authentication
- **Bcrypt** - Password hashing
- **Multer** - File upload handling
- **CORS** - Cross-origin resource sharing

## 📁 Project Structure

```
Payroll_MS/
├── payroll/                 # Frontend (React App)
│   ├── src/
│   │   ├── components/      # Reusable React components
│   │   ├── pages/          # Page components
│   │   ├── context/        # React Context for state management
│   │   └── utils/          # Utility functions and route guards
│   └── public/             # Static assets
├── server/                 # Backend (Node.js API)
│   ├── controllers/        # Route controllers
│   ├── models/            # MongoDB models
│   ├── routes/            # API routes
│   ├── middleware/        # Custom middleware
│   └── db/                # Database configuration
└── uploads/               # File upload storage
```

## 🚦 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or cloud instance)
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Muhammadjawad934/Payroll-Management-System.git
   cd Payroll-Management-System
   ```

2. **Install dependencies**
   
   Frontend:
   ```bash
   cd payroll
   npm install
   ```
   
   Backend:
   ```bash
   cd ../server
   npm install
   ```

3. **Environment Setup**
   
   Create a `.env` file in the server directory:
   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/payroll_db
   JWT_SECRET=your_jwt_secret_key
   ```

4. **Start the application**
   
   Backend server:
   ```bash
   cd server
   npm run dev
   ```
   
   Frontend (in a new terminal):
   ```bash
   cd payroll
   npm run dev
   ```

5. **Access the application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:5000

## 📊 Database Models

- **User**: Authentication and user roles
- **Employee**: Employee information and details
- **Department**: Department management
- **Attendance**: Employee attendance records
- **Salary**: Salary calculations and records
- **Leave**: Leave requests and approvals
- **Settings**: Application settings

## 🔐 Authentication & Authorization

The system implements role-based access control with:
- **Admin**: Full access to all features
- **Employee**: Limited access to personal data and leave requests

## 🧪 Testing

Run backend tests:
```bash
cd server
npm test
```

## 📝 API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration

### Employees
- `GET /api/employees` - Get all employees
- `POST /api/employees` - Create new employee
- `PUT /api/employees/:id` - Update employee
- `DELETE /api/employees/:id` - Delete employee

### Departments
- `GET /api/departments` - Get all departments
- `POST /api/departments` - Create new department

### Attendance
- `GET /api/attendances` - Get attendance records
- `POST /api/attendances` - Mark attendance

### Salaries
- `GET /api/salaries` - Get salary records
- `POST /api/salaries` - Process salaries

### Leaves
- `GET /api/leaves` - Get leave requests
- `POST /api/leaves` - Submit leave request
- `PUT /api/leaves/:id` - Update leave status

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the ISC License.

## 👤 Author

**Muhammad Jawad**
- GitHub: [@Muhammadjawad934](https://github.com/Muhammadjawad934)

## 🙏 Acknowledgments

- Thanks to all contributors who helped build this system
- Inspired by modern payroll management needs
- Built with love for the developer community