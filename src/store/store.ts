import { configureStore } from '@reduxjs/toolkit';

import articlesReducer from './features/articles/articlesSlice';
import authReducer from './features/auth/authSlice';
import createArticleReducer from './features/createArticle/createArticleSlice';
import deleteArticleReducer from './features/deleteArticle/deleteArticleSlice';
import editArticleReducer from './features/editArticle/editArticleSlice';
import paginationReducer from './features/pagination/paginationSlice';

export const store = configureStore({
  reducer: {
    articles: articlesReducer,
    auth: authReducer,
    pagination: paginationReducer,
    createArticle: createArticleReducer,
    deleteArticle: deleteArticleReducer,
    editAricle: editArticleReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
