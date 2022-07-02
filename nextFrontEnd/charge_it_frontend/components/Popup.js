import { CloseIcon } from '@chakra-ui/icons'
import { Box, Icon } from "@chakra-ui/react"

const Popup = (props) => {

    return (props.isOpen) ? (
        <Box position="fixed" top="0px" left="0px" width="100%" height="100vh" display="flex" justifyContent="center">
            <Box position="relative" padding="32px" backgroundColor="gray.500">
                <Icon position="absolute" top="16px" right="16px" onClick={props.onClose} cursor="pointer" as={CloseIcon} />
                {props.children}
            </Box>
        </Box>
    ) : "";
}

export default Popup;