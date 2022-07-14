import axios from "axios";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Geocode from "react-geocode";

import {
	FormControl,
	FormLabel,
	FormErrorMessage,
	Input,
	Box,
	Button,
	Select,
	Text,
} from "@chakra-ui/react";

export const addSation = () => {
	const router = useRouter();

	const [name, setName] = useState("");
	const [location, setLocation] = useState("");
	const [country, setCountry] = useState("");
	const [city, setCity] = useState("");
	const [address, setAddress] = useState("");
	const [stationTypeId, setStationTypeId] = useState(-1);

	const [nameError, setNameError] = useState(false);
	const [locationError, setLocationError] = useState(false);
	const [countryError, setCountryError] = useState(false);
	const [cityError, setCityError] = useState(false);
	const [stationTypeIdError, setStationTypeIdError] = useState(false);

	const [stationTypes, setStationTypes] = useState([]);

	useEffect(() => {
		axios
			.get("http://localhost:8090/api/station_types")
			.then((res) => setStationTypes(res.data))
			.then((res) => {
				Geocode.setApiKey(process.env.NEXT_PUBLIC_MAPS_API_KEY_BOGDAN);
				Geocode.setLanguage("en");
				Geocode.setLocationType("ROOFTOP");
			});
	}, []);

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
			addNewStation();
	};

	const addNewStation = () => {
		Geocode.fromAddress(address).then((res) => {
			const { lat, lng } = res.results[0].geometry.location;

			postNewStation(lat, lng);
		});
	};

	const postNewStation = (lat, lng) => {
		const newStation = {
			name,
			location,
			open: true,
			country,
			city,
			latitude: lat,
			longitude: lng,
			stationTypeId,
		};

		axios
			.post("http://localhost:8090/api/stations/add", newStation)
			.then((res) => router.push("/stations"));
	};

	return (
		<Box display="flex" justifyContent="center">
			<Box mt="24px" width="33%">
				<Text align="center" fontSize="3xl" pb={4} pt={2}>
					Add a new station
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

				<FormLabel>Location Address</FormLabel>
				<Input
					id="address"
					value={address}
					onChange={(e) => setAddress(e.target.value)}
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

				<Button
					width="100%"
					onClick={validateForm}
					mt="10px"
					colorScheme="blue"
				>
					Add
				</Button>
			</Box>
		</Box>
	);
};

export default addSation;
