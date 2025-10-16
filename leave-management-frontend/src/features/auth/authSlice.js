import { createSlice } from "@reduxjs/toolkit";

// Initialize state from localStorage if available
const token = localStorage.getItem("token");
const user = localStorage.getItem("user");

// Initial state
const initialState = {
  user: user ? JSON.parse(user) : null,
  token: token || null,
};

// Auth slice with reducers for login, logout, and setting user/token
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
    setToken: (state, action) => {
      state.token = action.payload;
      localStorage.setItem("token", action.payload);
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },
  },
});

export const { setUser, setToken, logout } = authSlice.actions;
export default authSlice.reducer;
