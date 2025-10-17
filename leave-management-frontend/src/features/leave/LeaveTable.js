import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchLeaves, deleteLeave, updateLeave } from "./leaveSlice";
import { toast } from "react-toastify";

export default function LeaveTable({ adminView }) {
  // Redux dispatch and state
  const dispatch = useDispatch();
  const { leaves } = useSelector((state) => state.leave);
  const [filter, setFilter] = useState("All");

  // Fetch leaves on mount
  useEffect(() => {
    dispatch(fetchLeaves());
  }, [dispatch]);

  // Handle approve/reject for admin
  const handleUpdate = async (leave, status) => {
    await dispatch(updateLeave({ id: leave.id, updates: { status } }));
    toast.success(`Leave ${status}`);
    dispatch(fetchLeaves()); // refresh after update
  };

  // Handle cancel for employee
  const handleCancel = (leave) => {
    dispatch(deleteLeave(leave.id));
    toast.success("Leave canceled");
  };

  // Filter leaves based on status
  const filteredLeaves =
    filter === "All"
      ? leaves
      : leaves.filter((l) => l.status.toLowerCase() === filter.toLowerCase());

  return (
    <div>
      {adminView && (
        <div className="filter-container">
          <label>Filter by Status:</label>
          <select value={filter} onChange={(e) => setFilter(e.target.value)}>
            <option value="All">All</option>
            <option value="Pending">Pending</option>
            <option value="Approved">Approved</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>
      )}

      <table className="leave-table">
        <thead>
          <tr>
            {adminView && <th>Employee</th>}
            <th>From</th>
            <th>To</th>
            <th>Reason</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredLeaves.map((l) => (
            <tr key={l.id}>
              {adminView && <td>{l.employeeName}</td>}
              <td>{l.fromDate}</td>
              <td>{l.toDate}</td>
              <td>{l.reason}</td>
              <td className={`status ${l.status.toLowerCase()}`}>{l.status}</td>
              <td>
                {adminView
                  ? l.status === "Pending" && (
                      <>
                        <button
                          onClick={() => handleUpdate(l, "Approved")}
                          className="approve-btn"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => handleUpdate(l, "Rejected")}
                          className="reject-btn"
                        >
                          Reject
                        </button>
                      </>
                    )
                  : l.status === "Pending" && (
                      <button
                        className="cancel-btn"
                        onClick={() => handleCancel(l)}
                      >
                        Cancel
                      </button>
                    )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
