import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import {
	FormControl,
	FormLabel,
	FormErrorMessage,
	Input,
	Box,
	Button,
	Select,
	Text,
	Checkbox,
} from "@chakra-ui/react";

const UpdateStation = ({ ssrStation, ssrStationTypes }) => {
	const [station, setStation] = useState(ssrStation);
	const [stationTypes, setStationTypes] = useState(ssrStationTypes);
	const router = useRouter();

	const [name, setName] = useState(station.name);
	const [location, setLocation] = useState(station.location);
	const [isOpen, setOpen] = useState(station.open);
	const [country, setCountry] = useState(station.locationDetails.country);
	const [city, setCity] = useState(station.locationDetails.city);
	const [latitude, setLatitude] = useState(station.locationDetails.latitude);
	const [longitude, setLongitude] = useState(
		station.locationDetails.longitude
	);
	const [stationTypeId, setStationTypeId] = useState(station.stationType.id);

	console.log(station.open);

	const [nameError, setNameError] = useState(false);
	const [locationError, setLocationError] = useState(false);
	const [countryError, setCountryError] = useState(false);
	const [cityError, setCityError] = useState(false);
	const [stationTypeIdError, setStationTypeIdError] = useState(false);

	useEffect(() => {
		axios
			.get(`http://localhost:8090/api/stations/${router.query.id}`)
			.then((res) => setStation(res.data));
		axios
			.get("http://localhost:8090/api/station_types")
			.then((res) => setStationTypes(res.data));
	}, [router.query.id]);

	const validateForm = () => {
		setNameError(name == "" ? true : false);
		setLocationError(location == "" ? true : false);
		setCityError(city == "" ? true : false);
		setCountryError(country == "" ? true : false);
		setStationTypeIdError(stationTypeId == -1 ? true : false);

		if (
			!(
				name == "" ||
				location == "" ||
				city == "" ||
				country == "" ||
				stationTypeIdError == -1
			)
		)
			updateStation();
	};

	const updateStation = () => {
		const updateStation = {
			name,
			location,
			open: isOpen,
			latitude,
			longitude,
			country,
			city,
			stationTypeId,
		};

		console.log(stationTypeId);

		axios
			.put(
				`http://localhost:8090/api/stations/update/${router.query.id}`,
				updateStation
			)
			.then((res) => router.back());
	};

	return (
		<Box display="flex" justifyContent="center">
			<Box mt="24px" width="33%">
				<Text align="center" fontSize="3xl" pb={6} pt={2}>
					Update station informations for station {station.name}
				</Text>
				<FormControl isInvalid={nameError} isRequired="true">
					<FormLabel>Name</FormLabel>
					<Input
						placeholder="Type here..."
						id="name"
						value={name}
						onChange={(e) => setName(e.target.value)}
					></Input>
					<FormErrorMessage>Name is required</FormErrorMessage>
				</FormControl>

				<FormControl isInvalid={locationError} isRequired="true">
					<FormLabel>Location</FormLabel>
					<Input
						placeholder="Type here..."
						id="location"
						value={location}
						onChange={(e) => setLocation(e.target.value)}
					></Input>
					<FormErrorMessage>Location is required</FormErrorMessage>
				</FormControl>

				<FormControl isInvalid={countryError} isRequired="true">
					<FormLabel>Country</FormLabel>
					<Input
						placeholder="Type here..."
						id="country"
						value={country}
						onChange={(e) => setCountry(e.target.value)}
					></Input>
					<FormErrorMessage>Country is required</FormErrorMessage>
				</FormControl>

				<FormControl isInvalid={cityError} isRequired="true">
					<FormLabel>City</FormLabel>
					<Input
						placeholder="Type here..."
						id="city"
						value={city}
						onChange={(e) => setCity(e.target.value)}
					></Input>
					<FormErrorMessage>City is required</FormErrorMessage>
				</FormControl>

				<FormLabel>Latitude</FormLabel>
				<Input
					id="latitude"
					value={latitude}
					onChange={(e) => setLatitude(e.target.value)}
				></Input>

				<FormLabel>longitude</FormLabel>
				<Input
					id="longitude"
					value={longitude}
					onChange={(e) => setLongitude(e.target.value)}
				></Input>

				<FormControl isInvalid={stationTypeIdError} isRequired="true">
					<FormLabel>StationTypeId</FormLabel>
					<Select
						placeholder="StationTypeId"
						onChange={(e) => setStationTypeId(e.target.value)}
					>
						{stationTypes.map((stationType) => (
							<option key={stationType.id} value={stationType.id}>
								{stationType.name}
							</option>
						))}
					</Select>
					<FormErrorMessage>
						Please select a station type
					</FormErrorMessage>
				</FormControl>

				<FormControl>
					<FormLabel>Is open</FormLabel>
					<Checkbox
						isChecked={isOpen}
						onChange={(e) => setOpen(e.target.checked)}
					>
						Is open
					</Checkbox>
				</FormControl>

				<Button
					mb={10}
					width="100%"
					onClick={validateForm}
					mt="10px"
					colorScheme="blue"
				>
					Update
				</Button>
			</Box>
		</Box>
	);
};

export default UpdateStation;

export const getServerSideProps = async (context) => {
	const id = context.params.id;
	const stationRes = await axios.get(
		`http://localhost:8090/api/stations/${id}`
	);
	const stationData = stationRes.data;
	const stationTypesRes = await axios.get(
		"http://localhost:8090/api/station_types"
	);
	const stationTypesData = stationTypesRes.data;

	return {
		props: {
			ssrStation: stationData,
			ssrStationTypes: stationTypesData,
		},
	};
};
