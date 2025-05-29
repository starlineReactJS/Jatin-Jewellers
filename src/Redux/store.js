import { configureStore } from "@reduxjs/toolkit";
import dataReducer from './reducers';

export const store = configureStore({
    reducer: dataReducer
});