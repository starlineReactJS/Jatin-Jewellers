import { createSlice } from "@reduxjs/toolkit";
import { prjName } from "../Config";

export const dataSlice = createSlice({
    name: prjName,
    initialState: {
        clientDetails: [],
        referanceDetails: [],
        popup: {},
    },
    reducers: {
        setClientData: (state, action) => {
            return { ...state, clientDetails: action.payload };
        },
        setReferanceData: (state, action) => {
            return { ...state, referanceDetails: action.payload };
        },
        setPopup: (state, action) => {
            return { ...state, popup: action.payload };
        },
    }
});
export const { setClientData, setReferanceData, setPopup } = dataSlice.actions;
export default dataSlice.reducer;