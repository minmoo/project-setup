import { AppProps } from "next/app"
import "../globals.css"
import { ChakraProvider } from "@chakra-ui/react"
import { useRef, useState } from "react"
import { AppStoreContext, createAppStore, initializeStore } from "../lib/store"
import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"

export default function MyApp(
  props: AppProps<{ serverInitState?: any; dehydratedState?: any }>,
) {
  const { Component, pageProps } = props
  const { serverInitState } = pageProps

  const [queryClient] = useState(() => new QueryClient())

  return (
    <AppStoreContext.Provider value={initializeStore(serverInitState)}>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <ChakraProvider>
            <Component {...pageProps} />
          </ChakraProvider>
        </Hydrate>
      </QueryClientProvider>
    </AppStoreContext.Provider>
  )
}
