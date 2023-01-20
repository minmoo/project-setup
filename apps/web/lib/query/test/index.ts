import {
  QueryClient,
  QueryFunctionContext,
  useQuery,
} from "@tanstack/react-query"

const KEY = "test"

const keys = {
  all: [{ scope: KEY }] as const,
  lists: () => [{ ...keys.all[0], entity: "list" }] as const,
  list: (params: string) => [{ ...keys.lists()[0], params }] as const,
}

const fetchTestList = async ({
  queryKey: [{ params }],
}: QueryFunctionContext<ReturnType<(typeof keys)["list"]>>) => {
  await new Promise((resolve) => {
    setTimeout(() => {
      resolve(true)
    }, 3000)
  })
  const response = params
  return response
}

export const useTestList = (params: string) => {
  return useQuery({
    queryKey: keys.list(params),
    queryFn: fetchTestList,
  })
}

export const prefetchTestList = (client: QueryClient, params: string) => {
  return client.prefetchQuery({
    queryKey: keys.list(params),
    queryFn: fetchTestList,
  })
}
