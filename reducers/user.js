import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: { token: null, username: null, id:null, firstname:null, avatar:null },
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signUp: (state, action) => {
      console.log(('action.payload SIGNUP : ',action.payload))
      state.value.token = action.payload.token;
      state.value.username = action.payload.username;
      state.value.id = action.payload._id;
      state.value.firstname = action.payload.firstname;
      state.value.avatar = action.payload.avatar;


    },
    signIn: (state, action) => {
      console.log(('action.payload SIGNIN : ',action.payload));
      state.value.token = action.payload.token;
      state.value.username = action.payload.username;
      state.value.id = action.payload._id;
      state.value.avatar = action.payload.avatar;
    },
    logout: (state) => {
      state.value = {}
    },
  },
});

export const { signUp, signIn, logout } = userSlice.actions;
export default userSlice.reducer;
