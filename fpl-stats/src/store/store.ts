import { configureStore } from "@reduxjs/toolkit";
import generalInformationReducer from "./slices/dataSlice";
import filterReducer from "./slices/filterSlice";
import compareReducer from "./slices/compareSlice";

export const store = configureStore({
    reducer: {
        generalInformation: generalInformationReducer,
        filters: filterReducer,
        compare: compareReducer
    }
});
// Define RootState and AppDispatch types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;