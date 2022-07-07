import { createSlice } from "@reduxjs/toolkit";
import { userRoles } from "../../static/userRoles";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    currentUser: null,
    persistSession:
      JSON.parse(localStorage.getItem("library-application-session-persist")) ||
      false,
    userType: "",
  },
  reducers: {
    SET_USER: (state, action) => {
      return {
        ...state,
        currentUser: action.payload,
      };
    },
    LOGOUT: (state, action) => {
      return {
        ...state,
        currentUser: null,
      };
    },
    SET_SESSION_PERSIST: (state, action) => {
      return {
        ...state,
        persistSession: action.payload,
      };
    },
    SET_USER_TYPE: (state, action) => {
      return {
        ...state,
        userType: action?.payload?.includes(userRoles.Admin)
          ? "Admin"
          : action?.payload?.includes(userRoles.Student)
          ? "Student"
          : action?.payload?.includes(userRoles.User) &&
            !action?.payload?.includes(userRoles.Admin) &&
            !action?.payload?.includes(userRoles.Student)
          ? "User"
          : "",
      };
    },
  },
});

export const { SET_USER, SET_USER_TYPE, LOGOUT, SET_SESSION_PERSIST } =
  userSlice.actions;

export const selectUser = (state) => state.userStore.currentUser;
export const selectSessionPersist = (state) => state.userStore.persistSession;
export const selectUserType = (state) => state.userStore.userType;

export default userSlice.reducer;
