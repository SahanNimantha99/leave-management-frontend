import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import leaveReducer from "../features/leave/leaveSlice";

// Configure the Redux store with authentication and leave management slices
export const store = configureStore({
  reducer: {
    auth: authReducer,
    leave: leaveReducer,
  },
});
