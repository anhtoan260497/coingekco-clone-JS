import { configureStore } from "@reduxjs/toolkit";
import coinSlice from 'features/coinSlice'

const rootReducer = {
    coinSlice,
}

const store =  configureStore({
    reducer : rootReducer,
})

export default store
