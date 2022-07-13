import React, { useState, useEffect } from "react";
import axios from "axios";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

import StationMarkerGoogle from "./StationMarkerGoogle";
import { Container } from "@chakra-ui/react";

const containerStyle = {
	width: "100%",
	height: "75vh",
};

const MapsGoogle = ({ ssrStations }) => {
	const [stations, setStations] = useState(ssrStations);
	const [center, setCenter] = useState({
		lat: 0.0,
		lng: 0.0,
	});

	useEffect(() => {
		axios
			.get("http://localhost:8090/api/stations")
			.then((res) => setStations(res.data))
			.then((res) => {
				navigator.geolocation.getCurrentPosition((position) => {
					setCenter({
						lat: position.coords.latitude,
						lng: position.coords.longitude,
					});
				});
			});
	}, []);

	return (
		<Container maxW="100%" align="center" pt={12} pb={4}>
			<LoadScript googleMapsApiKey="AIzaSyARBq7b0klCuaTxKST6mCODooMWXZbQCnY">
				<GoogleMap
					mapContainerStyle={containerStyle}
					center={center}
					zoom={10}
				>
					<>
						{stations.map((station) => {
							return (
								<StationMarkerGoogle
									key={station.id}
									lat={station.locationDetails.latitude}
									lng={station.locationDetails.longitude}
									stationId={station.id}
								/>
							);
						})}
					</>
				</GoogleMap>
			</LoadScript>
		</Container>
	);
};

export default MapsGoogle;
