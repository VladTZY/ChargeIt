import React from "react";
import NextLink from "next/link";

import { ChevronDownIcon, HamburgerIcon } from "@chakra-ui/icons";

import {
	Text,
	Button,
	Container,
	Menu,
	MenuButton,
	MenuList,
	MenuItem,
	Box,
	Flex,
} from "@chakra-ui/react";

export const Navbar = () => {
	return (
		<Box zIndex={2} w="100%" position="fixed" backgroundColor="blue.400">
			<Container
				display="flex"
				p={2}
				maxW="100%"
				wrap="wrap"
				align="center"
				justify="space-between"
			>
				<Flex align="center" mr={2}>
					<Text pl={2} fontSize="32px">
						ChargeIt
					</Text>
				</Flex>

				<Box x flex={1} align="right">
					<Box display={{ base: "none", md: "inline-block" }}>
						<NextLink href="/">
							<Button colorScheme="blue" mr={2} href="/">
								Home
							</Button>
						</NextLink>

						<Menu>
							<MenuButton
								colorScheme="blue"
								as={Button}
								rightIcon={<ChevronDownIcon />}
							>
								Stations
							</MenuButton>

							<MenuList>
								<MenuItem>
									<NextLink href="/stations">
										All stations
									</NextLink>
								</MenuItem>

								<MenuItem>
									<NextLink href="/stations/add">
										Add stations
									</NextLink>
								</MenuItem>
							</MenuList>
						</Menu>
					</Box>
				</Box>

				<Box display={{ base: "flex", md: "none" }}>
					<Menu>
						<MenuButton colorScheme="blue" as={Button}>
							<HamburgerIcon />
						</MenuButton>

						<MenuList>
							<MenuItem>
								<NextLink href="/">Home</NextLink>
							</MenuItem>

							<MenuItem>
								<NextLink href="/stations">
									All stations
								</NextLink>
							</MenuItem>

							<MenuItem>
								<NextLink href="/stations/add">
									Add stations
								</NextLink>
							</MenuItem>
						</MenuList>
					</Menu>
				</Box>
			</Container>
		</Box>
	);
};

export default Navbar;
