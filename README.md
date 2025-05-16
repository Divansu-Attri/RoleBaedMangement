# Role-Based Management Admin Panel

This is a full-stack MERN (MongoDB, Express.js, React.js, Node.js) application with **Role-Based Access Control** designed to manage teams, products, and orders. The system defines three user roles: **Admin**, **Manager**, and **Employee**, each with specific permissions and features.

---

## 🔑 Features

### 🧑‍💼 User Roles & Permissions
- **Admin**:
  - Add and manage team members
  - Assign roles (Manager or Employee)
  - Add and edit products

- **Manager**:
  - View team members assigned to them
  - Manage orders placed by their team members
  - Add and edit products

- **Employee**:
  - Place orders for products

---

### 👥 Team Management
- Admins can create and manage users
- Managers can view their assigned team members

---

### 📦 Product Management
- Admins and Managers can:
  - Add new products
  - Edit product details
- Each product has:
  - Name
  - Description
  - Price
  - Image

---

### 📑 Order Management
- Employees can:
  - Place orders for products
- Orders include:
  - Customer Name
  - Product Details
  - Order Status (Pending, Delivered, Cancelled)

---

## 💻 Tech Stack

### Frontend
- React.js (or Next.js)
- Axios
- Bootstrap / Tailwind CSS (for responsive UI)
- Role-based UI rendering

### Backend
- Node.js
- Express.js
- MongoDB + Mongoose
- JWT Authentication
- Role-based Authorization Middleware

---

## ⚙️ Installation & Setup

### 1. Clone the repository
```bash
git clone https://github.com/Divansu-Attri//role-based-admin-panel.git
cd role-based-admin-panel

cd server
npm install
npm start


cd client
npm install

npm run dev