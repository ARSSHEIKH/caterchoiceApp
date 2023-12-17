import { combineReducers } from '@reduxjs/toolkit';

import app from './slices/appSlice';
import user from './slices/userSlice';
import filter from './slices/filterSlice';
import address from './slices/addressSlice';
import category from './slices/categorySlice';
import product from './slices/productSlice';
import banner from './slices/bannerSlice';
import order from './slices/orderSlice';

export type RootState = ReturnType<typeof rootReducer>;

const rootReducer = combineReducers({
  app,
  user,
  filter,
  address,
  category,
  product,
  banner,
  order
});

export default rootReducer;
