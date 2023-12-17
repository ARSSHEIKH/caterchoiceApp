import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../rootReducer';
import Api from "services/api";

export interface IProductItemState {
    id: number;
    name:string;
    code:string;
    ms_id:string;
    type:string;
    brand_id:number;
    pack_size:string;
    cost:number;
    price:number;
    qty:number;
    image:string;
  }

export interface IProductState {
   data: Array<IProductItemState>;
   cart:Array<any>,
   slots:Array<any>,
   total:number;
   is_more:boolean;
   loader:boolean;
   error:object;
   extra:object;
}

export const initialState: IProductState = {
    data: [],
    cart:[],
    slots:[],
    extra:{},
    total:0,
    is_more:false,
    loader:false,
    error:{}
};

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    orderSubmit: (state: IProductState, { payload }: PayloadAction<any>) => {
        state.cart = [];
        state.slots = [];
        state.extra = {};
    },
    setSlot: (state: IProductState, { payload }: PayloadAction<any>) => {
        state.slots = payload;
    },
    setOrder: (state: IProductState, { payload }: PayloadAction<any>) => {
        state.data = payload.data;
        state.total = payload.total;
        state.is_more = payload.is_more;
    },
    setMoreOrder: (state: IProductState, { payload }: PayloadAction<any>) => {
        state.data = state.data.concat(payload.data);
        state.total = payload.total;
        state.is_more = payload.is_more;
    },
    addCart: (state: IProductState, { payload }: PayloadAction<any>) => {
        
        let cart = [...state.cart];
        
        const index = cart.findIndex(i=>i.id==payload.id);
        if(index>-1){
        
            cart[index] = {
                ...cart[index],
                quantity:cart[index].quantity+1
            } 
        } else {
            cart.push({...payload,quantity:1});
        }        

        state.cart = cart;
    },
    decreament: (state: IProductState, { payload }: PayloadAction<any>) => {
        
        let cart = [...state.cart];
        
        const index = cart.findIndex(i=>i.id==payload.id);
        if(index>-1){
            if(cart[index].quantity>1){
                cart[index] = {
                    ...cart[index],
                    quantity:cart[index].quantity-1
                } 
            } else {
                cart.splice(index,1); 
            }
            
        } else {
            cart.push({...payload,quantity:1});
        }        

        state.cart = cart;
    },
    removeCart: (state: IProductState, { payload }: PayloadAction<any>) => {
        let cart = [...state.cart];
        
        const index = cart.findIndex(i=>i.id==payload.id);
        if(index>-1){
        
            cart.splice(index,1); 
        }       

        state.cart = cart;
    },
    setError: (state: IProductState, { payload }: PayloadAction<any>) => {
      state.error = payload;
    },
    setLoader: (state: IProductState, { payload }: PayloadAction<any>) => {
      state.loader = payload;
    },
    setExtra: (state: IProductState, { payload }: PayloadAction<any>) => {
        state.extra = payload;
      },
  },
});

export const fetchOrder = (page:number, params:object) => async (dispatch:any) => {
    dispatch(setError({}));
    dispatch(setLoader(true));
    const json = await Api.order(page, params);
    if(json.status==200){
      if(page>1){
          dispatch(setMoreOrder(json.data));
      } else {
          dispatch(setOrder(json.data));
      }
      
    } else if(json.status==422) {
      dispatch(setError(json.data));
    }
    dispatch(setLoader(false));
    return json;
};

export const fetchAvailableSlots = (params:object) => async (dispatch:any) => {
    const json = await Api.slots(params);
    if(json.status==200){
        dispatch(setSlot(json.data));
    }
    return json;
};

export const submitOrder = (query:object) => async (dispatch:any) => {
    dispatch(setError({}));
    dispatch(setLoader(true));
    const json = await Api.submitOrder(query);
    if(json.status==200){
        dispatch(orderSubmit(json.data));
    } else if(json.status==400) {
        dispatch(setError(json.data));
    }
    dispatch(setLoader(false));
    return json;
};


export const { addCart, removeCart, decreament, setLoader ,setError, setMoreOrder, setOrder, setExtra, setSlot, orderSubmit  } = orderSlice.actions;

export const orderSelector = (state: RootState) => state.order;

export default orderSlice.reducer;
