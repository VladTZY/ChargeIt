import { Box, VStack, Text } from '@chakra-ui/react'
import { CloseIcon } from '@chakra-ui/icons'
import { Icon } from "@chakra-ui/react"

const PopupPage = ({ name, date, onClose }) => {

    const hours = [
        "00:00", "00:30",
        "01:00", "00:30",
        "02:00", "01:30",
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
    
    return (
        <Box background="gray.300" minWidth="400px">
            <VStack>
                <Icon marginTop="16px" onClick={onClose} cursor="pointer" as={CloseIcon} />
                <Text>{name}</Text>
                <Box overflowY="scroll" maxHeight="360px" minWidth="400px">
                    {hours.map((hour) => 
                    (<Text align="center">{hour}</Text>)
                    )}
                </Box>
            </VStack>
        </Box>
    )
}

export default PopupPage;