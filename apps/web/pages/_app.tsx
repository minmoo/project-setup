import { AppProps } from "next/app"
import "../globals.css"
import { ChakraProvider } from "@chakra-ui/react"

export default function MyApp(props: AppProps) {
  const { Component, pageProps } = props

  return (
    <ChakraProvider>
      <Component {...pageProps} />
    </ChakraProvider>
  )
}
