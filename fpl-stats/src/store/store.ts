import { configureStore } from "@reduxjs/toolkit";
import generalInformationReducer from "./slice";
export const store = configureStore({
    reducer: {
        generalInformation: generalInformationReducer
    }
});
// Define RootState and AppDispatch types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;