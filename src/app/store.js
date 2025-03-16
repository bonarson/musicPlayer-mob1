import { configureStore } from "@reduxjs/toolkit";
import queueReducer from "../features/queue/queueSlice";

export const store = configureStore({
    reducer: {
        queue: queueReducer,
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});
