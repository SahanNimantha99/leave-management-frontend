import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchLeaves, deleteLeave } from "./leaveSlice";
import { toast } from "react-toastify";

export default function LeaveList() {
  // Redux dispatch and state
  const dispatch = useDispatch();
  const { leaves } = useSelector((state) => state.leave);

  // Fetch leaves on mount
  useEffect(() => {
    dispatch(fetchLeaves());
  }, [dispatch]);

  // Handle cancel for employee
  const handleCancel = (leave) => {
    if (leave.status !== "Pending") {
      return toast.error("Cannot cancel non-pending leave");
    }
    dispatch(deleteLeave(leave.id));
    toast.success("Leave canceled");
  };

  return (
    <table className="leave-table">
      <thead>
        <tr>
          <th>From</th>
          <th>To</th>
          <th>Reason</th>
          <th>Status</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {leaves.map((l) => (
          <tr key={l.id}>
            <td>{l.fromDate}</td>
            <td>{l.toDate}</td>
            <td>{l.reason}</td>
            <td className={`status ${l.status.toLowerCase()}`}>{l.status}</td>
            <td>
              {l.status === "Pending" && (
                <button className="cancel-btn" onClick={() => handleCancel(l)}>
                  Cancel
                </button>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
