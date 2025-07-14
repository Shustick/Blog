import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { editArticleAPI, type EditArticleAPIProps } from './editArticleApi';

interface editArticleState {
  isLoading: boolean;
  error: string | null;
}

const initialState: editArticleState = {
  isLoading: false,
  error: null,
};

export const editArticle = createAsyncThunk<EditArticleAPIProps, EditArticleAPIProps>(
  'editeArticle/editArticle',
  async (props: EditArticleAPIProps) => {
    return editArticleAPI(props);
  }
);

const editArticleSlice = createSlice({
  name: 'editArticle',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(editArticle.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(editArticle.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(editArticle.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message ?? 'Edit Article Error';
      });
  },
});

export default editArticleSlice.reducer;
