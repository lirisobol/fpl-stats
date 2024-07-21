// features/generalInformation/generalInformationSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { dataFetcher } from '../../../services/DataFetcher';

export const fetchGeneralInformation = createAsyncThunk(
    'generalInformation/fetchGeneralInformation',
    async () => {
        const response = await dataFetcher.getGeneralInformation();
        return response;
    }
);

const generalInformationSlice = createSlice({
    name: 'generalInformation',
    initialState: {
        data: null,
        status: 'idle',
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchGeneralInformation.pending, (state) => {
            state.status = 'loading';
        })
        .addCase(fetchGeneralInformation.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.data = action.payload;
        })
        .addCase(fetchGeneralInformation.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message;
        });
    },
});
export default generalInformationSlice.reducer;
