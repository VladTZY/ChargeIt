package com.summercamp.chargerIt.service;

import com.summercamp.chargerIt.dto.BookingDto;
import com.summercamp.chargerIt.exception.NotFoundException;
import com.summercamp.chargerIt.models.Booking;
import com.summercamp.chargerIt.models.Station;
import com.summercamp.chargerIt.repo.BookingRepo;
import lombok.SneakyThrows;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

@Service
public class BookingService {

    @Autowired
    private BookingRepo bookingRepo;

    @Autowired
    private StationService stationService;

    @Autowired
    private DateTimeService dateTimeService;

    public List<Booking> getBookings() {
        return bookingRepo.findAll();
    }

    public Booking getBookingById(Long id) {
        return bookingRepo.findById(id).orElseThrow(() -> { return new NotFoundException("Id not found"); });
    }

        public Booking getBookingFromDto(BookingDto bookingDto) {

        //Date startDate = dateTimeService.getDateFromDateTime(bookingDto.getStartDateTime());
        //Date startTime = dateTimeService.getTimeFromDateTime(bookingDto.getStartDateTime());

        Booking booking = new Booking(
                bookingDto.getUserName(),
                bookingDto.getCarLicense(),
                bookingDto.getStartDate(),
                bookingDto.getStartTime(),
                bookingDto.getDuration()
        );
        Station station = stationService.getStationById(bookingDto.getStationId());

        booking.setStation(station);

        return booking;
    }

    @SneakyThrows
    public List<Booking> getBookingByDate(String startDateTime) {
        Date date = new SimpleDateFormat("yyyy-MM-dd").parse(startDateTime);

        return bookingRepo.findAllBookingByStartDate(date);
    }

    public Booking addBooking(BookingDto newBookingDto) {
        Booking newBooking = getBookingFromDto(newBookingDto);

        return bookingRepo.save(newBooking);
    }

    public ResponseEntity<String> deleteBooking(Long id) {
        Booking booking = getBookingById(id);

        bookingRepo.deleteById(id);
        return new ResponseEntity<>("Booking deleted", HttpStatus.OK);
    }
}
