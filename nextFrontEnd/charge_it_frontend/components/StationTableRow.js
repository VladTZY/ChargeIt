import React from 'react'
import Link from "next/link"

import { Tr, Td } from '@chakra-ui/react'

export const StationTableRow = ({ station }) => {

  return (
    <Link href={`/stations/${station.id}`}>
        <Tr cursor="pointer">
            <Td>{station.name}</Td>
            <Td>{station.location}</Td>
            <Td>{station.stationType.name}</Td>
            <Td>{station.stationType.power}</Td>
            <Td>{station.stationType.plugType}</Td>   
        </Tr>
    </Link>
  )
}

export default StationTableRow;
