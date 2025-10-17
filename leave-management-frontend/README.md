# Leave Management System - Frontend

This is the frontend React application for managing employee leaves, built with **React**, **Redux** (for state management, to be integrated later), and other dependencies.

---

## **Setup & Run**

1. **Clone the repository**

```bash
git clone <https://github.com/SahanNimantha99/leave-management-frontendl>
cd leave-management-frontend
```

2. **Install dependencies**

```bash
npm install
```

3. **Configure environment variables**

Create a `.env` file in the root directory with the following:

```env
REACT_APP_API_BASE_URL=http://localhost:5000/api
```

4. **Start the development server**

```bash
npm start
```

The frontend runs on `http://localhost:3000`.

---

## **Features**

### **Employee**
- Apply for leave
- Edit pending leave
- Cancel pending leave

### **Admin**
- View all leaves
- Approve or reject pending leaves
- Filter leaves by status

### **General**
- Notifications via toast messages
- Client-side validation for dates and required fields
- State management with **Redux**

---
