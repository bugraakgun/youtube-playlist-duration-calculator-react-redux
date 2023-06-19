import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value:localStorage.getItem('theme') ? localStorage.getItem('theme') : 'system'
}
export const themeSlice = createSlice({
    name:'theme',
    initialState,
    reducers:{
        setTheme:(state,action)=>{
            state.value = action.payload;
            localStorage.setItem('theme',action.payload);
        }
    }
})
export const {setTheme} = themeSlice.actions;
export default themeSlice.reducer