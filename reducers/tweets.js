import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: [],
};

export const tweetsSlice = createSlice({
  name: "tweets",
  initialState,
  reducers: {
    fetchAllTweets: (state, action) => {
      state.value = [...action.payload];
    },
    addTweet: (state, action) => {
      state.value.push(action.payload);
    },
    likeTweet: (state, action) => {
      for (let tweet of state.value) {
        if (tweet._id == action.payload.tweetId) {
          tweet.likesNumber = action.payload.numberOfLikes;
        }
      }
      // state.value = state.value.filter(
      //   (bookmark) => bookmark.title !== action.payload.title
      // );
    },
    removeTweet: (state, action) => {
      state.value = state.value.filter(
        (tweet) => tweet._id != action.payload.tweetId
      );
    },
  },
});

export const { addTweet, removeTweet, likeTweet, fetchAllTweets } =
  tweetsSlice.actions;
export default tweetsSlice.reducer;
