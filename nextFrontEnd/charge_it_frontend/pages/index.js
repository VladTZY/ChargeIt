import { Container, Text, Button, VStack } from "@chakra-ui/react";
import NextLink from "next/link";
import dynamic from "next/dynamic";

export default function Home({ ssrStations }) {
	const Map = dynamic(() => import("../components/Map"), { ssr: false });

	return (
		<Container maxW="100%">
			<Text align="center" fontSize="5xl">
				Welcome
			</Text>
			<NextLink href={"/stations"}>
				<Button colorScheme="blue">See all stations</Button>
			</NextLink>
			<Map ssrStations={ssrStations} />
		</Container>
	);
}

export async function getServerSideProps() {
	const res = await fetch("http://localhost:8090/api/stations");
	const data = await res.json();

	return {
		props: {
			ssrStations: data,
		},
	};
}
