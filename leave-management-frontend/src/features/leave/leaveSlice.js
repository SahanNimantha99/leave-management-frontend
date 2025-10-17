import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import api from "../../api/axios";

export const fetchLeaves = createAsyncThunk("leave/fetchLeaves", async () => {
  const res = await api.get("/leaves");

  return res.data.map((l) => ({
    ...l,
    employeeName: l.User ? l.User.name : "Unknown",
  }));
});

export const createLeave = createAsyncThunk(
  "leave/createLeave",
  async (data) => {
    const res = await api.post("/leaves", data);
    return res.data;
  }
);

export const editLeave = createAsyncThunk(
  "leave/editLeave",
  async ({ id, updates }) => {
    const res = await api.put(`/leaves/${id}`, updates);
    return res.data;
  }
);

export const approveRejectLeave = createAsyncThunk(
  "leave/approveRejectLeave",
  async ({ id, status }) => {
    const res = await api.put(`/leaves/${id}/approve`, { status });
    return res.data;
  }
);

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
