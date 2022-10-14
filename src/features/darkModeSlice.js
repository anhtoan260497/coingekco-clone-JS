import { createSlice } from "@reduxjs/toolkit";

const calculateIsDay = () => {
    const date =  new Date()
    const hours =  date.getHours()
    if(hours >= 6 && hours < 18) return true
    return false
} //if day return true, else false

const initialState = {
  isDay : calculateIsDay()
};


const darkModeSlice = createSlice({
  name: "darkmode",
  initialState,
  reducers: {
    setDarkMode : (state, action) => {
        state.isDay =  action.payload
    }
  },
});

const { reducer, actions } = darkModeSlice;
export const {setDarkMode} = actions
export default reducer;
