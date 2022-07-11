import axios from "axios";
import NextLink from "next/link";
import { useState, useEffect } from "react";

import {
	Table,
	Thead,
	Tbody,
	Tfoot,
	Tr,
	Th,
	Td,
	TableCaption,
	TableContainer,
	Box,
	Button,
	Container,
	FormLabel,
	Input,
} from "@chakra-ui/react";
import StationTableRow from "../../components/StationTableRow";

const Stations = () => {
	const [stations, setSations] = useState([]);
	const [searchValue, setSearchValue] = useState("");

	useEffect(() => {
		if (searchValue == "") {
			axios
				.get("http://localhost:8090/api/stations")
				.then((res) => setSations(res.data));
		} else {
			axios
				.get(`http://localhost:8090/api/stations/search/${searchValue}`)
				.then((res) => setSations(res.data));
		}
	}, [searchValue]);

	return (
		<Container maxW="100%">
			<Box>
				<Container align="center">
					<NextLink href="/stations/add">
						<Button mt="24px" colorScheme="blue">
							Add new station
						</Button>
					</NextLink>
				</Container>

				<Box maxW="25%">
					<FormLabel>Search Name or Location</FormLabel>
					<Input
						placeholder="Search..."
						value={searchValue}
						onChange={(e) => setSearchValue(e.target.value)}
					/>
				</Box>

				<TableContainer pt="50px" width="100%">
					<Table variant="simple">
						<TableCaption>Electric charging stations</TableCaption>

						<Thead>
							<Tr>
								<Th>Name</Th>
								<Th>Location</Th>
								<Th>Station Type</Th>
								<Th>Power</Th>
								<Th>Plug Type</Th>
							</Tr>
						</Thead>

						<Tbody>
							{stations.map((station) => (
								<StationTableRow
									key={station.id}
									station={station}
								/>
							))}
						</Tbody>
					</Table>
				</TableContainer>
			</Box>
		</Container>
	);
};

export default Stations;
