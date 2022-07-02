import axios from 'axios';

import { useState, useEffect } from "react";

import {
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
  } from '@chakra-ui/react'
import StationTableRow from '../../components/StationTableRow';

const Stations = () => {
    const [stations, setSations] = useState([])

    useEffect(() => {
        axios.get('http://localhost:8090/api/stations').then(res => setSations(res.data));
    }, [])

    return (
        <div>
            <TableContainer>
                <Table variant="simple">
                    <TableCaption>Electric charging stations</TableCaption>
                    
                    <Thead>
                        <Tr>
                            <Th>Name</Th>
                            <Th>Location</Th>
                            <Th>Station Type</Th>
                            <Th>Power</Th>
                            <Th>Plug Type</Th> 
                        </Tr>
                    </Thead>
                    
                    <Tbody>
                        {stations.map((station) => (<StationTableRow key={station.id} station={station} />))}
                    </Tbody>

                </Table>
            </TableContainer>
        </div>
    )
}

export default Stations;