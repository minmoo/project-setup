import { Button } from "ui"
import tw, { styled, css } from "twin.macro"

const Wrap = styled.div<{ size: number }>(({ size = 10 }) => [
  size === 10 ? tw`text-red-600` : tw`text-blue-500`,
  css`
    font-size: ${size}px;
  `,
])

const Container = tw.h1`
  font-bold
`

export default function Web() {
  return (
    <div>
      <h1 className="overflow-ellipsis px-5 font-bold">Web</h1>
      <Container>Hello world!</Container>
      <Wrap size={10}>Emotion + Twin</Wrap>
      <Wrap size={50}>Emotion + Twin</Wrap>
      <Button />
    </div>
  )
}
