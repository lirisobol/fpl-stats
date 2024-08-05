import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { dataFetcher } from "../../services/DataFetcher";
import { GeneralInformation } from "../../models/general-info/GeneralInformation";


interface GeneralInformationState {
    data: GeneralInformation | null;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}
export const fetchGeneralInformation = createAsyncThunk<
    GeneralInformation,
    void,
    {rejectValue: string}
    >(
    'generalInformation/fetchGeneralInformation',
    async (_, {rejectWithValue}) => {
        try {
            const response = await dataFetcher.getGeneralInformation();
            return response;
        }
        catch (error) {
            return rejectWithValue('Failed to fetch general information')
        }
    }
)
// Define initial state with types
const initialState: GeneralInformationState = {
    data: null,
    status: 'idle',
    error: null,
};
const generalInformationSlice = createSlice({
    name:'generalInformation',
    initialState,
    reducers: {},
    extraReducers:(builder) => {
        builder
            .addCase(fetchGeneralInformation.pending, (state) => {state.status = 'loading'})
            .addCase(fetchGeneralInformation.fulfilled, (state,action) => {
                state.status = 'succeeded';
                state.data = action.payload;
            })
            .addCase(fetchGeneralInformation.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload as string;
            })
    }
})
export default generalInformationSlice.reducer;