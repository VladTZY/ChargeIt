import { Box, Container } from "@chakra-ui/react";
import React from "react";
import Navbar from "../Navbar";

const LayoutMain = ({ children }) => {
	return (
		<Box>
			<Navbar />

			<Container maxW="100%" pt={14}>
				{children}
			</Container>
		</Box>
	);
};

export default LayoutMain;
