package com.summercamp.chargerIt.service;

import com.summercamp.chargerIt.dto.BookingDto;
import com.summercamp.chargerIt.exception.NotFoundException;
import com.summercamp.chargerIt.models.Booking;
import com.summercamp.chargerIt.models.Station;
import com.summercamp.chargerIt.repo.BookingRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BookingService {

    @Autowired
    private BookingRepo bookingRepo;

    @Autowired
    private StationService stationService;

    public List<Booking> getBookings() {
        return bookingRepo.findAll();
    }

    public Booking getBookingById(Long id) {
        return bookingRepo.findById(id).orElseThrow(() -> { return new NotFoundException("Id not found"); });
    }

    public Booking getBookingFromDto(BookingDto bookingDto) {
        Booking booking = new Booking(
                bookingDto.getUserName(),
                bookingDto.getCarLicense(),
                bookingDto.getStartDateTime(),
                bookingDto.getDuration()
        );
        Station station = stationService.getStationById(bookingDto.getStationId());

        booking.setStation(station);

        return booking;
    }

    public Booking addBooking(BookingDto newBookingDto) {
        Booking newBooking = getBookingFromDto(newBookingDto);

        return bookingRepo.save(newBooking);
    }
}
