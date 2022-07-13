import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { Container, Text } from "@chakra-ui/react";

const AppointmentCalendar = ({ setDate, onOpen, isOpen }) => {
	const selectBookingDay = (value) => {
		setDate(value);
		onOpen();
	};

	return (
		<>
			{isOpen ? (
				<Container pt={12} maxW="100%" align="center">
					<Calendar onClickDay={(value) => selectBookingDay(value)} />
				</Container>
			) : (
				<Container pt={12} maxW="100%" align="center">
					<Text fontSize="4xl">
						Ops... Looks like this station is closed
					</Text>
				</Container>
			)}
		</>
	);
};

export default AppointmentCalendar;
