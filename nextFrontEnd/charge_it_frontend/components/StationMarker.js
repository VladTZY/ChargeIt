import React from "react";
import { Marker } from "react-leaflet";
import L, { marker } from "leaflet";
import { useRouter } from "next/router";
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

const StationMarker = ({ latitude, longitude, stationId }) => {
	const router = useRouter();
	const pos = [latitude, longitude];

	const markerIcon = L.icon({
		iconUrl: icon,
		shadowUrl: iconShadow,
	});

	const redirectToId = () => {
		router.push(`/stations/${stationId}`);
	};

	return (
		<Marker
			position={pos}
			icon={markerIcon}
			eventHandlers={{
				click: (e) => redirectToId(),
			}}
		></Marker>
	);
};

export default StationMarker;
