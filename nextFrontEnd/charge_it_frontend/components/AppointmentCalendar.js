import Calendar from 'react-calendar'
import { Box } from '@chakra-ui/react'

import { useState } from 'react'

import PopupPage from './PopupPage'
import Popup from 'reactjs-popup'

const AppointmentCalendar = ({ name, id }) => {
    const [popupIsOpen, setPopupIsOpen] = useState(false);
    const [date, setDate] = useState(new Date());

    const openPopup = () => {
        setPopupIsOpen(true);
    }

    const closePopup = () => {
        setPopupIsOpen(false);
    }

    const selectBookingDay = (value) => {
        setDate(value);
        openPopup();
    }

    return (
        <div>
            <Calendar onClickDay={(value) => selectBookingDay(value)}/>
            <Popup open={popupIsOpen} onClose={closePopup}>
                <PopupPage stationId={id} name={name} date={date} onClose={closePopup}/>
            </Popup>
        </div>
    )
}

export default AppointmentCalendar;