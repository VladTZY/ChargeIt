import React, { useEffect, useState } from "react";
import axios from "axios";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer } from "react-leaflet";

import StationMarker from "./StationMarker";

const containerStyle = {
	width: "75vw",
	height: "75vh",
};

const Map = ({ ssrStations }) => {
	const [stations, setStations] = useState(ssrStations);
	const [center, setCenter] = useState(null);

	useEffect(() => {
		axios
			.get("http://localhost:8090/api/stations")
			.then((res) => setStations(res.data))
			.then((res) => {
				navigator.geolocation.getCurrentPosition((position) => {
					setCenter([
						position.coords.latitude,
						position.coords.longitude,
					]);
				});
			});
	}, []);

	return (
		<>
			{center != null && (
				<MapContainer
					center={center}
					zoom={13}
					scrollWheelZoom={false}
					style={containerStyle}
				>
					<TileLayer
						attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
						url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
					/>

					{stations.map((station) => {
						return (
							<StationMarker
								latitude={station.locationDetails.latitude}
								longitude={station.locationDetails.longitude}
								stationId={station.id}
							/>
						);
					})}
				</MapContainer>
			)}
		</>
	);
};

export default Map;
