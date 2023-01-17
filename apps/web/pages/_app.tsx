import { AppProps } from "next/app"
import "../globals.css"

export default function MyApp(props: AppProps) {
  const { Component, pageProps } = props

  return <Component {...pageProps} />
}
