import React from 'react'
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router'

import { Link, Text } from '@chakra-ui/react' 
import { ExternalLinkIcon } from '@chakra-ui/icons'

import AppointmentCalendar from '../../components/AppointmentCalendar';

export const StationPage = ({ ssrStation, ssrLocationUrl }) => {
  const router = useRouter();

  const [station, setStation] = useState( ssrStation );
  const [locationUrl, setLocationUrl] = useState( ssrLocationUrl );

  useEffect(() => {

    axios.get(`http://localhost:8090/api/stations/${router.query.id}`).then(res => setStation(res.data))
    axios.get(`http://localhost:8090/api/stations/${router.query.id}/location_url`).then(res => setLocationUrl(res.data))
  }, [router.query])

  return (
    <div>
      <Text align="center">{station.name}</Text>
      <Text align="center">{station.location}</Text>
      <Link href={locationUrl} isExternal> See the location on maps <ExternalLinkIcon/> </Link>
      <AppointmentCalendar name = {station.name} id = {station.id} />
    </div>
  )
}


export const getServerSideProps = async (context) => {
  const id = context.params.id;
  const stationRes = await axios.get(`http://localhost:8090/api/stations/${id}`);
  const stationData = stationRes.data;
  const locationUrlRes = await axios.get(`http://localhost:8090/api/stations/${id}/location_url`);
  const locationUrlData = locationUrlRes.data;

  return {
    props: {
      ssrStation: stationData,
      ssrLocationUrl: locationUrlData
    }
  }

}


export default StationPage;