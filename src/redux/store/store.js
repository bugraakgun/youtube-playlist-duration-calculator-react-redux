import { configureStore } from '@reduxjs/toolkit'
import themeReducer from '../slice/themeSlice'

export const store = configureStore({
  reducer: {
    theme:themeReducer
  }
})