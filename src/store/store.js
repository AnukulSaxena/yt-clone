import { configureStore } from "@reduxjs/toolkit";

import authSlice from "./authSlice.js";
import homeSlice from "./homeSlice.js";
export const store = configureStore({
    reducer: {
        auth: authSlice,
        home: homeSlice,
    },
});