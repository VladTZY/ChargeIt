import { useEffect, useState } from "react";
import Moment from "moment";
import axios from "axios";

import { Box, Text, Button, Icon } from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";
import {
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalFooter,
	ModalBody,
	ModalCloseButton,
} from "@chakra-ui/react";

import HoursAppointment from "./HoursAppointment";
import AddAppointment from "./AddAppointment";

const ModalPage = ({ stationId, date, closeModal }) => {
	const [occupied, setOcuppied] = useState(new Array(48).fill(0));
	const [firstClicked, setFirstClicked] = useState(null);
	const [lastClicked, setLastClicked] = useState(null);
	const [startHour, setStartHour] = useState(null);

	useEffect(() => {
		const formatedDate = Moment(date).format("yyyy-MM-DD");
		axios
			.get(
				`http://localhost:8090/api/bookings/date/${formatedDate}/station/${stationId}`
			)
			.then((res) => {
				let localOccupied = new Array(48).fill(0);

				res.data.forEach((booking) => {
					let index = Moment(booking.startDateTime).format("HH") * 2;
					const length = booking.duration / 30;
					if (Moment(booking.startDateTime).format("mm") == "30")
						index++;

					for (var i = index; i < index + length; i++)
						localOccupied[i] = 1;
				});

				setOcuppied(localOccupied);
			});
	}, [stationId]);

	console.log(firstClicked, lastClicked);

	return (
		<ModalBody>
			<HoursAppointment
				firstClicked={firstClicked}
				setFirstClicked={setFirstClicked}
				lastClicked={lastClicked}
				setLastClicked={setLastClicked}
				occupied={occupied}
				setStartHour={setStartHour}
			/>
			<ModalFooter>
				<AddAppointment
					date={date}
					startHour={startHour}
					duration={(lastClicked - firstClicked + 1) * 30}
					stationId={stationId}
					closeModal={closeModal}
				/>
			</ModalFooter>
		</ModalBody>
	);
};

export default ModalPage;
