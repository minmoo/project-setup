import { rest } from "msw"
import { TestListResponse } from "../lib/query/test"
import { mswUrl } from "./utils"

export const handlers = [
  rest.get<TestListResponse, { msg: string }>(
    mswUrl`/api/testList/:msg`,
    (req, res, ctx) => {
      const { msg } = req.params
      return res(ctx.status(200), ctx.json({ name: `msw: ${msg}` }))
    },
  ),
]
