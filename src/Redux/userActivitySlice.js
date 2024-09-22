import { createSlice } from '@reduxjs/toolkit'
import { datas, indexing, salarydata} from '../Data/data'

const userActivity = createSlice({
  name: 'useractivity',
  initialState: {
    selectedmonth:'September',
    userAllmonthData: datas,
    savingdata: salarydata,
    userData:[],
    totalexpenses:0,
    refresher: true,
    updatepopup: false,
    dataforUpdate:null,
    exchangeRate:1,
    darkMode: true
  },
  
  reducers: {
    Setmonth:(state,actions)=>{
        state.selectedmonth=actions.payload;
    }, 
    setexpenses:(state,actions)=>{
      //set totol expenses
        state.totalexpenses=actions.payload;
    },
    setuserData:(state,actions)=>{
      //setuser monthaly data
        state.userData=actions.payload;
    },
    deleteTransaction:(state,actions)=>{
      state.userData=state.userData.filter((items,id)=>actions.payload.id!==items.id)
      state.userAllmonthData[indexing[state.selectedmonth]][state.selectedmonth]=state.userData;
      console.log("please delete this trancaction from redux store")
    },
    addnewTransaction:(state,actions)=>{
       state.userAllmonthData[indexing[state.selectedmonth]][state.selectedmonth].push(actions.payload);
       state.userData=state.userAllmonthData[indexing[state.selectedmonth]][state.selectedmonth];
    },
    setRefresher:(state)=>{
        state.refresher=!state.refresher;
    },
    SetuserAllmonthData:(state,actions)=>{
       state.userAllmonthData=actions.payload;
    },
    setpopup:(state)=>{
      state.updatepopup=!state.updatepopup;
    },
    setdataforUpdate:(state, actions)=>{
          state.dataforUpdate=actions.payload;
    },
    addsalarydata:(state,actions)=>{
      state.savingdata=actions.payload;
    },
    setExchangeRate:(state,actions)=>{
      state.exchangeRate=actions.payload;
    },
    setDarkMode:(state)=>{
      state.darkMode=!state.darkMode;
    },
    updateData:(state,actions)=>{
     state.userAllmonthData[indexing[state.selectedmonth]][state.selectedmonth][actions.payload.id-1]=actions.payload;
    }
  }
})

export const {
  Setmonth,
  setexpenses,
  setRefresher,
  setuserData,
  deleteTransaction,
  addnewTransaction,
  SetuserAllmonthData,
  setpopup,
  setdataforUpdate,
  addsalarydata,
  setExchangeRate,
  setDarkMode,
  updateData
} = userActivity.actions;

export const userActivityReducer = userActivity.reducer;
