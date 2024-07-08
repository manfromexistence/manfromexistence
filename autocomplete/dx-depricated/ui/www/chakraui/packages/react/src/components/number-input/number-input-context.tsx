"use client"

import { createContext } from "../../create-context"
import { SystemStyleObject } from "../../styled-system"
import { UseNumberInputReturn } from "./use-number-input"

export const [NumberInputStylesProvider, useNumberInputStyles] = createContext<
  Record<string, SystemStyleObject>
>({
  name: `NumberInputStylesContext`,
  errorMessage: `useNumberInputStyles returned is 'undefined'. Seems you forgot to wrap the components in "<NumberInput />" `,
})

interface NumberInputContext extends UseNumberInputReturn {}

export const [NumberInputContextProvider, useNumberInputContext] =
  createContext<NumberInputContext>({
    name: "NumberInputContext",
    errorMessage:
      "useNumberInputContext: `context` is undefined. Seems you forgot to wrap number-input's components within <NumberInput />",
  })
