import { createSlice } from "@reduxjs/toolkit"
import { initialState } from "redux/initialState";

export const contactSlice = createSlice({
    name: 'contacts',
    initialState,
    reducers: {
        addContact(state, {payload}){
            
            state.contacts.push(payload);
        },
        deleteContact(state, {payload}) {
           
            state.contacts = state.contacts.filter(contact => contact.id !== payload)  
        },
        
    }


});

export const { setContact, deleteContact, addContact } = contactSlice.actions;
export const contactReducer = contactSlice.reducer; 