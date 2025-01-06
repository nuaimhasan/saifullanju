import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loggedUser: undefined,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    userLoggedIn: (state, action) => {
      state.loggedUser = action.payload.data;
    },
    userLogout: (state) => {
      state.loggedUser = undefined;
      localStorage.removeItem("token");
    },
  },
});

export const { userLoggedIn, userLogout } = userSlice.actions;
export default userSlice.reducer;
