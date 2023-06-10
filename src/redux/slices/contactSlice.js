import { createSlice } from "@reduxjs/toolkit"
import { initialState } from "redux/initialState";

export const contactSlice = createSlice({
    name: 'contacts',
    initialState,
    reducers: {
        addContact(state, {payload}){
            if (state.contacts.find(contact => contact.name === payload.name)) {
                return alert(`${payload.name} is already in contacts.`);
            }
            state.contacts.push(payload);
        },
        deleteContact(state, {payload}) {
           
            state.contacts = state.contacts.filter(contact => contact.id !== payload)  
        },
        setContact(state, { payload }) {
            state.contacts.push(payload);
        }
    }


});

export const { setContact, deleteContact, addContact } = contactSlice.actions;
export const contactReducer = contactSlice.reducer; 