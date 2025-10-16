import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/axios";

// Fetch leaves (admin sees all, employee sees own)
export const fetchLeaves = createAsyncThunk(
  "leave/fetchLeaves",
  async () => {
    const res = await api.get("/leaves");

    // Format leaves to include employeeName for admin view
    const formatted = res.data.map((l) => ({
      ...l,
      employeeName: l.User ? l.User.name : "Unknown",
    }));

    return formatted;
  }
);


// Create leave
export const createLeave = createAsyncThunk(
  "leave/createLeave",
  async (data) => {
    const res = await api.post("/leaves", data);
    return res.data;
  }
);

// Update leave (approve/reject)
export const updateLeave = createAsyncThunk(
  "leave/updateLeave",
  async ({ id, updates }) => {
    const res = await api.put(`/leaves/${id}/approve`, updates);
    return res.data;
  }
);

// Delete leave (cancel by employee)
export const deleteLeave = createAsyncThunk("leave/deleteLeave", async (id) => {
  await api.delete(`/leaves/${id}`);
  return id;
});

// Leave slice : for managing leave state
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
      .addCase(updateLeave.fulfilled, (state, action) => {
        const index = state.leaves.findIndex((l) => l.id === action.payload.id);
        if (index !== -1) state.leaves[index] = action.payload;
      })
      .addCase(deleteLeave.fulfilled, (state, action) => {
        state.leaves = state.leaves.filter((l) => l.id !== action.payload);
      });
  },
});

export default leaveSlice.reducer;
