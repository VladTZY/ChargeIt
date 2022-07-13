import React from "react";
import { useRouter } from "next/router";
import { Marker } from "@react-google-maps/api";

const StationMarkerGoogle = ({ lat, lng, stationId }) => {
	const router = useRouter();

	const redirectToId = () => {
		router.push(`/stations/${stationId}`);
	};

	return (
		<Marker
			position={{ lat: lat, lng: lng }}
			clickable={true}
			onClick={redirectToId}
		/>
	);
};

export default StationMarkerGoogle;
