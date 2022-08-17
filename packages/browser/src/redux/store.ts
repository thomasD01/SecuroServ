import { configureStore } from '@reduxjs/toolkit'

import combinedReducers from './reducers'

export default function makeStore(){
  let store = configureStore({
    reducer: combinedReducers,
    middleware: (getDefaultMiddleware) => 
      getDefaultMiddleware().concat()
    ,
    enhancers: []
  });

  return store;
}