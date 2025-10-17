import { useSelector } from "react-redux";

import ApplyLeaveForm from "../features/leave/ApplyLeaveForm";
import LeaveList from "../features/leave/LeaveList";
import LeaveTable from "../features/leave/LeaveTable";
import "./Dashboard.css";

export default function Dashboard() {
  const { user } = useSelector((state) => state.auth);
  const { leaves } = useSelector((state) => state.leave);

  const stats = {
    total: leaves.length,
    pending: leaves.filter((l) => l.status === "Pending").length,
    approved: leaves.filter((l) => l.status === "Approved").length,
    rejected: leaves.filter((l) => l.status === "Rejected").length,
  };

  return (
    <div className="dashboard-container">
      <h1>Welcome, {user?.name}</h1>

      <div className="stats-cards">
        <div className="card total">
          <h3>Total Leaves</h3>
          <span>{stats.total}</span>
        </div>
        <div className="card pending">
          <h3>Pending</h3>
          <span>{stats.pending}</span>
        </div>
        <div className="card approved">
          <h3>Approved</h3>
          <span>{stats.approved}</span>
        </div>
        <div className="card rejected">
          <h3>Rejected</h3>
          <span>{stats.rejected}</span>
        </div>
      </div>

      {user?.role === "employee" && (
        <>
          <h2>Apply Leave</h2>
          <ApplyLeaveForm />
          <h2>My Leaves</h2>
          <LeaveList />
        </>
      )}

      {user?.role === "admin" && (
        <>
          <h2>All Leaves</h2>
          <LeaveTable adminView={true} />
        </>
      )}
    </div>
  );
}
