import { createSlice } from "@reduxjs/toolkit";

export const appSlice = createSlice({
  name: "app",
  initialState: { loading: false },
  reducers: {
    SET_LOADING: (state, action) => {
      return {
        ...state,
        loading: action.payload,
      };
    },
  },
});

export const { SET_LOADING } = appSlice.actions;

export const selectLoading = (state) => state.appStore.loading;

export default appSlice.reducer;
