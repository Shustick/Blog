import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { createArticleAPI, type ArticleData } from './createArticleApi';

interface createArticleState {
  isLoading: boolean;
  error: string | null;
}

const initialState: createArticleState = {
  isLoading: false,
  error: null,
};

export const createArticle = createAsyncThunk<ArticleData, ArticleData>(
  'createArticle/createArticle',
  async (articleData) => {
    return createArticleAPI(articleData);
  }
);

const createArticleSlice = createSlice({
  name: 'createArticle',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createArticle.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createArticle.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(createArticle.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message ?? 'Create Article Error';
      });
  },
});

export default createArticleSlice.reducer;
