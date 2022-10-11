import { configureStore } from "@reduxjs/toolkit";
import coinSlice from 'features/coinSlice'
import darkModeSlice from 'features/darkModeSlice'

const rootReducer = {
    coinSlice,
    darkModeSlice,
}

const store =  configureStore({
    reducer : rootReducer,
})

export default store
