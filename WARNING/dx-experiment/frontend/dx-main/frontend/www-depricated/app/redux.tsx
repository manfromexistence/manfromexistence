"use client"
import * as React from "react"
import { Provider } from "react-redux"
import { store } from "@/hooks/store"

export interface ProvidersProps {
    children: React.ReactNode
}

export function Redux({ children }: ProvidersProps) {
    return (
        <Provider store={store}>
            {children}
        </Provider>
    )
}
