# Techonquer Admin Panel

A modern, beautiful admin dashboard for the Techonquer platform with enhanced UI/UX design.

## 🚀 Features

- **Modern UI Design**: Beautiful gradient backgrounds, glassmorphism effects, and smooth animations
- **Responsive Layout**: Works perfectly on desktop, tablet, and mobile devices
- **Real-time Dashboard**: Interactive charts and statistics
- **User Management**: Complete user administration system
- **Course Management**: Full CRUD operations for courses
- **Testimonials**: Manage customer testimonials
- **File Manager**: Upload and manage files
- **Secure Authentication**: Session-based authentication with bcrypt password hashing

## 🎨 UI Improvements

- **Enhanced Login Page**: Modern gradient design with animated background elements
- **Improved Sidebar**: Better navigation with hover effects and user profile section
- **Modern Header**: Search functionality, notifications dropdown, and user profile
- **Beautiful Dashboard**: Interactive charts with gradient cards and statistics
- **Smooth Animations**: CSS animations and transitions throughout the interface

## 📋 Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- npm or yarn package manager

## 🛠️ Installation

### 1. Clone the repository
```bash
git clone <repository-url>
cd techo
```

### 2. Backend Setup
```bash
cd Techonquer-Backend

# Install dependencies
npm install

# Create environment file
cp env_example .env

# Edit .env file with your MongoDB URI and other configurations
# MONGODB_URI=your_mongodb_connection_string
# SESSION_SECRET=your_session_secret
# PORT=5000

# Create admin user (optional - credentials are already set up)
node scripts/createAdmin.js

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

## 🔐 Default Admin Credentials

The system comes with pre-configured admin credentials:

- **Email**: `sample@gmail.com`
- **Password**: `Sample@123`

These credentials are automatically created when you run the admin creation script.

## 🌐 Access URLs

- **Backend API**: http://localhost:5000
- **Admin Panel**: http://localhost:5173 (or the port shown by Vite)

## 📁 Project Structure

```
techo/
├── Techonquer-Backend/          # Backend API
│   ├── controllers/             # API controllers
│   ├── models/                  # Database models
│   ├── routes/                  # API routes
│   ├── middleware/              # Custom middleware
│   ├── config/                  # Configuration files
│   ├── scripts/                 # Utility scripts
│   └── server.js               # Main server file
├── techonquer-admin/            # Frontend Admin Panel
│   ├── src/
│   │   ├── pages/              # Page components
│   │   ├── components/         # Reusable components
│   │   ├── utils/              # Utility functions
│   │   └── App.jsx            # Main app component
│   └── package.json
└── README.md
```

## 🎯 Available Scripts

### Backend
- `npm start` - Start production server
- `npm run dev` - Start development server with nodemon
- `node scripts/createAdmin.js` - Create admin user

### Frontend
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `GET /api/auth/profile` - Get current user profile

### Courses
- `GET /api/courses` - Get all courses
- `POST /api/courses` - Create new course
- `PUT /api/courses/:id` - Update course
- `DELETE /api/courses/:id` - Delete course

### Testimonials
- `GET /api/testimonials` - Get all testimonials
- `POST /api/testimonials` - Create new testimonial
- `PUT /api/testimonials/:id` - Update testimonial
- `DELETE /api/testimonials/:id` - Delete testimonial

### Files
- `GET /api/files` - Get all files
- `POST /api/files/upload` - Upload file
- `DELETE /api/files/:id` - Delete file

## 🎨 UI Components

### Login Page
- Modern gradient background with animated blobs
- Glassmorphism card design
- Loading states and error handling
- Demo credentials display

### Dashboard
- Interactive charts using Recharts
- Gradient statistics cards
- Responsive grid layout
- Real-time data visualization

### Sidebar
- Smooth hover animations
- User profile section
- Active state indicators
- Mobile responsive design

### Header
- Search functionality
- Notifications dropdown
- User profile display
- Logout functionality

## 🚀 Deployment

### Backend Deployment
1. Set up environment variables for production
2. Use PM2 or similar process manager
3. Configure reverse proxy (nginx)
4. Set up SSL certificates

### Frontend Deployment
1. Build the project: `npm run build`
2. Deploy the `dist` folder to your hosting service
3. Configure environment variables for API endpoints

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the ISC License.

## 🆘 Support

For support and questions, please contact the development team or create an issue in the repository.

---

**Techonquer Admin Panel** - Modern, Beautiful, Functional ✨ 