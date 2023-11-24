import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  email: "",
  role: "",
};

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    login: (state, action) => {
      state.islogin=action.payload.islogin
      state.id=action.payload._id
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.role = action.payload.role;
    },

    logout: (state) => {
      state.islogin=false
      state.id=""
       state.name = "";
       state.email = "";
       state.role = "";
    },
  },
});


export default loginSlice.reducer;
export const { login,logout } = loginSlice.actions;
