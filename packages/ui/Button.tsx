import * as React from "react"
import { Badge } from "@chakra-ui/react"

export const Button = () => (
  <button className="rounded-full bg-blue-500">Boop</button>
)

export const CustomBadge = () => {
  return <Badge colorScheme="green">Success</Badge>
}
