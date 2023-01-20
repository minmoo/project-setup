import {
  QueryClient,
  QueryFunctionContext,
  useQuery,
} from "@tanstack/react-query"
import axios from "axios"
import { mswUrl } from "../../../mocks/utils"
const KEY = "test"

const keys = {
  all: [{ scope: KEY }] as const,
  lists: () => [{ ...keys.all[0], entity: "list" }] as const,
  list: (params: string) => [{ ...keys.lists()[0], params }] as const,
}

export interface TestListResponse {
  name: string
}

const fetchTestList = async ({
  queryKey: [{ params }],
}: QueryFunctionContext<ReturnType<(typeof keys)["list"]>>) => {
  const response = await axios.get<TestListResponse>(
    mswUrl`/api/testList/${params}`,
  )
  return response.data
}

export const useTestList = (params: string) => {
  return useQuery({
    queryKey: keys.list(params),
    queryFn: fetchTestList,
    staleTime: 1 * 1000,
  })
}

export const prefetchTestList = (client: QueryClient, params: string) => {
  return client.prefetchQuery({
    queryKey: keys.list(params),
    queryFn: fetchTestList,
    staleTime: 10 * 1000,
  })
}
