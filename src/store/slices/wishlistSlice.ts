import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../rootReducer';
import Api from "services/api";

export interface IWishlistItemState {
  id: number;
  name: string;
  product_count: number;
  sub: Array<IWishlistItemState>
}

export interface IWishlistState {
  wishlist: Array<IWishlistItemState>;
  loader: boolean;
  error: object
}

export const initWishlist = {
  wishlist: [],
};

export const initialState: IWishlistState = {
  wishlist: [],
  loader: false,
  error: {}
};

export const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    setWishlist: (state: IWishlistState, { payload }: PayloadAction<any>) => {
      state.wishlist = payload;
    },
    addFavourite: (state: IWishlistState, { payload }: PayloadAction<any>) => {
      state.wishlist = payload;
    },
    setError: (state: IWishlistState, { payload }: PayloadAction<any>) => {
      state.error = payload;
    },
    setLoader: (state: IWishlistState, { payload }: PayloadAction<any>) => {
      state.loader = payload;
    },
  },
});

export const fetchWishlist = (token:string,page:number, params:object) => async (dispatch:any) => {
  dispatch(setError({}));
  dispatch(setLoader(true));
  const json = await Api.wishlist(token, page, params);
  if(json.status==200){

    let products = []
    json.data?.wishlist?.map((p)=>{
      products.push(p)
    });
    if(page>1){
      dispatch(setWishlist(products));
    } else {
      dispatch(setWishlist(products));
    }
    
  } else if(json.status==422) {
    dispatch(setError(json.data));
  }
  dispatch(setLoader(false));
  return json;
};

export const setWishItems = (token:string, slug:string) => async (dispatch:any) => {
  const json = await Api.setWishItem(token, slug);
  
  if(json.status==200){
    return json?.data
    // dispatch(addWishli)
    // dispatch(addFavourite({data:json.data.data, name:name}));
  }
  return json;
};

// addFavourite
export const { setWishlist, setLoader, setError } = wishlistSlice.actions;

export const wishlistSelector = (state: RootState) => state.wishlist;

export default wishlistSlice.reducer;