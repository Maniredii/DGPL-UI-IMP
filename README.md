# Techonquer Admin Dashboard

A modern, responsive admin dashboard for the Techonquer platform with beautiful UI and comprehensive management features.

## 🚀 Features

### ✨ Modern UI/UX
- **Glass Morphism Design**: Beautiful backdrop blur effects and modern styling
- **Responsive Layout**: Works perfectly on desktop, tablet, and mobile devices
- **Dark Theme**: Eye-friendly dark theme with purple and blue accents
- **Smooth Animations**: CSS animations and transitions for better user experience
- **Interactive Charts**: Real-time data visualization with Recharts

### 🔐 Authentication
- **Secure Login System**: Session-based authentication with MongoDB
- **Default Admin Credentials**: Pre-configured admin account for easy setup
- **Password Security**: Bcrypt hashing for password protection
- **Session Management**: Secure session handling with MongoDB store

### 📊 Dashboard Features
- **Real-time Analytics**: Live charts and statistics
- **User Management**: Complete user administration
- **Course Management**: Full CRUD operations for courses
- **File Management**: Upload and manage files
- **Reports Generation**: Analytics and reporting tools
- **Recent Activities**: Live activity feed

## 🛠️ Tech Stack

### Frontend
- **React 18**: Modern React with hooks and functional components
- **React Router**: Client-side routing
- **Tailwind CSS**: Utility-first CSS framework
- **Recharts**: Beautiful and responsive charts
- **React Icons**: Comprehensive icon library

### Backend
- **Node.js**: JavaScript runtime
- **Express.js**: Web application framework
- **MongoDB**: NoSQL database with Mongoose ODM
- **Express Session**: Session management
- **Bcrypt**: Password hashing
- **Multer**: File upload handling
- **Helmet**: Security middleware

## 📦 Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or cloud instance)
- npm or yarn package manager

### 1. Clone the Repository
```bash
git clone <repository-url>
cd techo
```

### 2. Backend Setup
```bash
cd Techonquer-Backend

# Install dependencies
npm install

# Create .env file
cp env_example .env

# Configure your .env file with:
# MONGODB_URI=your_mongodb_connection_string
# SESSION_SECRET=your_session_secret
# PORT=5000 (optional, defaults to 5000)

# Create default admin user
npm run create-admin

# Start the backend server
npm run dev
```

### 3. Frontend Setup
```bash
cd techonquer-admin

# Install dependencies
npm install

# Start the development server
npm run dev
```

### 4. Access the Application
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:5000

## 🔑 Default Admin Credentials

The system comes with a pre-configured admin account:

- **Email**: `sample@gmail.com`
- **Password**: `Sample@123`

> **Note**: You can create additional admin users through the API or modify the credentials in the `scripts/createAdmin.js` file.

## 📁 Project Structure

```
techo/
├── Techonquer-Backend/          # Backend API
│   ├── config/                  # Database configuration
│   ├── controllers/             # Route controllers
│   ├── middleware/              # Custom middleware
│   ├── models/                  # MongoDB models
│   ├── routes/                  # API routes
│   ├── scripts/                 # Utility scripts
│   ├── uploads/                 # File uploads directory
│   └── server.js                # Main server file
├── techonquer-admin/            # Frontend React app
│   ├── src/
│   │   ├── pages/              # Page components
│   │   ├── utils/              # Utility functions
│   │   ├── assets/             # Static assets
│   │   ├── App.jsx             # Main app component
│   │   ├── Sidebar.jsx         # Navigation sidebar
│   │   └── main.jsx            # App entry point
│   └── package.json
└── README.md
```

## 🎨 UI Components

### Login Page
- Modern glass morphism design
- Animated background blobs
- Password visibility toggle
- Loading states and error handling
- Demo credentials display

### Dashboard
- Real-time greeting based on time
- Interactive statistics cards
- Multiple chart types (Line, Pie)
- Recent activities feed
- Notification system

### Sidebar Navigation
- User profile section
- Active state indicators
- Hover effects and animations
- System status indicator

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `GET /api/auth/me` - Get current user
- `POST /api/auth/register` - User registration
- `POST /api/auth/register-admin` - Admin registration

### Courses
- `GET /api/courses` - Get all courses
- `POST /api/courses` - Create new course
- `PUT /api/courses/:id` - Update course
- `DELETE /api/courses/:id` - Delete course

### Users
- `GET /api/users` - Get all users
- `POST /api/users` - Create new user
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user

### Files
- `GET /api/files` - Get all files
- `POST /api/files/upload` - Upload file
- `DELETE /api/files/:id` - Delete file

## 🚀 Deployment

### Backend Deployment
1. Set up environment variables for production
2. Configure MongoDB connection
3. Set `NODE_ENV=production`
4. Deploy to your preferred platform (Heroku, Vercel, etc.)

### Frontend Deployment
1. Update API base URL in `src/utils/api.js`
2. Build the project: `npm run build`
3. Deploy the `dist` folder to your hosting platform

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📝 License

This project is licensed under the ISC License.

## 🆘 Support

If you encounter any issues or have questions:

1. Check the documentation
2. Review the code comments
3. Create an issue in the repository
4. Contact the development team

## 🔄 Updates

### Recent Updates
- ✅ Added default admin credentials
- ✅ Enhanced UI with glass morphism design
- ✅ Improved dashboard with real-time data
- ✅ Added comprehensive navigation
- ✅ Implemented responsive design
- ✅ Added loading states and animations

---

**Techonquer Admin Dashboard** - Modern, Secure, Beautiful ✨ 