import { configureStore } from "@reduxjs/toolkit";
import cartSlice from './createSlice';




const store = configureStore({
    reducer: {
        application: cartSlice,
    }
})

export default store;