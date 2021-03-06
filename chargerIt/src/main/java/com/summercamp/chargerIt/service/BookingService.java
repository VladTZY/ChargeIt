package com.summercamp.chargerIt.service;

import com.summercamp.chargerIt.dto.BookingDto;
import com.summercamp.chargerIt.exception.NotFoundException;
import com.summercamp.chargerIt.models.Booking;
import com.summercamp.chargerIt.models.Station;
import com.summercamp.chargerIt.repo.BookingRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.Duration;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
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
                bookingDto.getStartDateTime().plusMinutes(bookingDto.getDuration())
        );
        Station station = stationService.getStationById(bookingDto.getStationId());

        booking.setStation(station);

        return booking;
    }

    public BookingDto getDtoFromBooking(Booking booking) {

        BookingDto bookingDto = new BookingDto(
                booking.getUserName(),
                booking.getCarLicense(),
                booking.getStartDateTime(),
                (int) Duration.between(booking.getStartDateTime(), booking.getEndDateTime()).toMinutes(),
                booking.getStation().getId()
        );

        return bookingDto;
    }

    public Booking addBooking(BookingDto newBookingDto) {
        System.out.println(newBookingDto);
        Station station = stationService.getStationById(newBookingDto.getStationId());
        List<Booking> bookings = bookingRepo.findByStationAndEndDateTimeAfterAndStartDateTimeBeforeOrderByStartDateTime(
                station,
                newBookingDto.getStartDateTime(),
                newBookingDto.getStartDateTime().plusMinutes(newBookingDto.getDuration())
        );

        if (bookings.size() > 0)
            throw new RuntimeException("Overlap");

        Booking newBooking = getBookingFromDto(newBookingDto);

        return bookingRepo.save(newBooking);
    }

    public ResponseEntity<String> deleteBooking(Long id) {
        Booking booking = getBookingById(id);

        bookingRepo.deleteById(id);
        return new ResponseEntity<>("Booking deleted", HttpStatus.OK);
    }

    @Transactional
    public Booking updateBooking(Long id, BookingDto updatedBookingDto) {
        Booking booking = getBookingById(id);

        if (updatedBookingDto.getStationId() != null) {
            Station updateStation = stationService.getStationById(updatedBookingDto.getStationId());
            booking.setStation(updateStation);
        }

        booking.setUserName(updatedBookingDto.getUserName());
        booking.setCarLicense(updatedBookingDto.getCarLicense());
        booking.setStartDateTime(updatedBookingDto.getStartDateTime());
        booking.setEndDateTime(updatedBookingDto.getStartDateTime().plusMinutes(updatedBookingDto.getDuration()));
        return booking;
    }

    public List<BookingDto> getBookingsByDateAndStation(String date, Long stationId) {
        Station station = stationService.getStationById(stationId);

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        LocalDateTime startOfDayDateTime = LocalDate.parse(date, formatter).atStartOfDay();
        LocalDateTime endOfDatDateTime = LocalDate.parse(date, formatter).atStartOfDay().plusMinutes(1439);

        List<BookingDto> bookingDtos = new ArrayList<>();
        List<Booking> bookings = bookingRepo.findByStationAndEndDateTimeAfterAndStartDateTimeBeforeOrderByStartDateTime(
                station,
                startOfDayDateTime,
                endOfDatDateTime
        );

        bookings.forEach(booking -> {
            bookingDtos.add(getDtoFromBooking(booking));
        });

        return bookingDtos;
    }
}
