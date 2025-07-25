import { configureStore } from '@reduxjs/toolkit';
import loginSlice from "./LoginSlice";

const store = configureStore({
 reducer :
 {
  LoginToken : loginSlice
 }
});

export default store;