import { createSlice } from "@reduxjs/toolkit"

export type LoginState = {
  loggedIn: boolean;
}
const initialState: LoginState = {
  loggedIn: false
}

let loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    logIn: () => {},
    logOut: () => {}
  }
})

export default loginSlice.reducer
export const { logIn, logOut } = loginSlice.actions;
