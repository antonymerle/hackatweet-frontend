import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: [],
};

export const tweetsSlice = createSlice({
  name: "tweets",
  initialState,
  reducers: {
    addTweet: (state, action) => {
      state.value.push(action.payload);
    },
    deleteTweet: (state, action) => {
      state.value = state.value.filter(
        (bookmark) => bookmark.title !== action.payload.title
      );
    },
    likeTweet: (state, action) => {
      state.value = state.value.filter(
        (bookmark) => bookmark.title !== action.payload.title
      );
    },
    removeAllBookmark: (state) => {
      state.value = [];
    },
  },
});

export const { addTweet, deleteTweet, likeTweet } = tweetsSlice.actions;
export default tweetsSlice.reducer;
