import React, { useState } from "react";
import { useRouter } from "next/router";
import { Marker } from "@react-google-maps/api";

const StationMarkerGoogle = ({ lat, lng, stationId }) => {
	const router = useRouter();
	const [mouseActive, setMouseActive] = useState(false);

	const redirectToId = () => {
		router.push(`/stations/${stationId}`);
	};

	const openLabel = () => {
		setMouseActive(true);
	};

	const closeLabel = () => {
		setMouseActive(false);
	};

	return (
		<Marker
			position={{ lat: lat, lng: lng }}
			clickable={true}
			onClick={redirectToId}
			onMouseOver={openLabel}
			onMouseOut={closeLabel}
		/>
	);
};

export default StationMarkerGoogle;
