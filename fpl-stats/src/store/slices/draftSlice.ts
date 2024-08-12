import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PlayerData } from "../../models/general-info/Player";

interface DraftState {
    formation: string;
    players: PlayerData[]; // Players positioned according to the formation
    substitutes: PlayerData[]; // Substitute players
    filters: {
        positionType: number;
        teamCode: number;
        searchQuery: string;
        columnGroup: string;
    }
}

const initialState: DraftState = {
    formation: '4-3-3', // Default formation
    players: new Array(11).fill(null),
    substitutes: [], // Substitute bench
    filters: {
        positionType: 0,
        teamCode: 0,
        searchQuery: "",
        columnGroup: "all"
    }
};

const draftSlice = createSlice({
    name: 'draft',
    initialState,
    reducers: {
        setDraftFormation(state, action: PayloadAction<string>) {
            state.formation = action.payload;
        },
        addDraftPlayer(state, action: PayloadAction<{ player: PlayerData, position: number }>) {
            // Ensure the position is within the valid range
            if (action.payload.position >= 0 && action.payload.position < state.players.length) {
                state.players[action.payload.position] = action.payload.player;
                console.log('added player:', action.payload.player);
                
            }
        },
        removeDraftPlayer(state, action: PayloadAction<number>) {
            // Check if the position is within the array bounds
            if (action.payload >= 0 && action.payload < state.players.length) {
                state.players[action.payload] = null; // Set the player at this position to null
            }
        },
        addDraftSubstitute(state, action: PayloadAction<PlayerData>) {
            // Add a player to the substitutes if there is space
            if (state.substitutes.length < 4) { // Assuming max 4 substitutes
                state.substitutes.push(action.payload);
            }
        },
        removeDraftSubstitute(state, action: PayloadAction<number>) {
            // Remove a substitute by index
            state.substitutes = state.substitutes.filter((_, index) => index !== action.payload);
        },
        swapDraftPositions(state, action: PayloadAction<{ from: number, to: number }>) {
            // Swap players between two positions or between a position and substitutes
            const { from, to } = action.payload;
            const temp = state.players[from];
            state.players[from] = state.players[to];
            state.players[to] = temp;
        },
        clearDraft(state) {
            // Clear all players and substitutes
            state.players = new Array(11).fill(null);
            state.substitutes = [];
        },
        // Filters
        setDraftPositionType(state, action:PayloadAction<number>) {
            state.filters.positionType = action.payload;
        },
        setDraftTeam(state, action:PayloadAction<number>) {
            state.filters.teamCode = action.payload;
        },
        setDraftSearchQuery(state, action:PayloadAction<string>) {
            state.filters.searchQuery = action.payload;
        },
        setDraftColumnGroup(state, action:PayloadAction<string>) {
            state.filters.columnGroup = action.payload;
        }
    }
});

export const {
    setDraftFormation,
    addDraftPlayer,
    removeDraftPlayer,
    addDraftSubstitute,
    removeDraftSubstitute,
    swapDraftPositions,
    clearDraft,
    setDraftPositionType,
    setDraftTeam,
    setDraftSearchQuery,
    setDraftColumnGroup
} = draftSlice.actions;
export default draftSlice.reducer;
