import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../rootReducer';
import Api from "services/api";

export interface IUserState {
  user: any;
  loader:boolean;
  warehouses:Array<any>;
  error:object
}

export const initUser = {
  user: undefined,
};

export const initialState: IUserState = {
  user: undefined,
  warehouses:[],
  loader:false,
  error:{}
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state: IUserState, { payload }: PayloadAction<any>) => {
      state.user = payload;
    },
    setError: (state: IUserState, { payload }: PayloadAction<any>) => {
      state.error = payload;
    },
    setLoader: (state: IUserState, { payload }: PayloadAction<any>) => {
      state.loader = payload;
    },
    setWarehouse: (state: IUserState, { payload }: PayloadAction<any>) => {
      state.warehouses = payload.data;
    },
  },
});

export const login = (data:Object) => async (dispatch:any) => {
  dispatch(setError({}));
  dispatch(setLoader(true));
  const json = await Api.login(data);
  if(json.status==200){
    dispatch(setUser(json.data));
  } else if(json.status==422) {
    dispatch(setError(json.data));
  }
  dispatch(setLoader(false));
  return json;
};

export const signup = (data:Object) => async (dispatch:any) => {
  dispatch(setError({}));
  dispatch(setLoader(true));
  const json = await Api.signup(data);
  if(json.status==200){
    //dispatch(setUser(json.data));
  } else if(json.status==422) {
    dispatch(setError(json.data));
  }
  dispatch(setLoader(false));
  return json;
};

export const fetchWarehouse = (page:number, data:Object) => async (dispatch:any) => {
  const json = await Api.fetchWarehouse(page, data);
  if(json.status==200){
    dispatch(setWarehouse(json.data));
  }
  return json;
};

export const logout = (data:any) => async (dispatch:any) => {
  dispatch(setUser(data));
};

export const { setUser, setLoader ,setError, setWarehouse  } = userSlice.actions;

export const userSelector = (state: RootState) => state.user;

export default userSlice.reducer;
