import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { deleteArticleAPI } from './deleteArticleApi';

interface createArticleState {
  isLoading: boolean;
  error: string | null;
}

const initialState: createArticleState = {
  isLoading: false,
  error: null,
};

export const deleteArticle = createAsyncThunk<string, string>('deleteArticle/deleteArticle', async (slug) => {
  return deleteArticleAPI(slug);
});

const deleteArticleSlice = createSlice({
  name: 'deleteArticle',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(deleteArticle.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteArticle.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(deleteArticle.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message ?? 'Ошибка регистрации';
      });
  },
});

export default deleteArticleSlice.reducer;
