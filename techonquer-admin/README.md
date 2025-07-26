# 🔐 Vulnhut Admin Dashboard

The **Vulnhut Admin Dashboard** is a modern, responsive interface built using **React** and **Tailwind CSS**, designed to help administrators manage users, courses, reports, and settings with ease.

---

## 🚀 Features

- 🔑 Admin-only access control using `localStorage`
- 📊 Interactive charts with `recharts`
- 👥 User, Course, Report, and Settings modules
- 💡 Clean, dark UI inspired by Vulnhut design
- 📱 Fully responsive layout with sidebar navigation

---

## 🗂️ Project Structure

vulnhut-admin/
├── public/
├── src/
│ ├── Header.jsx
│ ├── Sidebar.jsx
│ ├── App.jsx
│ ├── App.css
│ ├── main.jsx
│ └── pages/
│ ├── Dashboard.jsx
│ ├── Courses.jsx
│ ├── Users.jsx
│ ├── Reports.jsx
│ └── Settings.jsx
└── README.md

yaml
Copy
Edit

---

## 🛠️ Tech Stack

- **React.js**
- **Tailwind CSS**
- **Vite**
- **Recharts**
- **React Router DOM**

---

## 📦 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/riya810sri/vulnhut-admin.git
cd vulnhut-admin
2. Install dependencies
bash
Copy
Edit
npm install
3. Start development server
bash
Copy
Edit
npm run dev
Visit: http://localhost:5173

🔐 Admin Login Flow
On successful login, set localStorage.setItem("isAdmin", "true").

Unauthorized access is redirected to /login.

📦 Deployment (Optional)
To deploy using GitHub Pages, Netlify, or Vercel:

bash
Copy
Edit
npm run build
Then follow the platform's deployment instructions.

📸 Preview (Add Screenshot)
![Dashboard UI](./public/Dashboard.png)


📄 License
This project is licensed under the MIT License.

yaml
Copy
Edit

---

Let me know if you want this as a `.md` file or if you plan to add backend integration or authentication.






