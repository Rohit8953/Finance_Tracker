import { createSlice } from '@reduxjs/toolkit'

const userSlice = createSlice({
  name: 'userdetails',
  initialState: {
    userDetail:[],
    islogin: true,
    token:null,
  },
  reducers: {
    getUserDetails:(state,actions)=>{
        
    },
    SetisLogin:(state)=>{
      state.islogin=!state.islogin;
    },
    Settoken:(state,actions)=>{
       state.token=actions.payload;
    }
  }
})

export const { getUserDetails,SetisLogin, Settoken} = userSlice.actions;
export default userSlice.reducer;
