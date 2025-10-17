import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/axios";

// Fetch leaves (admin sees all, employee sees own)
export const fetchLeaves = createAsyncThunk("leave/fetchLeaves", async () => {
  const res = await api.get("/leaves");

  // Format leaves to include employeeName for admin view
  return res.data.map((l) => ({
    ...l,
    employeeName: l.User ? l.User.name : "Unknown",
  }));
});

// Create leave
export const createLeave = createAsyncThunk(
  "leave/createLeave",
  async (data) => {
    const res = await api.post("/leaves", data);
    return res.data;
  }
);

// Employee edit leave (only pending)
export const editLeave = createAsyncThunk(
  "leave/editLeave",
  async ({ id, updates }) => {
    const res = await api.put(`/leaves/${id}`, updates);
    return res.data;
  }
);

// Admin approve/reject leave
export const approveRejectLeave = createAsyncThunk(
  "leave/approveRejectLeave",
  async ({ id, status }) => {
    const res = await api.put(`/leaves/${id}/approve`, { status });
    return res.data;
  }
);

// Delete leave (cancel by employee)
export const deleteLeave = createAsyncThunk("leave/deleteLeave", async (id) => {
  await api.delete(`/leaves/${id}`);
  return id;
});

const leaveSlice = createSlice({
  name: "leave",
  initialState: { leaves: [], loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLeaves.fulfilled, (state, action) => {
        state.leaves = action.payload;
      })
      .addCase(createLeave.fulfilled, (state, action) => {
        state.leaves.push(action.payload);
      })
      .addCase(editLeave.fulfilled, (state, action) => {
        const index = state.leaves.findIndex((l) => l.id === action.payload.id);
        if (index !== -1) state.leaves[index] = action.payload;
      })
      .addCase(approveRejectLeave.fulfilled, (state, action) => {
        const index = state.leaves.findIndex((l) => l.id === action.payload.id);
        if (index !== -1) state.leaves[index] = action.payload;
      })
      .addCase(deleteLeave.fulfilled, (state, action) => {
        state.leaves = state.leaves.filter((l) => l.id !== action.payload);
      })
      .addMatcher(
        (action) => action.type.endsWith("/rejected"),
        (state, action) => {
          state.error = action.payload || "Something went wrong";
        }
      );
  },
});

export default leaveSlice.reducer;
