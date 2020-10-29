import { configureStore } from '@reduxjs/toolkit'
import { basketReducer } from './basketSlice'
import { changeRatioReducer } from './changeRatioSlice'
import { wareReducer } from './wareSlice'

const store = configureStore({
    reducer: {
        ware: wareReducer,
        basket: basketReducer,
        changeRatio: changeRatioReducer,
    },
    devTools: process.env.NODE_ENV !== 'production',
})

export default store
