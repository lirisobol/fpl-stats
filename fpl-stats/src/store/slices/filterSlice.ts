import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FilterState {
    selectedType: number;
    searchQuery: string;
}
const initialState:FilterState = {
    selectedType: 0,
    searchQuery: ""
};
const filterSlice = createSlice({
    name:'filters',
    initialState,
    reducers: {
        setSelectedType(state, action:PayloadAction<number>) {
            state.selectedType = action.payload;
        },
        setSearchQuery(state, action:PayloadAction<string>) {
            state.searchQuery = action.payload;
        }
    }
});
export const { setSelectedType, setSearchQuery } = filterSlice.actions;

export default filterSlice.reducer;