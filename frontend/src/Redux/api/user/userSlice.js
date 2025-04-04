import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loggedUser: undefined,
  token: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    userLoggedIn: (state, action) => {
      state.loggedUser = action.payload.user;
      state.token = action.payload.token;
    },
    userLogout: (state) => {
      state.loggedUser = undefined;
      state.token = undefined;
    },
  },
});

export const { userLoggedIn, userLogout } = userSlice.actions;
export default userSlice.reducer;
