import React, { useState, useEffect } from "react";
import axios from "axios";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

import StationMarkerGoogle from "./StationMarkerGoogle";
import { Box } from "@chakra-ui/react";

const containerStyle = {
	width: "100%",
	height: "70vh",
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
		<Box maxW="100%" align="center" pt={6} pb={4}>
			<LoadScript
				googleMapsApiKey={process.env.NEXT_PUBLIC_MAPS_API_KEY_BOGDAN}
			>
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
		</Box>
	);
};

export default MapsGoogle;
