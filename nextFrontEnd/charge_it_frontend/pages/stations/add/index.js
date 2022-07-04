import axios from 'axios'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react';

import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText, 
    Input,
    Box,
    Button,
    Select,
    VStack
} from '@chakra-ui/react'

export const addSation = () => {
  const router = useRouter();

  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [country, setCountry] = useState('');
  const [city, setCity] = useState('');
  const [latitude, setLatitude] = useState(61.567741);
  const [longitude, setLongitude] = useState(27.835579);
  const [stationTypeId, setStationTypeId] = useState(0);
  
  const [stationTypes, setStationTypes] = useState([]);
  
  useEffect(() => {
    axios.get('http://localhost:8090/api/station_types').then(res => setStationTypes(res.data));
  }, [])

  const postNewStation = () => {
    const newStation = {
      name,
      location,
      opne: true,
      country,
      city,
      latitude,
      longitude,
      stationTypeId
    }

    axios.post("http://localhost:8090/api/stations/add", newStation).then(res => router.push('/stations'));
  }
  
  return (
    <Box display="flex" justifyContent="center">
      <Box mt="24px" width="33%">
        <FormControl>
          <FormLabel>Name</FormLabel>
          <Input id="name" value={name} onChange={(e) => setName(e.target.value)}></Input>
          
          <FormLabel>Location</FormLabel>
          <Input id="location" value={location} onChange={(e) => setLocation(e.target.value)}></Input>

          <FormLabel>Country</FormLabel>
          <Input id="country" value={country} onChange={(e) => setCountry(e.target.value)}></Input>

          <FormLabel>City</FormLabel>
          <Input id="country" value={city} onChange={(e) => setCity(e.target.value)}></Input>

          <FormLabel>Latitude</FormLabel>
          <Input id="country" value={latitude} onChange={(e) => setLatitude(e.target.value)}></Input>

          <FormLabel>longitude</FormLabel>
          <Input id="country" value={longitude} onChange={(e) => setLongitude(e.target.value)}></Input>

          <FormLabel>StationTypeId</FormLabel>
          <Select placeholder="StationTypeId" onChange={(e) => setStationTypeId(e.target.value)}>
            {stationTypes.map(stationType => (
              <option key={stationType.id} value={stationType.id}>{stationType.name}</option>
            ))}
          </Select>
          
          <Button width="100%" onClick={postNewStation} mt="10px" colorScheme="blue">Add</Button>
        </FormControl>
      </Box>
    </Box>
  )
}

export default addSation;
