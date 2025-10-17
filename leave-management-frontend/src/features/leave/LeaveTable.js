import { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import { fetchLeaves, deleteLeave, approveRejectLeave } from "./leaveSlice";
import { toast } from "react-toastify";
import "./Leave.css";

export default function LeaveTable({ adminView }) {
  const dispatch = useDispatch();
  const { leaves } = useSelector((state) => state.leave);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    dispatch(fetchLeaves());
  }, [dispatch]);

  const handleCancel = async (leave) => {
    try {
      await dispatch(deleteLeave(leave.id)).unwrap();
      toast.success("Leave canceled");
    } catch {
      toast.error("Failed to cancel leave");
    }
  };

  const handleUpdate = async (leave, status) => {
    try {
      await dispatch(approveRejectLeave({ id: leave.id, status })).unwrap();
      toast.success(`Leave ${status}`);
      dispatch(fetchLeaves());
    } catch (err) {
      toast.error(err?.message || "Failed to update leave");
    }
  };

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
                        <button onClick={() => handleUpdate(l, "Approved")} className="approve-btn">
                          Approve
                        </button>
                        <button onClick={() => handleUpdate(l, "Rejected")} className="reject-btn">
                          Reject
                        </button>
                      </>
                    )
                  : l.status === "Pending" && (
                      <button className="cancel-btn" onClick={() => handleCancel(l)}>
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
