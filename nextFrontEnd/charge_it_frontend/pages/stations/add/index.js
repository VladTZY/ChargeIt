import axios from "axios";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

import {
	FormControl,
	FormLabel,
	FormErrorMessage,
	Input,
	Box,
	Button,
	Select,
} from "@chakra-ui/react";

export const addSation = () => {
	const router = useRouter();

	const [name, setName] = useState("");
	const [location, setLocation] = useState("");
	const [country, setCountry] = useState("");
	const [city, setCity] = useState("");
	const [latitude, setLatitude] = useState(0.0);
	const [longitude, setLongitude] = useState(0.0);
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
			.then((res) => setStationTypes(res.data));
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
			postNewStation();
	};

	const postNewStation = () => {
		const newStation = {
			name,
			location,
			opne: true,
			country,
			city,
			latitude,
			longitude,
			stationTypeId,
		};

		axios
			.post("http://localhost:8090/api/stations/add", newStation)
			.then((res) => router.push("/stations"));
	};

	return (
		<Box display="flex" justifyContent="center">
			<Box mt="24px" width="33%">
				<FormControl isInvalid={nameError} isRequired="true">
					<FormLabel>Name</FormLabel>
					<Input
						id="name"
						value={name}
						onChange={(e) => setName(e.target.value)}
					></Input>
					<FormErrorMessage>Name is required</FormErrorMessage>
				</FormControl>

				<FormControl isInvalid={locationError} isRequired="true">
					<FormLabel>Location</FormLabel>
					<Input
						id="location"
						value={location}
						onChange={(e) => setLocation(e.target.value)}
					></Input>
					<FormErrorMessage>Location is required</FormErrorMessage>
				</FormControl>

				<FormControl isInvalid={countryError} isRequired="true">
					<FormLabel>Country</FormLabel>
					<Input
						id="country"
						value={country}
						onChange={(e) => setCountry(e.target.value)}
					></Input>
					<FormErrorMessage>Country is required</FormErrorMessage>
				</FormControl>

				<FormControl isInvalid={cityError} isRequired="true">
					<FormLabel>City</FormLabel>
					<Input
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
