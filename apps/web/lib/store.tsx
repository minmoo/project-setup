import { create, createStore, useStore } from "zustand"
import React, { createContext, useContext, useRef } from "react"
import { immer } from "zustand/middleware/immer"
import { devtools } from "zustand/middleware"

interface AppStateProps {
  count: number
}

interface AppState extends AppStateProps {
  addCount: () => void
}

type AppStore = ReturnType<typeof createAppStore>
const DEFAULT_PROPS: AppStateProps = {
  count: 0,
}

let store: AppStore

export const createAppStore = (initProps?: Partial<AppStateProps>) =>
  createStore<AppState>()(
    devtools(
      immer((set, get) => ({
        ...DEFAULT_PROPS,
        ...initProps,
        addCount: () =>
          set((state) => {
            state.count = get().count + 1
          }),
      })),
      {
        enabled:
          typeof window !== "undefined" &&
          process.env.NODE_ENV !== "production",
      },
    ),
  )

export function initializeStore(serverInitState?: Partial<AppStateProps>) {
  // SSG and SSR always use a new store.
  if (typeof window === "undefined") {
    return createAppStore(serverInitState)
  }

  //CSR
  store = store ?? createAppStore(serverInitState)

  if (serverInitState && store) {
    store.setState(
      {
        // re-use existing store
        ...store.getState(),
        // reset all server properties
        ...serverInitState,
      },
      true, // replace states, rather than shallow merging
    )
  }

  return store
}

//Provider
export const AppStoreContext = createContext<AppStore | null>(null)

//Custom Hook
export function useAppContext<T>(
  selector: (state: AppState) => T,
  equalityFn?: (left: T, right: T) => boolean,
): T {
  const store = useContext(AppStoreContext)
  if (!store) throw new Error("Missing AppContext.Provider in thre tree")
  return useStore(store, selector, equalityFn)
}
