import { Container, Text, Button, VStack } from "@chakra-ui/react";
import MapsGoogle from "../components/MapsGoogle";
import NextLink from "next/link";

export default function Home({ ssrStations }) {
	return (
		<Container maxW="100%">
			<Text pt={4} align="center" fontSize="5xl">
				Welcome
			</Text>
			<NextLink href={"/stations"}>
				<Button colorScheme="blue">See all stations</Button>
			</NextLink>
			<MapsGoogle ssrStations={ssrStations} />
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
