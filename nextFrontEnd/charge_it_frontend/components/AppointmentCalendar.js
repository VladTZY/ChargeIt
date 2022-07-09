import Calendar from "react-calendar";

const AppointmentCalendar = ({ setDate, onOpen }) => {
	const selectBookingDay = (value) => {
		setDate(value);
		onOpen();
	};

	return (
		<>
			<Calendar onClickDay={(value) => selectBookingDay(value)} />
		</>
	);
};

export default AppointmentCalendar;
