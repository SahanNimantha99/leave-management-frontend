# Leave Management System - Frontend

This is a modern **React** frontend application for managing employee leave requests in an organization. It provides a clean and intuitive UI for employees to apply for leave and track their leave status, and for admins to monitor and approve/reject requests.

The app leverages **React Router** for navigation between login and dashboard pages, **Redux** Toolkit for state management, and **React Toastify** for user notifications. All leave data is maintained in the frontend store, enabling fast updates and seamless user experience.

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

## **Key Features**

### **Authentication**
- Login page with validation (email/password)
- Maintains user session in Redux store
- Role-based access (Employee / Admin)

### **Employee Flows**
- Apply for leave via a form with required fields (`fromDate`, `toDate`, `reason`) and valid date range validation
- View a list/table of their leave requests (state-managed)
- Edit or cancel leave only if status is `Pending`
- Receive notifications on leave actions

### **Admin Flows**
- View all leave requests in a table/list
- Approve or reject leave requests (update status)
- Filter leave requests by status: `Pending`, `Approved`, `Rejected`
- Simple pagination or scrolling for large lists
- Receive notifications on approvals/rejections

### **General Features**
- State management with **Redux Toolkit** for leave and session state
- Responsive UI and clean table/list design
- Notifications via **React Toastify**
- Form validation for leave creation and updates
- Handles overlapping leave conflict detection (frontend validation)
- Role-based view and action restrictions
- Fully integrated routing with **React Router**

---

## **Application Structure**

```
src/
├── api/                  
├── components/           
├── features/
│   ├── auth/             
│   └── leave/     
├── pages/           
├── routes/
├── utils/                  
├── App.js                
└── index.js
```

---

## **Sample User Credentials**

| Role      | Email                    | Password     |
|-----------|--------------------------|--------------|
| Admin     | admin@example.com        | admin123     |
| Employee  | employee@gmail.com"      | emp123       |

---

## **Sample API Requests (via curl / Postman)**

1. **Fetch leaves**

```bash
curl -H "Authorization: Bearer <TOKEN>" http://localhost:5000/api/leaves
```

2. **Apply for leave**

```bash
curl -X POST http://localhost:5000/api/leaves \
-H "Authorization: Bearer <TOKEN>" \
-H "Content-Type: application/json" \
-d '{"fromDate":"2025-10-20","toDate":"2025-10-25","reason":"Vacation"}'
```

3. **Approve leave (Admin)**

```bash
curl -X PUT http://localhost:5000/api/leaves/1/approve \
-H "Authorization: Bearer <ADMIN_TOKEN>" \
-H "Content-Type: application/json" \
-d '{"status":"Approved"}'
```

4. **Cancel leave (Employee)**

```bash
curl -X DELETE http://localhost:5000/api/leaves/1 \
-H "Authorization: Bearer <EMPLOYEE_TOKEN>"
```

---

## **Scripts**

```bash
npm start
```