import { configureStore } from "@reduxjs/toolkit"

import devModeReducer from "./devModeSlice"

export function makeStore() {
  return configureStore({
    reducer: {
      devMode: devModeReducer,
    },
  })
}

export const store = makeStore()
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
