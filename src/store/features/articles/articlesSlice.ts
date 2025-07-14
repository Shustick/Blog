import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { fetchArticlesAPI } from './articlesApi';
import type { IArticle, IArticlesResponse } from './articlesType';

interface ArticlesState {
  articles: IArticle[];
  isLoading: boolean;
  error: string | null;
  articlesCount: number;
}

const initialState: ArticlesState = {
  articles: [],
  isLoading: false,
  error: null,
  articlesCount: 0,
};

export const fetchArticles = createAsyncThunk<IArticlesResponse, { pageSize: number; currentPage: number }>(
  'articles/fetchArticles',
  async ({ pageSize, currentPage }) => {
    const response = await fetchArticlesAPI({ pageSize, currentPage });
    return response;
  }
);

const articlesSlice = createSlice({
  name: 'articles',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchArticles.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchArticles.fulfilled, (state, action) => {
        state.isLoading = false;
        state.articles = action.payload.articles;
        if (state.articlesCount !== action.payload.articlesCount) {
          state.articlesCount = action.payload.articlesCount;
        }
      })
      .addCase(fetchArticles.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Load Error';
      });
  },
});

export default articlesSlice.reducer;
