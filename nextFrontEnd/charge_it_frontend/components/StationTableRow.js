import React from "react";
import NextLink from "next/link";

import { Tr, Td } from "@chakra-ui/react";

export const StationTableRow = ({ station }) => {
	return (
		<NextLink href={`/stations/${station.id}`}>
			<Tr color={station.open ? "black" : "gray.200"} cursor="pointer">
				<Td>{station.name}</Td>
				<Td>{station.location}</Td>
				<Td>{station.stationType.name}</Td>
				<Td>{station.stationType.power}</Td>
				<Td>{station.stationType.plugType}</Td>
			</Tr>
		</NextLink>
	);
};

export default StationTableRow;
