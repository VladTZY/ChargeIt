import React, { useRef, useState } from "react";
import Moment from "moment";
import axios from "axios";

import {
	Button,
	useDisclosure,
	Input,
	FormLabel,
	Text,
} from "@chakra-ui/react";
import {
	Drawer,
	DrawerBody,
	DrawerFooter,
	DrawerHeader,
	DrawerOverlay,
	DrawerContent,
	DrawerCloseButton,
} from "@chakra-ui/react";

const AddAppointment = ({
	date,
	startHour,
	duration,
	stationId,
	closeModal,
}) => {
	const btnRef = useRef();

	const [isDrawerOpen, setDrawerOpen] = useState(false);
	const [userName, setUserName] = useState();
	const [carLicense, setCarLicense] = useState();

	const openDrawer = () => {
		setDrawerOpen(true);
	};
	const closeDrawer = () => {
		setDrawerOpen(false);
	};

	const makeAppointment = () => {
		const startDateTime =
			Moment(date).format("yyyy-MM-DD") + " " + startHour;

		const booking = {
			userName,
			carLicense,
			startDateTime,
			duration,
			stationId,
		};

		axios
			.post("http://localhost:8090/api/bookings/add", booking)
			.then((res) => {
				closeDrawer();
				closeModal();
			});
	};

	return (
		<>
			<Button
				disabled={!startHour}
				ref={btnRef}
				colorScheme="blue"
				onClick={openDrawer}
			>
				Make appointment
			</Button>

			<Drawer
				isOpen={isDrawerOpen}
				placement="right"
				onClose={closeDrawer}
				finalFocusRef={btnRef}
			>
				<DrawerOverlay />
				<DrawerContent>
					<DrawerCloseButton />
					<DrawerHeader>Make appointment</DrawerHeader>

					<DrawerBody>
						<FormLabel>Name</FormLabel>
						<Input
							placeholder="Type here..."
							value={userName}
							onChange={(e) => setUserName(e.target.value)}
						/>

						<FormLabel pt="16px">Car License Number</FormLabel>
						<Input
							placeholder="Type here..."
							value={carLicense}
							onChange={(e) => setCarLicense(e.target.value)}
						/>

						<FormLabel pt="16px">Date</FormLabel>
						<Text>{Moment(date).format("yyyy-MM-DD")}</Text>

						<FormLabel pt="16px">Hour</FormLabel>
						<Text>{startHour}</Text>

						<FormLabel pt="16px">Duration - minutes</FormLabel>
						<Text>{duration}</Text>
					</DrawerBody>

					<DrawerFooter>
						<Button variant="outline" mr={3} onClick={closeModal}>
							Cancel
						</Button>
						<Button colorScheme="blue" onClick={makeAppointment}>
							Save
						</Button>
					</DrawerFooter>
				</DrawerContent>
			</Drawer>
		</>
	);
};

export default AddAppointment;
