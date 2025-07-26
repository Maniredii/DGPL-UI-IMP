# Techonquer Backend

A Node.js backend application with MongoDB for managing testimonials and courses with session-based authentication.

## Features

- 🔐 Session-based authentication (no JWT)
- 👥 User registration and login
- 🛡️ Admin registration (conditional based on environment variable)
- 📝 Testimonials CRUD operations
- 🎓 Courses CRUD operations
- 🔒 Role-based access control
- 📊 Data validation
- 🚀 RESTful API design

## Technology Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: Express Session
- **Validation**: Express Validator
- **Security**: Helmet, CORS
- **Logging**: Morgan

## Installation

1. Clone the repository
2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

4. Configure your `.env` file:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/techonquer
SESSION_SECRET=your_session_secret_key_here
NODE_ENV=development
ADMIN_REG=false
```

5. Start the server:
```bash
# Development
npm run dev

# Production
npm start
```

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Server port | 5000 |
| `MONGODB_URI` | MongoDB connection string | mongodb://localhost:27017/techonquer |
| `SESSION_SECRET` | Secret key for sessions | Required |
| `NODE_ENV` | Environment mode | development |
| `ADMIN_REG` | Enable admin registration | false |

## API Endpoints

### Authentication

#### Register User
- **POST** `/api/auth/register`
- **Body**:
```json
{
  "username": "string",
  "email": "string",
  "password": "string"
}
```

#### Register Admin (Only when ADMIN_REG=true)
- **POST** `/api/auth/register-admin`
- **Body**:
```json
{
  "username": "string",
  "email": "string",
  "password": "string"
}
```

#### Login
- **POST** `/api/auth/login`
- **Body**:
```json
{
  "email": "string",
  "password": "string"
}
```

#### Logout
- **POST** `/api/auth/logout`

#### Get Current User
- **GET** `/api/auth/me`

### Testimonials

#### Get All Testimonials
- **GET** `/api/testimonials`
- **Query Params**: `page`, `limit`, `isActive`

#### Get Testimonial by ID
- **GET** `/api/testimonials/:id`

#### Create Testimonial (Admin Only)
- **POST** `/api/testimonials`
- **Body**:
```json
{
  "name": "string",
  "designation": "string",
  "company": "string",
  "message": "string",
  "rating": "number",
  "image": "string"
}
```

#### Update Testimonial (Admin Only)
- **PUT** `/api/testimonials/:id`

#### Delete Testimonial (Admin Only)
- **DELETE** `/api/testimonials/:id`

### Courses

#### Get All Courses
- **GET** `/api/courses`
- **Query Params**: `page`, `limit`, `category`, `level`, `isActive`, `isFeatured`, `sortBy`, `sortOrder`

#### Get Course Categories
- **GET** `/api/courses/categories`

#### Get Course by ID
- **GET** `/api/courses/:id`

#### Create Course (Admin Only)
- **POST** `/api/courses`
- **Body**:
```json
{
  "title": "string",
  "description": "string",
  "shortDescription": "string",
  "instructor": "string",
  "duration": "string",
  "level": "Beginner|Intermediate|Advanced",
  "price": "number",
  "originalPrice": "number",
  "category": "string",
  "tags": ["string"],
  "image": "string",
  "curriculum": [
    {
      "title": "string",
      "duration": "string",
      "description": "string"
    }
  ],
  "requirements": ["string"],
  "whatYouWillLearn": ["string"]
}
```

#### Update Course (Admin Only)
- **PUT** `/api/courses/:id`

#### Delete Course (Admin Only)
- **DELETE** `/api/courses/:id`

### Health Check
- **GET** `/health`

## Authentication Flow

1. **User Registration**: Users can register with username, email, and password
2. **Admin Registration**: Only available when `ADMIN_REG=true` in environment
3. **Login**: Creates a session and stores user data
4. **Session Management**: Uses MongoDB to store sessions
5. **Authorization**: Middleware checks user roles for protected routes

## Data Models

### User
```javascript
{
  username: String, // unique, 3-30 chars
  email: String, // unique, valid email
  password: String, // hashed, min 6 chars
  role: String, // 'admin' or 'user'
  isActive: Boolean,
  timestamps: true
}
```

### Testimonial
```javascript
{
  name: String, // max 100 chars
  designation: String, // max 100 chars
  company: String, // optional, max 100 chars
  message: String, // max 1000 chars
  rating: Number, // 1-5
  image: String, // URL
  isActive: Boolean,
  createdBy: ObjectId, // User reference
  timestamps: true
}
```

### Course
```javascript
{
  title: String, // max 200 chars
  description: String, // max 2000 chars
  shortDescription: String, // max 500 chars
  instructor: String, // max 100 chars
  duration: String,
  level: String, // Beginner|Intermediate|Advanced
  price: Number,
  originalPrice: Number,
  category: String,
  tags: [String],
  image: String, // URL
  curriculum: [Object],
  requirements: [String],
  whatYouWillLearn: [String],
  isActive: Boolean,
  isFeatured: Boolean,
  enrolledStudents: Number,
  rating: Number, // 0-5
  createdBy: ObjectId, // User reference
  timestamps: true
}
```

## Security Features

- Password hashing with bcryptjs
- Session-based authentication
- CORS protection
- Helmet for security headers
- Input validation and sanitization
- Role-based access control

## Error Handling

The API returns consistent error responses:
```json
{
  "success": false,
  "message": "Error description",
  "errors": ["Detailed error messages"]
}
```

## Development

```bash
# Install dependencies
npm install

# Start development server with auto-reload
npm run dev

# Start production server
npm start
```

## License

ISC
