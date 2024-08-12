import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PlayerData } from "../../models/general-info/Player";

interface DraftState {
    formation: string;
    players: PlayerData[]; // Players positioned according to the formation
    substitutes: PlayerData[]; // Substitute players
}

const initialState: DraftState = {
    formation: "4-3-3", // Default formation
    players: new Array(10).fill(null), // Initialize with null for each expected position
    substitutes: [] // Substitute bench
};

const draftSlice = createSlice({
    name: 'draft',
    initialState,
    reducers: {
        setFormation(state, action: PayloadAction<string>) {
            state.formation = action.payload;
            // Handle changes in formation - potentially resetting players or handling differently
        },
        addPlayer(state, action: PayloadAction<{ player: PlayerData, position: number }>) {
            // Add or update a player in a specific position if that position is currently empty or needs updating
            if (state.players.length > action.payload.position) {
                state.players[action.payload.position] = action.payload.player;
            }
        },
        removePlayer(state, action: PayloadAction<number>) {
            // Remove a player from a specific position
            if (state.players.length > action.payload) {
                state.players[action.payload] = null;
            }
        },
        addSubstitute(state, action: PayloadAction<PlayerData>) {
            // Add a player to the substitutes if there is space
            if (state.substitutes.length < 4) { // Assuming max 4 substitutes
                state.substitutes.push(action.payload);
            }
        },
        removeSubstitute(state, action: PayloadAction<number>) {
            // Remove a substitute by index
            state.substitutes = state.substitutes.filter((_, index) => index !== action.payload);
        },
        swapPositions(state, action: PayloadAction<{ from: number, to: number }>) {
            // Swap players between two positions or between a position and substitutes
            const { from, to } = action.payload;
            const temp = state.players[from];
            state.players[from] = state.players[to];
            state.players[to] = temp;
        },
        clearDraft(state) {
            // Clear all players and substitutes
            state.players = new Array(10).fill(null);
            state.substitutes = [];
        }
    }
});

export const {
    setFormation,
    addPlayer,
    removePlayer,
    addSubstitute,
    removeSubstitute,
    swapPositions,
    clearDraft
} = draftSlice.actions;
export default draftSlice.reducer;
