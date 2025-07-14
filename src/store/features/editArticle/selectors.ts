import type { RootState } from '../../store';

export const selectEditArticleIsLoading = (state: RootState) => state.editAricle.isLoading;
export const selectEditArticleIsError = (state: RootState) => state.editAricle.error;
