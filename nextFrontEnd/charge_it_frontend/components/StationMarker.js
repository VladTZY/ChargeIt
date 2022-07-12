import React from "react";
import { Marker } from "react-leaflet";
import L from "leaflet";
import { useRouter } from "next/router";
import "leaflet/dist/leaflet.css";
import iconUrl from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

const StationMarker = ({ latitude, longitude, stationId }) => {
	const router = useRouter();
	const pos = [latitude, longitude];

	const icon = L.icon({
		iconUrl: iconUrl,
		shadowUrl: iconShadow,
	});

	const redirectToId = () => {
		router.push(`/stations/${stationId}`);
	};

	return (
		<Marker
			position={pos}
			icon={icon}
			eventHandlers={{
				click: (e) => redirectToId(),
			}}
		></Marker>
	);
};

export default StationMarker;
