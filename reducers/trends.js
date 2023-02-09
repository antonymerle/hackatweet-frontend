import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: [],
};

export const trendsSlice = createSlice({
  name: "trends",
  initialState,
  reducers: {
    addTrend: (state, action) => {
      state.value.push(action.payload);
    },
    removeTrend: (state, action) => {
      state.value = state.value.filter(
        (bookmark) => bookmark.title !== action.payload.title
      );
    },
  },
});

export const { addTrend, removeTrend } = trendsSlice.actions;
export default trendsSlice.reducer;
