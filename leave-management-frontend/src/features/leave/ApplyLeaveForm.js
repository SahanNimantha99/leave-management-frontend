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
  const { leaves } = useSelector((state) => state.leave);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!fromDate || !toDate || !reason) {
      return toast.error("All fields required");
    }
    if (new Date(toDate) < new Date(fromDate)) {
      return toast.error("To date cannot be before from date");
    }

    const existingApprovedLeaves = leaves.filter(
      (l) => l.userId === user.id && l.status === "Approved"
    );

    const isConflict = existingApprovedLeaves.some(
      (l) =>
        new Date(fromDate) <= new Date(l.toDate) &&
        new Date(toDate) >= new Date(l.fromDate)
    );

    if (isConflict) {
      return toast.error(
        "Leave request conflicts with an existing approved leave"
      );
    }

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
    toast.success("Leave applied successfully");
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
