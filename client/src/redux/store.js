import {configureStore } from '@reduxjs/toolkit';
import reducer from './slice'

const store = configureStore({
    reducer: {
        app: reducer
    }
})

export default store;