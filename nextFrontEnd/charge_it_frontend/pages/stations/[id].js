import React from "react";
import axios from "axios";
import Moment from "moment";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

import { Link, Text } from "@chakra-ui/react";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import {
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalCloseButton,
	Container,
	Button,
	Box,
} from "@chakra-ui/react";

import AppointmentCalendar from "../../components/AppointmentCalendar";
import ModalPage from "../../components/ModalPage";
import ReviewPage from "../../components/ReviewPage";

export const StationPage = ({ ssrStation, ssrLocationUrl, ssrReviews }) => {
	const router = useRouter();

	const [station, setStation] = useState(ssrStation);
	const [locationUrl, setLocationUrl] = useState(ssrLocationUrl);

	const [date, setDate] = useState(new Date());
	const [isModalOpen, setModalOpen] = useState(false);

	useEffect(() => {
		axios
			.get(`http://localhost:8090/api/stations/${router.query.id}`)
			.then((res) => setStation(res.data));
		axios
			.get(
				`http://localhost:8090/api/stations/${router.query.id}/location_url`
			)
			.then((res) => setLocationUrl(res.data));
	}, [router.query]);

	const closeModal = () => {
		setModalOpen(false);
	};
	const openModal = () => {
		setModalOpen(true);
	};

	const deleteStation = () => {
		axios
			.delete(
				`http://localhost:8090/api/stations/delete/${router.query.id}`
			)
			.then((res) => router.back());
	};

	const updateStation = () => {
		router.push(`/stations/update/${router.query.id}`);
	};

	return (
		<Container pt={2} maxW="100%">
			<Text align="center" pt={2} fontSize="6xl">
				{station.name}
			</Text>
			<Text pt={12} fontSize="xl">
				This station is located in {station.locationDetails.city},{" "}
				{station.locationDetails.country}. You can check the location on
				<Link href={locationUrl} isExternal>
					{" "}
					Google Maps <ExternalLinkIcon />{" "}
				</Link>
			</Text>

			<Box pt={4} maxW="100%">
				<Button colorScheme="blue" mr={2} onClick={deleteStation}>
					Delete
				</Button>
				<Button colorScheme="blue" onClick={updateStation}>
					Update
				</Button>
			</Box>

			<Container maxW="container.md">
				<AppointmentCalendar
					setDate={setDate}
					onOpen={openModal}
					isOpen={station.open}
				/>
			</Container>

			<Modal isOpen={isModalOpen} onClose={closeModal}>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>
						{station.name} {Moment(date).format("yyyy-MM-DD")}
					</ModalHeader>
					<ModalCloseButton />
					<ModalPage
						stationId={router.query.id}
						date={date}
						closeModal={closeModal}
					/>
				</ModalContent>
			</Modal>

			<ReviewPage ssrReviews={ssrReviews} stationId={router.query.id} />
		</Container>
	);
};

export const getServerSideProps = async (context) => {
	const id = context.params.id;
	const stationRes = await axios.get(
		`http://localhost:8090/api/stations/${id}`
	);
	const stationData = await stationRes.data;

	const locationUrlRes = await axios.get(
		`http://localhost:8090/api/stations/${id}/location_url`
	);
	const locationUrlData = await locationUrlRes.data;

	const reviewsRes = await axios.get(
		`http://localhost:8090/api/reviews/station/${id}`
	);
	const reviewsData = await reviewsRes.data;

	return {
		props: {
			ssrStation: stationData,
			ssrLocationUrl: locationUrlData,
			ssrReviews: reviewsData,
		},
	};
};

export default StationPage;
