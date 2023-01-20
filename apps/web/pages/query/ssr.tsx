import { dehydrate, QueryClient } from "@tanstack/react-query"
import { prefetchTestList, useTestList } from "../../lib/query/test"

export default function Ssr() {
  const { data, isLoading } = useTestList("ssr")

  if (isLoading) return <div>Loading...</div>

  return <h1>{data}</h1>
}

export async function getServerSideProps() {
  const queryClient = new QueryClient()

  await prefetchTestList(queryClient, "ssr")

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  }
}
