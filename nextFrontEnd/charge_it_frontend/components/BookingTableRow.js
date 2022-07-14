import React from "react";
import { Tr, Td } from "@chakra-ui/react";
import Moment from "moment";

const BookingTableRow = ({
	userName,
	carLicense,
	startDateTime,
	endDateTime,
	station,
}) => {
	console.log(station);
	return (
		<Tr>
			<Td>{userName}</Td>
			<Td>{carLicense}</Td>
			<Td>{Moment(startDateTime).format("yyyy-MM-DD HH:mm")}</Td>
			<Td>{Moment(endDateTime).format("yyyy-MM-DD HH:mm")}</Td>
			<Td>{station}</Td>
		</Tr>
	);
};

export default BookingTableRow;
