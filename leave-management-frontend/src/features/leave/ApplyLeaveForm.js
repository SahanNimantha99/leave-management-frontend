import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createLeave } from "./leaveSlice";
import { toast } from "react-toastify";

export default function ApplyLeaveForm() {
  // Form state
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [reason, setReason] = useState("");
  // Redux dispatch
  const dispatch = useDispatch();
  // Get user from auth state
  const { user } = useSelector((state) => state.auth);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!fromDate || !toDate || !reason)
      return toast.error("All fields required");
    if (new Date(toDate) < new Date(fromDate))
      return toast.error("To date cannot be before from date");

    dispatch(
      createLeave({
        fromDate,
        toDate,
        reason,
        status: "Pending",
        userId: user.id,
      })
    );

    setFromDate("");
    setToDate("");
    setReason("");
    toast.success("Leave applied");
  };

  return (
    <form className="apply-leave-form" onSubmit={handleSubmit}>
      <h3>Apply for Leave</h3>
      <input
        type="date"
        value={fromDate}
        onChange={(e) => setFromDate(e.target.value)}
        required
      />
      <input
        type="date"
        value={toDate}
        onChange={(e) => setToDate(e.target.value)}
        required
      />
      <textarea
        value={reason}
        onChange={(e) => setReason(e.target.value)}
        placeholder="Reason for leave"
        required
      />
      <button type="submit">Submit</button>
    </form>
  );
}
