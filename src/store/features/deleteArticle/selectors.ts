import type { RootState } from '../../store';

export const selectDeleteArticleIsLoading = (state: RootState) => state.deleteArticle.isLoading;
export const selectDeleteArticleIsError = (state: RootState) => state.deleteArticle.error;
