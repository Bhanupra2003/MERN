import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import RentalSlice from './Component/Slice/Rental';
import CustomerSlice from './Component/Slice/Customer';
import admin from './Component/Slice/Admin';

const rootReducer = combineReducers({
  Rental: RentalSlice,
  Customer: CustomerSlice,
  Admin: admin,
});

const store = configureStore({
  reducer: rootReducer,
  // You can safely omit the middleware line as it's already added by default in Redux Toolkit.
  // If you need to add any middleware (like redux-thunk), you can use this:
  // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});

export default store;
