import { Container, Text, Button, VStack } from "@chakra-ui/react";
import MapsGoogle from "../components/MapsGoogle";
import NextLink from "next/link";

export default function Home({ ssrStations }) {
	//const routeUrl = `https://maps.googleapis.com/maps/api/directions/json?origin=Disneyland&destination=Universal+Studios+Hollywood&key=${process.env.NEXT_PUBLIC_MAPS_API_KEY_BOGDAN}`;

	return (
		<Container maxW="100%">
			<Text align="center" fontSize="5xl">
				Welcome
			</Text>
			<NextLink href={"/stations"}>
				<Button colorScheme="blue">See all stations</Button>
			</NextLink>
			<NextLink href={routeUrl}>Route</NextLink>
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
