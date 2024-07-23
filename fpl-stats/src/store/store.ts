import { configureStore } from "@reduxjs/toolkit";
import generalInformationReducer from "./slices/dataSlice";
import filterReducer from "./slices/filterSlice";

export const store = configureStore({
    reducer: {
        generalInformation: generalInformationReducer,
        filters: filterReducer
    }
});
// Define RootState and AppDispatch types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;