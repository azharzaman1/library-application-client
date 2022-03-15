import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    currentUser: null,
    persistSession:
      JSON.parse(localStorage.getItem("library-application-session-persist")) ||
      false,
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
  },
});

export const { SET_USER, LOGOUT, SET_SESSION_PERSIST } = userSlice.actions;

export const selectUser = (state) => state.userStore.currentUser;
export const selectSessionPersist = (state) => state.userStore.persistSession;

export default userSlice.reducer;
