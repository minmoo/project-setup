import { AppProps } from "next/app"
import "../globals.css"
import { ChakraProvider } from "@chakra-ui/react"
import { useState } from "react"
import { AppStoreContext, initializeStore } from "../lib/store"
import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"

if (process.env.NEXT_PUBLIC_API_MOCKING === "enabled") {
  require("../mocks")
}

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
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </AppStoreContext.Provider>
  )
}
