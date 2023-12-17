import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../rootReducer';

export interface IFilterState {
  priceFilter: number[];
  ratingFilter: number;
  colorFilter: string;
  tagsFilter: string[];
}

export const initialState: IFilterState = {
  priceFilter: [10, 1000],
  ratingFilter: 0,
  colorFilter: '#B5E4CA',
  tagsFilter: [],
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setPriceFilter: (state: IFilterState, { payload }: PayloadAction<number[]>) => {
      state.priceFilter = payload;
    },
    setRatingFilter: (state: IFilterState, { payload }: PayloadAction<number>) => {
      state.ratingFilter = payload;
    },
    setColorFilter: (state: IFilterState, { payload }: PayloadAction<string>) => {
      state.colorFilter = payload;
    },
    setTagsFilter: (state: IFilterState, { payload }: PayloadAction<string[]>) => {
      state.tagsFilter = payload;
    },
  },
});

export const { setPriceFilter, setRatingFilter, setColorFilter, setTagsFilter } =
  filterSlice.actions;

export const filterSelector = (state: RootState) => state.filter;

export default filterSlice.reducer;
