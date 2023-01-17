import { Button, CustomBadge } from "ui"
import tw, { styled, css } from "twin.macro"
import {
  Badge,
  Stack,
  chakra,
  shouldForwardProp,
  Box,
  Icon,
  HStack,
} from "@chakra-ui/react"
import { isValidMotionProp, motion } from "framer-motion"
import { MdSettings, MdReceipt, MdGroupWork } from "react-icons/md"

const variant = {
  hover: {
    scale: 1.2,
    transition: {
      duration: 0.5,
      yoyo: Infinity,
    },
  },
}

const ChakraBox = chakra(motion.div, {
  shouldForwardProp: (prop) =>
    isValidMotionProp(prop) || shouldForwardProp(prop),
})

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
      <CustomBadge />
      <h1 className="overflow-ellipsis px-5 font-bold">Web</h1>
      <Container>Hello world!</Container>
      <Stack direction="row">
        <Badge>Default</Badge>
        <Badge colorScheme="green">Success</Badge>
        <Badge colorScheme="red">Removed</Badge>
        <Badge colorScheme="purple">New</Badge>
      </Stack>
      <Box
        as={motion.div}
        height="40px"
        width="40px"
        bg="orange.400"
        drag="x"
        dragConstraints={{ left: -100, right: 100 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        transition="0.5s linear"
        // not work: transition={{ transition: "0.5", ease: "linear" }}
      />
      <ChakraBox
        animate={{
          scale: [1, 2, 2, 1, 1],
          rotate: [0, 0, 270, 270, 0],
          borderRadius: ["20%", "20%", "50%", "50%", "20%"],
        }}
        // @ts-ignore no problem in operation, although type error appears.
        transition={{
          duration: 3,
          ease: "easeInOut",
          repeat: Infinity,
          repeatType: "loop",
        }}
        padding="2"
        bgGradient="linear(to-l, #7928CA, #FF0080)"
        display="flex"
        justifyContent="center"
        alignItems="center"
        width="100px"
        height="100px"
      >
        I'm Dizzy!
      </ChakraBox>

      <HStack>
        {/* The default icon size is 1em (16px) */}
        <Icon as={MdSettings} />

        {/* Use the `boxSize` prop to change the icon size */}
        <Icon as={MdReceipt} boxSize={6} />

        {/* Use the `color` prop to change the icon color */}
        <Icon as={MdGroupWork} w={8} h={8} color="red.500" />
      </HStack>
      <Wrap size={10}>Emotion + Twin</Wrap>
      <Wrap size={50}>Emotion + Twin</Wrap>
      <Button />
    </div>
  )
}
