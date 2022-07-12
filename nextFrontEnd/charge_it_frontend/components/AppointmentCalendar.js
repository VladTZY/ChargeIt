import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { Container } from "@chakra-ui/react";

const AppointmentCalendar = ({ setDate, onOpen }) => {
	const selectBookingDay = (value) => {
		setDate(value);
		onOpen();
	};

	return (
		<Container pt={12} maxW="100%" align="center">
			<Calendar onClickDay={(value) => selectBookingDay(value)} />
		</Container>
	);
};

export default AppointmentCalendar;
