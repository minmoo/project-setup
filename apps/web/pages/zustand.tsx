import { createAppStore, useAppContext } from "../lib/store"

export default function Zustand() {
  const state = useAppContext((state) => state)
  return <h1>{state.count}</h1>
}

export function getServerSideProps() {
  const zustandStore = createAppStore()
  zustandStore.getState().addCount()
  zustandStore.getState().addCount()
  zustandStore.getState().addCount()
  zustandStore.getState().addCount()
  return {
    props: {
      // the "stringify and then parse again" piece is required as next.js
      // isn't able to serialize it to JSON properly
      serverInitState: JSON.parse(JSON.stringify(zustandStore.getState())),
    },
  }
}
