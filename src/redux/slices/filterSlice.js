import { createSlice } from "@reduxjs/toolkit"
import { initialState } from "redux/initialState"

export const filterSlice = createSlice({
    name: 'filter',
    initialState,

    reducers :{
        setFilter(state, {payload}){
            state.filter = payload;
        }
    }

})

export const {setFilter} = filterSlice.actions;
export const filterReducer = filterSlice.reducer;