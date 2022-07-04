import { Flex, Text, Button, VStack } from "@chakra-ui/react"
import NextLink from 'next/link'

export default function Home() {
  return (
    <VStack>
      <Text align="center" fontSize="5xl">Welcome</Text>
      <NextLink href={'/stations'}>
        <Button colorScheme="blue">See all stations</Button>  
      </NextLink>  
    </VStack>
  )
}
