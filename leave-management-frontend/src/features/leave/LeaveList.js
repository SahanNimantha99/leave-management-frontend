import { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import { fetchLeaves, deleteLeave, editLeave } from "./leaveSlice";
import { toast } from "react-toastify";
import "./Leave.css";

export default function LeaveList() {
  const dispatch = useDispatch();
  const { leaves } = useSelector((state) => state.leave);
  const [editingLeave, setEditingLeave] = useState(null);
  const [editData, setEditData] = useState({
    fromDate: "",
    toDate: "",
    reason: "",
  });

  useEffect(() => {
    dispatch(fetchLeaves());
  }, [dispatch]);

  const handleCancel = async (leave) => {
    if (leave.status !== "Pending")
      return toast.error("Cannot cancel non-pending leave");
    try {
      await dispatch(deleteLeave(leave.id)).unwrap();
      toast.success("Leave canceled");
    } catch {
      toast.error("Failed to cancel leave");
    }
  };

  const handleEdit = (leave) => {
    setEditingLeave(leave.id);
    setEditData({
      fromDate: leave.fromDate,
      toDate: leave.toDate,
      reason: leave.reason,
    });
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    if (!editData.fromDate || !editData.toDate || !editData.reason)
      return toast.error("All fields are required");
    if (new Date(editData.toDate) < new Date(editData.fromDate))
      return toast.error("To date cannot be before from date");

    try {
      await dispatch(
        editLeave({ id: editingLeave, updates: editData })
      ).unwrap();
      toast.success("Leave updated successfully");
      setEditingLeave(null);
      dispatch(fetchLeaves());
    } catch (err) {
      toast.error(
        err?.message || err?.data?.message || "Failed to update leave"
      );
    }
  };

  const handleEditCancel = () => setEditingLeave(null);

  return (
    <div>
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
              <td>
                {editingLeave === l.id ? (
                  <input
                    type="date"
                    value={editData.fromDate}
                    onChange={(e) =>
                      setEditData({ ...editData, fromDate: e.target.value })
                    }
                  />
                ) : (
                  l.fromDate
                )}
              </td>
              <td>
                {editingLeave === l.id ? (
                  <input
                    type="date"
                    value={editData.toDate}
                    onChange={(e) =>
                      setEditData({ ...editData, toDate: e.target.value })
                    }
                  />
                ) : (
                  l.toDate
                )}
              </td>
              <td>
                {editingLeave === l.id ? (
                  <input
                    type="text"
                    value={editData.reason}
                    onChange={(e) =>
                      setEditData({ ...editData, reason: e.target.value })
                    }
                  />
                ) : (
                  l.reason
                )}
              </td>
              <td className={`status ${l.status.toLowerCase()}`}>{l.status}</td>
              <td>
                {editingLeave === l.id ? (
                  <>
                    <button className="approve-btn" onClick={handleEditSubmit}>
                      Save
                    </button>
                    <button className="cancel-btn" onClick={handleEditCancel}>
                      Cancel
                    </button>
                  </>
                ) : (
                  l.status === "Pending" && (
                    <>
                      <button
                        className="cancel-btn"
                        onClick={() => handleCancel(l)}
                      >
                        Cancel
                      </button>
                      <button
                        className="approve-btn"
                        onClick={() => handleEdit(l)}
                      >
                        Edit
                      </button>
                    </>
                  )
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
