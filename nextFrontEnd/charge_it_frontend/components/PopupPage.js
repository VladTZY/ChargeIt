import { Box, VStack, Text, Button } from '@chakra-ui/react'
import { CloseIcon } from '@chakra-ui/icons'
import { Icon } from "@chakra-ui/react"
import { useEffect, useState } from 'react'
import Moment from 'moment'
import axios from 'axios'

const PopupPage = ({ stationId, name, date, onClose }) => {
    const [bookings, setBookings] = useState([]);
    const [firstClicked, setFirstClicked] = useState(null);
    const [lastClicked, setLastClicked] = useState(null);
    const [clickedCount, setClickedCount] = useState(0);

    const hours = [
        "00:00", "00:30",
        "01:00", "01:30",
        "02:00", "02:30",
        "03:00", "03:30",
        "04:00", "04:30",
        "05:00", "05:30",
        "06:00", "06:30",
        "07:00", "07:30",
        "08:00", "08:30",
        "09:00", "09:30",
        "10:00", "10:30",
        "11:00", "11:30",
        "12:00", "12:30",
        "13:00", "13:30",
        "14:00", "14:30",
        "15:00", "15:30",
        "16:00", "16:30",
        "17:00", "17:30",
        "18:00", "18:30",
        "19:00", "19:30",
        "20:00", "20:30",
        "21:00", "21:30",
        "22:00", "22:30",
        "23:00", "23:30",
    ];

    useEffect(() => {
        const formatedDate = Moment(date).format("yyyy-MM-DD")
        axios.get(`http://localhost:8090/api/bookings/date/${formatedDate}/station/${stationId}`).then(res => setBookings(res.data))
    }, [stationId])

    const hourClicked = (id) => {
        
        if (firstClicked == null) {
            
            setFirstClicked(id);
            setLastClicked(id);
            setClickedCount(1);

            return ;
        }

        if (id == lastClicked + 1) {

            setLastClicked(id);
            setClickedCount(clickedCount + 1);
        
            return;
        }

        setFirstClicked(id);
        setLastClicked(id);
        setClickedCount(1);
    }    

    return (
        <Box background="gray.300" minWidth="400px">
            <VStack>
                <Icon marginTop="16px" onClick={onClose} cursor="pointer" as={CloseIcon} />
                <Text>{name}</Text>
                <VStack overflowY="scroll" maxHeight="360px" minWidth="400px">
                    {hours.map((hour, index) => 
                    (<Button colorScheme={(firstClicked != null && index >= firstClicked && index <= lastClicked) ? "blue" : "gray"} key={index} align="center" onClick={() => hourClicked(index)}>{hour}</Button>)
                    )}
                </VStack>
                <Button colorScheme="blue">Make appointment</Button>
            </VStack>
        </Box>
    )
}

export default PopupPage;