import { AppProps } from "next/app"
import "../globals.css"
import { ChakraProvider } from "@chakra-ui/react"
import { useRef } from "react"
import { AppStoreContext, createAppStore, initializeStore } from "../lib/store"

export default function MyApp(props: AppProps<{ serverInitState?: any }>) {
  const { Component, pageProps } = props
  const { serverInitState } = pageProps

  return (
    <AppStoreContext.Provider value={initializeStore(serverInitState)}>
      <ChakraProvider>
        <Component {...pageProps} />
      </ChakraProvider>
    </AppStoreContext.Provider>
  )
}
