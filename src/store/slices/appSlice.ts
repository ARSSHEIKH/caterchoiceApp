import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../rootReducer';

export interface IAppState {
  appLoading: boolean;
}

export const initialState: IAppState = {
  appLoading: false,
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setAppLoading: (state: IAppState, { payload }: PayloadAction<boolean>) => {
      state.appLoading = payload;
    },
  },
});

export const { setAppLoading } = appSlice.actions;

export const appSelector = (state: RootState) => state.app;

export default appSlice.reducer;
