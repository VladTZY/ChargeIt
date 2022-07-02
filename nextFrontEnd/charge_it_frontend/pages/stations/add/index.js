import React from 'react'
import axios from 'axios'
import { useState } from 'react';

import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
    Input,
    Box,
    Button
} from '@chakra-ui/react'

export const addSation = () => {
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [country, setCountry] = useState('');
  const [city, setCity] = useState('');
  const [latitude, setLatitude] = useState(61.567741);
  const [longitude, setLongitude] = useState(27.835579);
  const [stationTypeId, setStationTypeId] = useState(0);
  
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

    axios.post("http://localhost:8090/api/stations/add", newStation);
  }
  
  return (
    <Box maxWidth="33%">
        <FormControl>
            <FormLabel>Name</FormLabel>
            <Input id="name" value={name} onChange={(e) => setName(e.target.value)}></Input>
            
            <FormLabel>Location</FormLabel>
            <Input id="location" value={location} onChange={(e) => setLocation(e.target.value)}></Input>
            
            <FormLabel>StationTypeId</FormLabel>
            <Input id="stationTypeId" value={stationTypeId} onChange={(e) => setStationTypeId(e.target.value)}></Input>
            
            <Button onClick={postNewStation} mt="10px" colorScheme="blue">Add</Button>
        </FormControl>
    </Box>
  )
}

export default addSation;
