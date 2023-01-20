import { useTestList } from "../../lib/query/test"

export default function Ssr() {
  const { data, isLoading } = useTestList("csr")

  if (isLoading) return <div>Loading...</div>

  return <h1>{data}</h1>
}
