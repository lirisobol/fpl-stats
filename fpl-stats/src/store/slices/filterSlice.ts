import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FilterState {
    positionType: number;
    searchQuery: string;
}
const initialState:FilterState = {
    positionType: 0,
    searchQuery: ""
};
const filterSlice = createSlice({
    name:'filters',
    initialState,
    reducers: {
        setPositionType(state, action:PayloadAction<number>) {
            state.positionType = action.payload;
        },
        setSearchQuery(state, action:PayloadAction<string>) {
            state.searchQuery = action.payload;
        }
    }
});
export const { setPositionType, setSearchQuery } = filterSlice.actions;
export default filterSlice.reducer;