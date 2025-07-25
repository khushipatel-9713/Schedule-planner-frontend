import { createSlice } from '@reduxjs/toolkit'

const loginSlice = createSlice({
    name : "login-Slice",

    initialState : {
        token : null,
        Login : false,
    },

    reducers : {
       setUser :(state,action)=>{
        state.token = action.payload.token;
        state.Login = action.payload.flag;
       }
    }
})

export const {setUser} = loginSlice.actions;
export default loginSlice.reducer;