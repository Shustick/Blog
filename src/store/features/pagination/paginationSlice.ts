import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface PaginationState {
  currentPage: number;
  pageSize: number;
}

const initialState: PaginationState = {
  currentPage: 1,
  pageSize: 5,
};

const paginationSlice = createSlice({
  name: 'pagination',
  initialState,
  reducers: {
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
    setPageSize(state, action: PayloadAction<number>) {
      state.pageSize = action.payload;
    },
  },
});

export const { setCurrentPage, setPageSize } = paginationSlice.actions;
export default paginationSlice.reducer;
