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
      state.firstname = action.payload.firstname;
      state.lastname = action.payload.lastname;
      state.email = action.payload.email;
      state.role = action.payload.role;
    },

    logout: (state) => {
      state.islogin=false
      state.id = ""
      state.firstname=""
      state.lastname=""
       state.email = "";
       state.role = "";
    },
  },
});


export default loginSlice.reducer;
export const { login,logout } = loginSlice.actions;
