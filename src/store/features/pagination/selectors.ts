import type { RootState } from '../../store';

export const selectPageSize = (state: RootState) => state.pagination.pageSize;
export const selectCurrentPage = (state: RootState) => state.pagination.currentPage;
