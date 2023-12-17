import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../rootReducer';
import Api from "services/api";

export interface IBannerItemState {
    id: number;
    title:string;
    description:string;
    image:string;
  }

export interface IBannerState {
  data: Array<IBannerItemState>;
  loader:boolean;
  error:object
}

export const initialState: IBannerState = {
    data: [],
    loader:false,
    error:{}
};

export const categorySlice = createSlice({
  name: 'banner',
  initialState,
  reducers: {
    setBanner: (state: IBannerState, { payload }: PayloadAction<any>) => {
      state.data = payload;
    },
    setError: (state: IBannerState, { payload }: PayloadAction<any>) => {
      state.error = payload;
    },
    setLoader: (state: IBannerState, { payload }: PayloadAction<any>) => {
      state.loader = payload;
    },
  },
});

export const fetchBanner = () => async (dispatch:any) => {
  dispatch(setError({}));
  dispatch(setLoader(true));
  const json = await Api.banner();
  if(json.status==200){
    dispatch(setBanner(json.data));
  } else if(json.status==422) {
    dispatch(setError(json.data));
  }
  dispatch(setLoader(false));
  return json;
};

export const { setBanner, setLoader ,setError  } = categorySlice.actions;

export const bannerSelector = (state: RootState) => state.banner;

export default categorySlice.reducer;
