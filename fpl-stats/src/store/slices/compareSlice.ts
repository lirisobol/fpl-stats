import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Player {
    id: number;
}

interface CompareState {
    selectedPlayers: Player[];
}

const initialState: CompareState = {
    selectedPlayers: []
};

const compareSlice = createSlice({
    name: 'compare',
    initialState,
    reducers: {
        addPlayerToCompare(state, action: PayloadAction<Player>) {
            state.selectedPlayers.push(action.payload);
        },
        removePlayerFromCompare(state,action: PayloadAction<number>) {
            state.selectedPlayers = state.selectedPlayers.filter(player => player.id !== action.payload);
        },
        clearAllPlayersFromCompare(state) {
            state.selectedPlayers = [];
        }
    }
});

export const { addPlayerToCompare, removePlayerFromCompare, clearAllPlayersFromCompare } = compareSlice.actions;
export default compareSlice.reducer;
