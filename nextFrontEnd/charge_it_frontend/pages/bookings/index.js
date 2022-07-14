import {
	Container,
	TableContainer,
	Table,
	TableCaption,
	Thead,
	Tbody,
	Tr,
	Th,
	Text,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import BookingTableRow from "../../components/BookingTableRow";

const BookingsPage = ({ ssrBookings }) => {
	const [bookings, setBookings] = useState(ssrBookings);

	useEffect(() => {
		axios
			.get("http://localhost:8090/api/bookings")
			.then((res) => setBookings(res.data));
	}, []);

	return (
		<Container maxW="100%" pt={4}>
			<TableContainer pt={4} width="100%">
				<Table variant="simple">
					<TableCaption>Bookings</TableCaption>

					<Thead>
						<Tr>
							<Th>UserName</Th>
							<Th>License Plate</Th>
							<Th>Start date time</Th>
							<Th>End date time</Th>
							<Th>Station</Th>
						</Tr>
					</Thead>

					<Tbody>
						{bookings.map((booking) => (
							<BookingTableRow
								key={booking.id}
								userName={booking.userName}
								carLicense={booking.carLicense}
								startDateTime={booking.startDateTime}
								endDateTime={booking.endDateTime}
								station={booking.station.name}
							/>
						))}
					</Tbody>
				</Table>
			</TableContainer>
		</Container>
	);
};

export default BookingsPage;

export async function getServerSideProps() {
	const res = await axios.get("http://localhost:8090/api/bookings");
	const data = await res.data;

	return {
		props: {
			ssrBookings: data,
		},
	};
}
