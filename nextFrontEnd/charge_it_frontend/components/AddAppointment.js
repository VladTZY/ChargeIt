import React, { useRef, useState } from "react";
import Moment from "moment";
import axios from "axios";

import {
	Button,
	FormControl,
	Input,
	FormLabel,
	Text,
	FormErrorMessage,
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
	const [userName, setUserName] = useState("");
	const [carLicense, setCarLicense] = useState("");

	const [nameError, setNameError] = useState(false);
	const [carLicenseError, setCarLicenseError] = useState(false);

	const openDrawer = () => {
		setDrawerOpen(true);
	};
	const closeDrawer = () => {
		setDrawerOpen(false);
	};

	const validateForm = () => {
		setNameError(userName == "" ? true : false);
		setCarLicenseError(carLicense == "" ? true : false);

		if (!(userName == "" || carLicense == "")) makeAppointment();
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
				mt={2}
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
						<FormControl isInvalid={nameError} isRequired="true">
							<FormLabel>Name</FormLabel>
							<Input
								placeholder="Type here..."
								value={userName}
								onChange={(e) => setUserName(e.target.value)}
							/>
							<FormErrorMessage>
								Name is required
							</FormErrorMessage>
						</FormControl>

						<FormControl
							isInvalid={carLicenseError}
							isRequired="true"
						>
							<FormLabel pt="16px">Car License Number</FormLabel>
							<Input
								placeholder="Type here..."
								value={carLicense}
								onChange={(e) => setCarLicense(e.target.value)}
							/>
							<FormErrorMessage>
								Car license number is required
							</FormErrorMessage>
						</FormControl>

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
						<Button colorScheme="blue" onClick={validateForm}>
							Save
						</Button>
					</DrawerFooter>
				</DrawerContent>
			</Drawer>
		</>
	);
};

export default AddAppointment;
