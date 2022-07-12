import { ChakraProvider } from "@chakra-ui/react";
import React from "react";
import LayoutMain from "../components/layout/LayoutMain";

function MyApp({ Component, pageProps }) {
	return (
		<ChakraProvider>
			<LayoutMain>
				<Component {...pageProps} />
			</LayoutMain>
		</ChakraProvider>
	);
}

export default MyApp;
