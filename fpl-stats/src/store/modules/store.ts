import { configureStore } from "@reduxjs/toolkit";
import generalInformationReducer from "./general-information/slice";

export const store = configureStore({
    reducer: {
        generalInformation: generalInformationReducer,
    },
});