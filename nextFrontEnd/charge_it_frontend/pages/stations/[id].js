import React from "react";
import axios from "axios";
import Moment from "moment";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

import { Link, Text, useDisclosure } from "@chakra-ui/react";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import {
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalFooter,
	ModalBody,
	ModalCloseButton,
	Button,
	Lorem,
} from "@chakra-ui/react";

import AppointmentCalendar from "../../components/AppointmentCalendar";
import ModalPage from "../../components/ModalPage";

export const StationPage = ({ ssrStation, ssrLocationUrl }) => {
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

	return (
		<div>
			<Text align="center">{station.name}</Text>
			<Text align="center">{station.location}</Text>
			<Link href={locationUrl} isExternal>
				{" "}
				See the location on maps <ExternalLinkIcon />{" "}
			</Link>
			<AppointmentCalendar setDate={setDate} onOpen={openModal} />

			<Modal isOpen={isModalOpen} onClose={closeModal}>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>
						{Moment(date).format("yyyy-MM-DD")}
					</ModalHeader>
					<ModalCloseButton />
					<ModalPage
						stationId={router.query.id}
						date={date}
						closeModal={closeModal}
					/>
				</ModalContent>
			</Modal>
		</div>
	);
};

export const getServerSideProps = async (context) => {
	const id = context.params.id;
	const stationRes = await axios.get(
		`http://localhost:8090/api/stations/${id}`
	);
	const stationData = stationRes.data;
	const locationUrlRes = await axios.get(
		`http://localhost:8090/api/stations/${id}/location_url`
	);
	const locationUrlData = locationUrlRes.data;

	return {
		props: {
			ssrStation: stationData,
			ssrLocationUrl: locationUrlData,
		},
	};
};

export default StationPage;
