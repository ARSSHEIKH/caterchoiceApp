import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../rootReducer';
import Api from "services/api";

export interface IProductItemState {
  product?: IProductItemState;
  id: number;
  name: string;
  code: string;
  ms_id: string;
  type: string;
  brand_id: number;
  pack_size: string;
  cost: number;
  price: number;
  qty: number;
  image: string;
  is_wishlist: boolean | 0 | 1;
  slug: string
}

export interface IProductState {
  data: Array<IProductItemState>;
  featured: object;
  total: number;
  is_more: boolean;
  loader: boolean;
  error: object
  promotions: Array<IProductItemState>;
  // search: Array<IProductItemState>;
}

export const initialState: IProductState = {
  data: [],
  featured: {},
  total: 0,
  is_more: false,
  loader: false,
  error: {},

};

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    setProduct: (state: IProductState, { payload }: PayloadAction<any>) => {
      state.data = payload?.data ?? payload;
      state.total = payload?.total;
      state.is_more = payload?.is_more;
    },
    setFeatured: (state: IProductState, { payload }: PayloadAction<any>) => {
      return (state = {
        ...state,
        featured: {
          ...state.featured,
          [payload.name]: payload.data
        }
      });
    },
    setMoreProduct: (state: IProductState, { payload }: PayloadAction<any>) => {
      state.data = state.data.concat(payload.data);
      state.total = payload.total;
      state.is_more = payload.is_more;
    },
    setError: (state: IProductState, { payload }: PayloadAction<any>) => {
      state.error = payload;
    },
    setLoader: (state: IProductState, { payload }: PayloadAction<any>) => {
      state.loader = payload;
    },
    setFavourite: (state: IProductState, { payload }: PayloadAction<any>) => {
      const todo = state.data.find((item) => item.slug === payload);
      console.log('====================================');
      console.log("todo", todo);
      console.log('====================================');
      if (todo) {
        todo.is_wishlist = !todo.is_wishlist;
      }
    },
  },
});

export const fetchProduct = (page: number, params: object, search: boolean) => async (dispatch: any) => {
  dispatch(setError({}));
  dispatch(setLoader(true));
  const json = await Api.product(page, params);
  if (json.status == 200) {
    if (search) {
      dispatch(setProduct(json.data?.data));
    }
    else {
      if (page > 1) {
        dispatch(setMoreProduct(json.data));
      } else {
        dispatch(setProduct(json.data));
      }
    }
  } else if (json.status == 422) {
    dispatch(setError(json.data));
  }
  dispatch(setLoader(false));
  return json;
};


export const searchByAutocomplete = (query:string) => async (dispatch: any) => {
  dispatch(setError({}));
  dispatch(setLoader(true));
  const json = await Api.autoCompleteProducts({query});
  if (json?.status == 200) {
    
      return json
    
  }
  dispatch(setLoader(false));
  return json;
};

export const searchProduct = (search: string, page:number) => async (dispatch: any) => {
  dispatch(setError({}));
  dispatch(setLoader(true));
  const json = await Api.searchProduct({page, search});
  if (json.status == 200) {
   
    if (page > 1) {
      dispatch(setMoreProduct(json.data));
    } else {
      dispatch(setProduct(json.data));
    }

  } else if (json.status == 422) {
    dispatch(setError(json.data));
  }
  dispatch(setLoader(false));
  return json;
};

export const fetchFeatured = (page: number, name: string, params: object) => async (dispatch: any) => {
  const json = await Api.product(page, params);
  if (json.status == 200) {
    dispatch(setFeatured({ data: json.data.data, name: name }));
  }
  return json;
};

export const fetchPromotions = (page: number, token: string) => async (dispatch: any) => {
  dispatch(setError({}));
  dispatch(setLoader(true));
  const json = await Api.productPromotions(page, token);
  if (json.status == 200) {
    if (page > 1) {
      dispatch(setMoreProduct(json.data?.data));
    } else {
      dispatch(setProduct(json.data?.data));
    }

  } else if (json.status == 422) {
    dispatch(setError(json.data?.error
    ));
  }
  dispatch(setLoader(false));
  return json;
};

export const { setProduct, setMoreProduct, setLoader, setError, setFeatured, setFavourite, } = productSlice.actions;

export const productSelector = (state: RootState) => state.product;

export default productSlice.reducer;
