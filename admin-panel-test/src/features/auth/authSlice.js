import { createSlice } from "@reduxjs/toolkit";

const userFromSession = sessionStorage.getItem("user")
  ? JSON.parse(sessionStorage.getItem("user"))
  : null;

const initialState = {
  user: userFromSession,
  isAuthenticated: !!userFromSession, // user varsa true
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      sessionStorage.removeItem("user"); // logout olduğunda sessionStorage da temizlenir
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
