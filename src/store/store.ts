import { configureStore } from '@reduxjs/toolkit';

import articlesReducer from './features/articles/articlesSlice';
import paginationReducer from './features/pagination/paginationSlice';

export const store = configureStore({
  reducer: {
    articles: articlesReducer,
    pagination: paginationReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
