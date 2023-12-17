import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../rootReducer';

import { AddressFragment } from 'constants/types';

export interface IAddressState {
  address: AddressFragment;
}

export const initialState: IAddressState = {
  address: {
    name_address: 'My Home',
    address: 'Shop 03&04, TTTM BigC, 222 Đ. Trần Duy Hưng, Trung Hoà, Cầu Giấy, Hà Nội 11313',
    phone_number: '024 6658 2992',
    is_default: true,
  },
};

export const addressSlice = createSlice({
  name: 'address',
  initialState,
  reducers: {
    setAddress: (state: IAddressState, { payload }: PayloadAction<AddressFragment>) => {
      state.address = payload;
    },
  },
});

export const { setAddress } = addressSlice.actions;

export const addressSelector = (state: RootState) => state.address;

export default addressSlice.reducer;
