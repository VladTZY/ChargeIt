import React from 'react'
import NextLink from 'next/link'

import { ChevronDownIcon } from '@chakra-ui/icons'

import { 
    Text, 
    Button, 
    HStack, 
    Menu, 
    MenuButton, 
    MenuList, 
    MenuItem, 
    Box
} from '@chakra-ui/react'

export const Navbar = () => {
  return (
    <HStack backgroundColor="blue.400">
        <Text>ChargeIt</Text>
        
        <Box display={{base: "none", md: "flex"}}>
            <NextLink href="/">
                    <Button href="/">Home</Button>
            </NextLink>

            <Menu>
                <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>Stations</MenuButton>
                
                <MenuList>
                    <MenuItem>
                        <NextLink href="/stations">All stations</NextLink>
                    </MenuItem>

                    <MenuItem>
                        <NextLink href="/stations/add">Add stations</NextLink>
                    </MenuItem>
                </MenuList>
            </Menu>
        </Box>

        <Box display={{base: "flex", md: "none"}}>
            <Menu>
                <MenuButton as={Button}>V</MenuButton>

                <MenuList>
                    <MenuItem>
                        <NextLink href="/">Home</NextLink>
                    </MenuItem>

                    <MenuItem>
                            <NextLink href="/stations">All stations</NextLink>
                    </MenuItem>

                    <MenuItem>
                        <NextLink href="/stations/add">Add stations</NextLink>
                    </MenuItem>
                </MenuList>
            </Menu>
        </Box>

    </HStack>
  )
}

export default Navbar;