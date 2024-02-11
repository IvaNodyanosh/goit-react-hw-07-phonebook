import { configureStore } from '@reduxjs/toolkit';

import { setupListeners } from '@reduxjs/toolkit/query';

import { contactsApi } from './contacts/contactsApi';

import { filterReducer } from './filter/filterSlice';

const store = configureStore({
  reducer: {
    filter: filterReducer,
    [contactsApi.reducerPath]: contactsApi.reducer,
  },

  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(contactsApi.middleware),
});


setupListeners(store.dispatch);

export default store;
