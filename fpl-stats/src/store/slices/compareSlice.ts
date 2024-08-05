import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PlayerData } from "../../models/general-info/Player";

interface CompareState {
    selectedPlayers: PlayerData[];
}

const initialState: CompareState = {
    selectedPlayers: []
};

const compareSlice = createSlice({
    name: 'compare',
    initialState,
    reducers: {
        addPlayerToCompare(state, action: PayloadAction<PlayerData>) {
            if(state.selectedPlayers.length < 3) {
                state.selectedPlayers.push(action.payload);
            }
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
