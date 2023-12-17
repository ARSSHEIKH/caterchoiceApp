import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../rootReducer';
import Api from "services/api";

export interface ICategoryItemState {
    id: number;
    name:string;
    product_count:number;
    sub:Array<ICategoryItemState>
  }

export interface ICategoryState {
  category: Array<ICategoryItemState>;
  loader:boolean;
  error:object
}

export const initCategory = {
    category: [],
};

export const initialState: ICategoryState = {
    category: [],
    loader:false,
    error:{}
};

export const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    setCategory: (state: ICategoryState, { payload }: PayloadAction<any>) => {
      state.category = payload;
    },
    setError: (state: ICategoryState, { payload }: PayloadAction<any>) => {
      state.error = payload;
    },
    setLoader: (state: ICategoryState, { payload }: PayloadAction<any>) => {
      state.loader = payload;
    },
  },
});

export const fetchCategory = () => async (dispatch:any) => {
  dispatch(setError({}));
  dispatch(setLoader(true));
  const json = await Api.categories();
  if(json.status==200){
    dispatch(setCategory(json.data));
  } else if(json.status==422) {
    dispatch(setError(json.data));
  }
  dispatch(setLoader(false));
  return json;
};

export const { setCategory, setLoader ,setError  } = categorySlice.actions;

export const categorySelector = (state: RootState) => state.category;

export default categorySlice.reducer;
