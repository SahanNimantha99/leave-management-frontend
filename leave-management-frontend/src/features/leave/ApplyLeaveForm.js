import { useState } from "react";

import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";

import { createLeave } from "./leaveSlice";
import "./Leave.css";

export default function ApplyLeaveForm() {
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [reason, setReason] = useState("");
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!fromDate || !toDate || !reason) {
      return toast.error("All fields required");
    }
    if (new Date(toDate) < new Date(fromDate)) {
      return toast.error("To date cannot be before from date");
    }

    try {
      const resultAction = await dispatch(
        createLeave({
          fromDate,
          toDate,
          reason,
          status: "Pending",
          userId: user.id,
        })
      );

      if (createLeave.rejected.match(resultAction)) {
        if (resultAction.payload?.status === 409) {
          toast.error(resultAction.payload.message);
        } else {
          toast.error(resultAction.payload?.message || "Failed to apply leave");
        }
        return;
      }

      setFromDate("");
      setToDate("");
      setReason("");
      toast.success("Leave applied successfully");
    } catch (err) {
      console.error(err);
      toast.error("Server error while applying leave");
    }
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