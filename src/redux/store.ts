import { configureStore } from '@reduxjs/toolkit';
import typingReducer from './typingSlice';

const store = configureStore({
    reducer: {
        typing: typingReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;