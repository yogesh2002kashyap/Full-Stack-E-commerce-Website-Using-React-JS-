import { configureStore } from '@reduxjs/toolkit'
import cartReducer from './features/cart/cartSlice'
import BooksApi from './features/books/booksApi'
import ordersApi from './features/orders/ordersApi'

export const store = configureStore({
  reducer: {
    cart : cartReducer,
    [BooksApi.reducerPath]: BooksApi.reducer,
    [ordersApi.reducerPath]: ordersApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(BooksApi.middleware, ordersApi.middleware),
})